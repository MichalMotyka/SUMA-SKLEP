package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.Role;
import com.example.suma.entity.dto.UserDTO;
import com.example.suma.exceptions.UserAlreadyExistException;
import com.example.suma.exceptions.UserDontExistException;
import com.example.suma.mediator.AuthMediator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
@Tag(name = "Auth")
public class AuthController {

    private final AuthMediator authMediator;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(HttpServletResponse response,@RequestBody UserDTO userDTO){
        return ResponseEntity.ok(authMediator.login(response,userDTO));
    }

    @PostMapping("/logged-in")
    public ResponseEntity<UserDTO> loggedId(HttpServletRequest request){
        return ResponseEntity.ok(authMediator.loggedIn(request));
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        authMediator.logout(response);
        return ResponseEntity.ok().body("Logged out successfully");
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<Response> register(@Valid @RequestBody UserDTO user){
        authMediator.createUser(user);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/role")
    public List<String> getRole(){
        return Arrays.stream(Role.values()).map(Role::getValue).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers(){
      return ResponseEntity.ok(authMediator.getUsersList());
    }



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        StringBuilder message = new StringBuilder("Przekazane dane są nieprawidłowe: \n");
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            message.append(error.getDefaultMessage()).append("\n");
        });
        return new Response(message.toString(),Code.E1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserAlreadyExistException.class)
    public Response handleUserAlreadyExistException(
            UserAlreadyExistException ex) {
        return new Response(Code.A4);
    }
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UsernameNotFoundException.class)
    public Response handleUsernameNotFoundException(
            UsernameNotFoundException ex) {
        return new Response(Code.A2);
    }
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UserDontExistException.class)
    public Response handleUserDontExistException(
            UserDontExistException ex) {
        return new Response(Code.A2);
    }
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public Response handleBadCredentialsException(
            BadCredentialsException ex) {
        return new Response(Code.A1);
    }
}
