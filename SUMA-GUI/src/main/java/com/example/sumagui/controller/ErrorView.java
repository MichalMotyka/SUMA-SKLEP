package com.example.sumagui.controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;

import java.io.IOException;

public class ErrorView {
    @FXML
    private Label errorMessage;
    @FXML
    private TextArea errorDefiles;

    public static void createView(String message, String details) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(ErrorView.class.getResource("error-view.fxml"));
        Scene newScene = new Scene(fxmlLoader.load());
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.setAlwaysOnTop(true);
        ErrorView errorView = fxmlLoader.getController();
        errorView.setErrorDetails(message,details);
        newStage.show();
    }

    public void setErrorDetails(String message,String details){
        errorMessage.setText(message);
        errorDefiles.setText(details);
    }
}
