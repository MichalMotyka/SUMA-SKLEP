package com.example.sumagui.controller;

import com.example.sumagui.services.UserService;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class SettingsView {

    private UserService userService = new UserService();

    @FXML
    public void initialize(){
        userService.getUsers();
    }

    @FXML
    protected void onUserAddButtonClick() throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("user-form-view.fxml"));
        Scene newScene = new Scene(fxmlLoader.load());
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.show();
    }

    @FXML
    protected void onCategoryAddButtonClick() throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("category-view.fxml"));
        Scene newScene = new Scene(fxmlLoader.load());
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.show();
    }
}
