package com.example.sumagui.excetpions;

import com.example.sumagui.controller.ErrorView;
import com.example.sumagui.utils.AccountController;
import com.google.gson.Gson;
import lombok.extern.log4j.Log4j2;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

@Log4j2
public class ErrorInterceptor implements Interceptor {
    Response response;
    @Override
    public Response intercept(Chain chain) throws IOException {
        try{
            Request request = chain.request();
            response = chain.proceed(request);

            if (response.code() == 403) {
                ErrorView.createView("Skontaktuj się z administratorem","Nie jesteś autoryzowany do operacji");
            }else if (response.code() >= 400){
                Gson gson = new Gson();
                com.example.sumagui.entity.Response res = gson.fromJson(response.body().string(), com.example.sumagui.entity.Response.class);
                ErrorView.createView(res.getCode(), res.getMessage());
                return response;
            }
            updateToken(response);
            return response;
        }catch (Exception e){
            log.error(e.getMessage());
            ErrorView.createView("Wystąpił błąd, skontaktuj się z administratorem", e.getMessage());
            return response;
        }
    }

    private void updateToken(Response response){
        String token = response.header("Authorization");
        if (token != null){
            AccountController accountController = AccountController.getInstance();
            accountController.setToken(token);
        }
    }

}