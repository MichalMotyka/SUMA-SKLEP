package com.example.sumagui.controller;

import com.example.sumagui.entity.Role;
import com.example.sumagui.entity.User;
import com.example.sumagui.services.RoleServices;
import com.example.sumagui.services.UserService;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.CheckBoxTableCell;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;

import java.util.HashSet;
import java.util.stream.Collectors;

public class UserFormView {
    private final RoleServices roleServices = new RoleServices();
    private final UserService userService = new UserService();
    ObservableList<Role> role;

    @FXML
    private TableView<Role> roleTable;
    @FXML
    private TableColumn<Role,String> roleStringTableColumn;
    @FXML
    private TableColumn<Role,Boolean> roleBooleanTableColumn;
    @FXML
    private TextField loginInput;
    @FXML
    private TextField emailInput;
    @FXML
    private TextField passwordInput;
    @FXML
    private CheckBox userLockCheck;
    @FXML
    private CheckBox userEnableCheck;

    @FXML
    public void initialize(){
        role= FXCollections.observableArrayList(roleServices.getRoleList().stream().map(value -> new Role(value, false)).collect(Collectors.toList()));
        roleStringTableColumn.setCellValueFactory(new PropertyValueFactory<>("Name"));
        roleBooleanTableColumn.setCellValueFactory(new PropertyValueFactory<>("IsActive"));
        roleBooleanTableColumn.setCellValueFactory(new PropertyValueFactory<>("isActive"));
        roleBooleanTableColumn.setCellFactory(column -> {
            TableCell<Role, Boolean> cell = new TableCell<Role, Boolean>() {
                private final CheckBox checkBox = new CheckBox();

                {
                    checkBox.setOnAction(event -> {
                        Role role = getTableRow().getItem();
                        if (role != null) {
                            role.setActive(checkBox.isSelected());
                            updateRoleList();
                        }
                    });
                }

                @Override
                protected void updateItem(Boolean item, boolean empty) {
                    super.updateItem(item, empty);
                    if (empty) {
                        setGraphic(null);
                    } else {
                        checkBox.setSelected(item);
                        setGraphic(checkBox);
                    }
                }
            };

            return cell;
        });

        roleTable.setItems(role);
    }

    private void updateRoleList() {
        role.setAll(role.stream().map(r -> new Role(r.getName(), r.getIsActive())).collect(Collectors.toList()));
    }

    @FXML
    public void onSubmitUserButton(){
        User user = new User(
                "",
                loginInput.getText(),
                emailInput.getText(),
                passwordInput.getText(),
                new HashSet<>(roleTable.getItems()),
                userLockCheck.isSelected(),
                userEnableCheck.isSelected());

        if (userService.registerUser(user)){
            ((Stage)loginInput.getScene().getWindow()).close();
        }
    }

    @FXML
    public void onCloseUserButton(){
        ((Stage)loginInput.getScene().getWindow()).close();
    }

}
