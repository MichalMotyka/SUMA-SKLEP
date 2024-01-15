package com.example.sumagui.utils;

import com.example.sumagui.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountController {
    private static AccountController accountController;
    private User user;
    private String token;

    public static AccountController getInstance() {
        if (accountController == null) {
            synchronized (ConfigController.class) {
                if (accountController == null) {
                    accountController = new AccountController();
                }
            }
        }
        return accountController;
    }
}
