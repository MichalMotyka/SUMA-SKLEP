package com.example.sumagui.controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

import java.io.IOException;

public class ModuleMenuView {

    @FXML
    private ImageView close;
    @FXML
    private ImageView minimize;

    @FXML
    protected void onCloseButtonClick(){
        ((Stage)close.getScene().getWindow()).close();
    }
    @FXML
    protected void onMinimizeButtonClick(){
        ((Stage)close.getScene().getWindow()).setIconified(true);
    }

    @FXML
    protected void onSettingsButtonClick() throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("settings-view.fxml"));
        Scene newScene = new Scene(fxmlLoader.load());
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.show();
    }
}
