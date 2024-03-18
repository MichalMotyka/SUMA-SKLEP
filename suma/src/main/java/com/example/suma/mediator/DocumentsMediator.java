package com.example.suma.mediator;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.DeliverDTO;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.entity.notify.Notify;
import com.example.suma.entity.notify.Status;
import com.example.suma.exceptions.DeliverDontExistException;
import com.example.suma.exceptions.EmptyBasketException;
import com.example.suma.exceptions.OrderDontExistException;
import com.example.suma.repository.WMProductsRepository;
import com.example.suma.service.*;
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
import java.util.Arrays;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DocumentsMediator {
    private final ZMDocumentTranslator zmDocumentTranslator;
    private final ZMDocumentService zmDocumentService;
    private final BasketService basketService;
    private final SignatureValidator signatureValidator;
    private final DeliverService deliverService;
    private final WMProductsRepository wmProductsRepository;
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
}
