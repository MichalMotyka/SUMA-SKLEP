package com.example.sumagui.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigController {
    private static ConfigController propertiesReader;
    private Properties properties;
    InputStream input = null;

    private ConfigController(){
        properties = new Properties();
        loadProperties();
    }

    private void loadProperties() {
        try{
            String filePath = "SUMA-GUI/src/main/resources/application.properties"; // Zmień na właściwą ścieżkę do pliku properties
            input = new FileInputStream(filePath);
            properties.load(input);
        }catch (IOException e){
            //TODO ERROR WINDOW
        }
    }

    public String getValue(String key){
        if (key.contains("api.factorio") && !key.equals("api.factorio.url")){
            return  properties.getProperty("api.factorio.url")+properties.getProperty(key);
        }
        return properties.getProperty(key);
    }


    public static ConfigController getInstance() {
        if (propertiesReader == null) {
            synchronized (ConfigController.class) {
                if (propertiesReader == null) {
                    propertiesReader = new ConfigController();
                }
            }
        }
        return propertiesReader;
    }
}
