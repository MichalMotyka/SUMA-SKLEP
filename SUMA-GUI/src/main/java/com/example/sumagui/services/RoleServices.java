package com.example.sumagui.services;

import java.util.ArrayList;
import java.util.List;

import com.example.sumagui.excetpions.ErrorInterceptor;
import com.example.sumagui.utils.AccountController;
import com.example.sumagui.utils.ConfigController;
import com.google.gson.Gson;
import lombok.extern.log4j.Log4j2;
import okhttp3.*;

@Log4j2
public class RoleServices {
    private List<String> roleList = new ArrayList<>();
    private final ConfigController config;
    Gson gson = new Gson();

    private final OkHttpClient client;

    public RoleServices() {
        config = ConfigController.getInstance();
        client = new OkHttpClient.Builder()
                    .addInterceptor(new ErrorInterceptor())
                    .build();
        initRoles();
    }

    private void initRoles() {
        log.debug("START --initRoles");
        String url = new StringBuilder(config.getValue("api.suma.url"))
                .append(config.getValue("api.suma.user.auth.role"))
                .toString();

        log.debug("CALL --role API");
        Request request = new Request.Builder()
                .url(url)
                .header("Authorization", AccountController.getInstance().getToken())
                .get().build();
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()){
                roleList.addAll(List.of(gson.fromJson(response.body().string(), String[].class)));
                log.info("Successfully get roles in numbers: {}", (long) roleList.size());
                return;
            }
            log.error("Can't get role list");
            log.debug("STOP --initRoles");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<String> getRoleList() {
        return roleList;
    }
}
