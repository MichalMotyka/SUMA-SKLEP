module com.example.sumagui {
    requires javafx.controls;
    requires javafx.fxml;
    requires org.kordamp.bootstrapfx.core;
    requires okhttp3;
    requires com.google.gson;
    requires org.hildan.fxgson;
    requires java.sql;
    requires lombok;
    requires org.apache.logging.log4j;
    opens com.example.sumagui to javafx.fxml;
    opens com.example.sumagui.entity;
    exports com.example.sumagui;
    exports com.example.sumagui.controller;
    opens com.example.sumagui.controller to javafx.fxml;
    exports com.example.sumagui.entity;
}