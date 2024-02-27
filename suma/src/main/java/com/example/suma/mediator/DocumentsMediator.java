package com.example.suma.mediator;

import com.example.suma.entity.Basket;
import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.ZMDocument;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.entity.notify.Notify;
import com.example.suma.exceptions.EmptyBasketException;
import com.example.suma.exceptions.OrderDontExistException;
import com.example.suma.service.BasketService;
import com.example.suma.service.SignatureValidator;
import com.example.suma.service.ZMDocumentService;
import com.example.suma.translators.ZMDocumentTranslator;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    public URI setDataOrder(OrderDTO order) throws URISyntaxException {
        return zmDocumentService.setDataOrder(zmDocumentTranslator.translateOrder(order));
    }

    public ResponseEntity<Response> handleNotify(Notify notify, HttpServletRequest request) {
        String header = request.getHeader("OpenPayu-Signature");
        try {
            signatureValidator.validate(header,notify);
            zmDocumentService.changeStatusToCreated(notify.getOrder().getExtOrderId());
        } catch (NoSuchAlgorithmException | JsonProcessingException |
                 com.example.order.exception.BadSignatureException e) {
            return ResponseEntity.badRequest().body(new Response("Bad signature",Code.E1));
        }catch (OrderDontExistException e1){
            return ResponseEntity.badRequest().body(new Response("Order don't exist",Code.E1));
        };
        return ResponseEntity.ok(new Response("Notification handle success",Code.E1));

    }
}
