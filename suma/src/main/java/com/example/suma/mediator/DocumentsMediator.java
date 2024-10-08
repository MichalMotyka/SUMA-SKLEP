package com.example.suma.mediator;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.DeliverDTO;
import com.example.suma.entity.dto.DocumentDTO;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.notify.Notify;
import com.example.suma.entity.notify.Status;
import com.example.suma.exceptions.*;
import com.example.suma.repository.PMDocumentRepository;
import com.example.suma.repository.WMDocumentsRepository;
import com.example.suma.repository.WMProductsRepository;
import com.example.suma.service.*;
import com.example.suma.translators.DocumentToPMDocument;
import com.example.suma.translators.DocumentToWMDocument;
import com.example.suma.translators.ProductDtoToProduct;
import com.example.suma.translators.ZMDocumentTranslator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DocumentsMediator {
    private final ZMDocumentTranslator zmDocumentTranslator;
    private final DocumentToPMDocument documentToPMDocument;
    private final ZMDocumentService zmDocumentService;
    private final BasketService basketService;
    private final SignatureValidator signatureValidator;
    private final DeliverService deliverService;
    private final WMProductsRepository wmProductsRepository;
    private final ProductService productService;
    private final PMDocumentService pmDocumentService;
    private final DocumentToWMDocument documentToWMDocument;
    private final WMDocumentsService wmDocumentsService;
    private final ProductDtoToProduct productDtoToProduct;
    private final WMDocumentsRepository wmDocumentsRepository;
    private final PMDocumentRepository pmDocumentRepository;

    public void createOrder(OrderDTO orderDTO, Cookie[] cookies) {
        ZMDocument zmDocument = zmDocumentTranslator.translateOrder(orderDTO);
        zmDocumentService.create(zmDocument);
    }

    public String getBasketCookie(Cookie[] cookies){
        if (cookies != null && cookies.length > 0){
          return Arrays.stream(cookies).filter(value-> value.getName().equals("basket-uuid")).findFirst().get().getValue();
        }
        return null;
    }

    public void makeOrder(Cookie[] cookies, HttpServletResponse response) {
        String uuid = getBasketCookie(cookies);
        Basket basket = null;
        if (uuid != null){
            basket = basketService.getBasket(uuid);
            if (basket == null || basket.getBasketItem() == null || basket.getBasketItem().size() <=0){
                throw new EmptyBasketException();
            }
            String orderUuid = zmDocumentService.saveOrder(zmDocumentTranslator.translateOrder(basket),basket);
            response.setHeader("order",orderUuid);
            return;
        }
        throw new EmptyBasketException();
    }

    public void setDataOrder(OrderDTO order,HttpServletRequest request,HttpServletResponse response) throws URISyntaxException {
        URI uri =  zmDocumentService.setDataOrder(zmDocumentTranslator.translateOrder(order));
        response.addHeader("X-Location",uri.toString());
        Cookie[] cookies = request.getCookies();
        if (cookies != null){
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("basket-uuid")){
                    cookie.setHttpOnly(true);
                    cookie.setPath("/api/v1");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public ResponseEntity<Response> handleNotify(String notify, HttpServletRequest request) {
        String header = request.getHeader("OpenPayu-Signature");
        try {
            signatureValidator.validate(header,notify);
            Gson gson = new Gson();
            Notify notifyObject = gson.fromJson(notify, Notify.class);
            zmDocumentService.changeStatus(notifyObject);
        } catch (NoSuchAlgorithmException | JsonProcessingException |
                 com.example.order.exception.BadSignatureException e) {
            return ResponseEntity.badRequest().body(new Response("Bad signature",Code.E1));
        }catch (OrderDontExistException e1){
            return ResponseEntity.badRequest().body(new Response("Order don't exist",Code.E1));
        };
        return ResponseEntity.ok(new Response("Notification handle success",Code.E1));

    }

    public OrderDTO setDeliver(DeliverDTO deliverDTO, String order) {
        deliverService.getDeliverByUuid(deliverDTO.getUuid()).ifPresentOrElse(deliver -> {
            zmDocumentService.setDeliverOrder(deliver,order);
        },()->{throw new DeliverDontExistException();});
        ZMDocument zmDocument =  zmDocumentService.getZzmByUuid(order);
        return zmDocumentTranslator.translateZzmDocument(zmDocument);
    }

    public OrderDTO getOrderInfo(String order) {
        ZMDocument zmDocument = zmDocumentService.getZzmByUuid(order);
        if (zmDocument.getState() != State.PROJECT){
            zmDocument.getDocument().setWmProductsList(wmProductsRepository.findAllByWmDocuments(zmDocument.getDocument()));
            return zmDocumentTranslator.translateOrderInfo(zmDocument);
        }
        throw new OrderDontExistException();
    }

    public void createDocument(DocumentDTO documentDTO) {
        if (documentDTO.getType().equals("PM")){
            List<PMProducts> pmProductsList = new ArrayList<>();
            documentDTO.getProducts().forEach(value->{
                Product product = productService.getProductByUuid(value.getUuid());
                PMProducts pmProducts = new PMProducts();
                pmProducts.setProduct(product);
                pmProducts.setUuid(UUID.randomUUID().toString());
                pmProducts.setQuantity(value.getCount());
                pmProductsList.add(pmProducts);
            });
            PMDocument pmDocument = documentToPMDocument.translate(documentDTO);
            pmDocument.setPmProductsList(pmProductsList);
            pmDocumentService.save(pmDocument);
        } else if (documentDTO.getType().equals("WM")) {
            List<WMProducts> wmProductsList = new ArrayList<>();
            documentDTO.getProducts().forEach(value->{
                Product product = productService.getProductByUuid(value.getUuid());
                WMProducts wmProducts = new WMProducts();
                wmProducts.setProduct(product);
                wmProducts.setUuid(UUID.randomUUID().toString());
                wmProducts.setQuantity(value.getCount());
                wmProductsList.add(wmProducts);
            });
            WMDocuments wmDocuments = documentToWMDocument.translate(documentDTO);
            wmDocuments.setWmProductsList(wmProductsList);
            wmDocumentsService.create(wmDocuments);
        }
    }

    public List<DocumentDTO> getAllDocuments(String all, String name) {
        List<WMDocuments> wmDocumentsList = new ArrayList<>();
        List<PMDocument> pmDocumentsList = new ArrayList<>();
        if (all.equals("T")){
            wmDocumentsList.addAll(wmDocumentsService.findallByName(name));
            pmDocumentsList.addAll(pmDocumentService.findAllByName(name));
        }else if (all.equals("N")){
            wmDocumentsList.addAll(wmDocumentsService.findAllByStatusAndName(State.PROJECT,name));
            pmDocumentsList.addAll(pmDocumentService.findAllByStatusAndName(State.PROJECT,name));
        }
        List<DocumentDTO> documentDTOList = new ArrayList<>();
        wmDocumentsList.forEach(value->{
            DocumentDTO documentDTO = documentToWMDocument.translateToDTO(value);
            documentDTO.setType("Wydanie Magazynowe");
            documentDTO.setProducts(new ArrayList<>());
            value.getWmProductsList().forEach(product->{
                ProductDTO productDTO = productDtoToProduct.toProductDTO(product.getProduct());
                productDTO.setCount(product.getQuantity());
                documentDTO.getProducts().add(productDTO);
            });
            documentDTOList.add(documentDTO);
        });
        pmDocumentsList.forEach(value->{
           DocumentDTO documentDTO = documentToPMDocument.translateToDTO(value);
           documentDTO.setType("Przyjęcie Magazynowe");
           documentDTO.setProducts(new ArrayList<>());
           value.getPmProductsList().forEach(pmProduct->{
               ProductDTO productDTO = productDtoToProduct.toProductDTO(pmProduct.getProduct());
               productDTO.setCount(pmProduct.getQuantity());
               documentDTO.getProducts().add(productDTO);
           });
           documentDTOList.add(documentDTO);
        });
        return documentDTOList;
    }

    public void updateDocument(String uuid,State state) throws PMDontExist,NoEnoughProductException {
        try{
            WMDocuments wmDocuments = wmDocumentsService.findByUuid(uuid);
            wmDocuments.setState(state);
            if (state == State.COMPLETED){
                wmDocumentsService.removeProducts(wmDocuments);
                wmDocuments.setState(State.COMPLETED);
                wmDocumentsRepository.save(wmDocuments);
            }
            wmDocumentsRepository.save(wmDocuments);
        }catch (WMDontExist exist){
            PMDocument pmDocument = pmDocumentService.findByUuid(uuid);
            pmDocument.setState(state);
            if (state == State.COMPLETED){
                pmDocumentService.addProducts(pmDocument);
            }
            pmDocumentRepository.save(pmDocument);
        }
    }

    public List<OrderDTO> getAllOrders(String all, String name) {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        List<ZMDocument> zmDocumentList = zmDocumentService.getZmDocuments(name,all.equals("T"));
        zmDocumentList.forEach(value->{
            orderDTOList.add(zmDocumentTranslator.translateZzmDocument(value));
        });
        return orderDTOList;
    }

    public void sendMessage(OrderDTO orderDTO) throws OrderDontExistException {
        zmDocumentService.setMessage(orderDTO);
    }

    public void changeStatus(OrderDTO orderDTO) throws OrderDontExistException {
        zmDocumentService.updateStatus(orderDTO);
    }
}
