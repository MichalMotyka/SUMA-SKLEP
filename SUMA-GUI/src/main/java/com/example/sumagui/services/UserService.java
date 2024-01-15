package com.example.sumagui.services;

import com.example.sumagui.entity.User;
import com.example.sumagui.excetpions.ErrorInterceptor;
import com.example.sumagui.utils.AccountController;
import com.example.sumagui.utils.ConfigController;
import com.google.gson.Gson;
import lombok.extern.log4j.Log4j2;
import okhttp3.*;
import org.hildan.fxgson.FxGson;

import java.io.IOException;

@Log4j2
public class UserService {
    private final ConfigController config;
    private final OkHttpClient client;
    Gson gson = FxGson.coreBuilder().setPrettyPrinting().disableHtmlEscaping().create();


    public UserService() {
        this.config = ConfigController.getInstance();

        this.client = new OkHttpClient.Builder()
                .addInterceptor(new ErrorInterceptor())
                .build();
    }

    public boolean registerUser(User user){
        log.debug("START --registerUser");

        user.setAuthor(AccountController.getInstance().getUser());

        String url = new StringBuilder(config.getValue("api.suma.url"))
                .append(config.getValue("api.suma.user.auth.register"))
                .toString();

        String body = gson.toJson(user);

        log.debug("CALL --register user API");
        Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create(MediaType.parse("application/json"),body))
                .build();

        try(Response response = client.newCall(request).execute()){
            if (response.isSuccessful()){
                log.info("Successfully register user with login: {}",user.getLogin());
                log.debug("STOP --registerUser");
                return true;
            }
            log.debug("STOP --registerUser");
            return false;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public boolean getUsers(){
        log.debug("START --getUsers");

        String url = new StringBuilder(config.getValue("api.suma.url"))
                .append(config.getValue("api.suma.user.auth.users"))
                .toString();


        log.debug("CALL --getUsers API");
        Request request = new Request.Builder()
                .url(url)
                .header("Authorization",AccountController.getInstance().getToken())
                .get()
                .build();

        try(Response response = client.newCall(request).execute()){
            if (response.isSuccessful()){
                log.debug("STOP --getUsers");
                System.out.println(response.body().string());
                return true;
            }
            log.debug("STOP --getUsers");
            return false;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public boolean loginUser(User user){
        log.debug("START --loginUser");
        String url = new StringBuilder(config.getValue("api.suma.url"))
                .append(config.getValue("api.suma.user.auth.login"))
                .toString();

        String body = gson.toJson(user);

        log.debug("CALL --login user API {}",url);
        Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create(MediaType.parse("application/json"),body))
                .build();

        try(Response response = client.newCall(request).execute()){
            if (response.isSuccessful()){
                log.info("Successfully register user with login: {}",user.getLogin());
                AccountController.getInstance().setUser(gson.fromJson(response.body().string(),User.class));
                log.debug("STOP --loginUser");
                return true;
            }
            log.info("User doesn't login");
            log.debug("STOP --loginUser");
            return false;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
