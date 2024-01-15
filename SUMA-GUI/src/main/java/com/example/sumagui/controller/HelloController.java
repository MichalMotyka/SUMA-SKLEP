package com.example.sumagui.controller;

import com.example.sumagui.entity.User;
import com.example.sumagui.services.UserService;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.IOException;

public class HelloController {
    @FXML
    private ImageView close;
    @FXML
    private Button loginButton;
    @FXML
    private TextField loginField;
    @FXML
    private PasswordField passwordField;
    private double xOffset;
    private double yOffset;
    private UserService userService = new UserService();

    @FXML
    protected void onCloseButtonClick() {
        Stage stage = (Stage) close.getScene().getWindow();
        stage.close();
    }

    @FXML
    protected void onLoginButtonClick() throws IOException {
        User user = new User();
        user.setLogin(loginField.getText());
        user.setPassword(passwordField.getText());
        if (userService.loginUser(user)){
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("module-menu-view.fxml"));
            Scene newScene = new Scene(fxmlLoader.load(), 400, 500);
            Stage newStage = new Stage();
            newStage.initStyle(StageStyle.UNDECORATED);
            newStage.setScene(newScene);
            newScene.setOnMousePressed(event -> {
                xOffset = newStage.getX() - event.getScreenX();
                yOffset = newStage.getY() - event.getScreenY();
            });

            newScene.setOnMouseDragged(event -> {
                newStage.setX(event.getScreenX() + xOffset);
                newStage.setY(event.getScreenY() + yOffset);
            });

            ((Stage) loginButton.getScene().getWindow()).close();

            newStage.show();
        }

    }
}
