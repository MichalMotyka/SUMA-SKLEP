package com.example.suma.mediator;

import com.example.suma.entity.Code;
import com.example.suma.entity.User;
import com.example.suma.entity.dto.UserDTO;
import com.example.suma.exceptions.UserAlreadyExistException;
import com.example.suma.exceptions.UserDontExistException;
import com.example.suma.repository.UserRepository;
import com.example.suma.security.CustomUserDetailsService;
import com.example.suma.security.JwtService;
import com.example.suma.service.CookiService;
import com.example.suma.service.UserService;
import com.example.suma.translators.UserDtoToUser;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AuthMediator {

    private final UserService userService;
    private final UserDtoToUser userDtoToUser;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final CookiService cookiService;

    public void createUser(UserDTO userDTO) throws UserAlreadyExistException {
        userService.validateUser(userDTO.getLogin(), userDTO.getEmail());
        User user = userDtoToUser.userDtoToUser(userDTO);
        user.setAuthor(userService.findUserByUuid(userDTO.getAuthor().getUuid()));
        userService.save(user);
    }

    public UserDTO login(HttpServletResponse response, UserDTO authRequest) throws UsernameNotFoundException, UserDontExistException, BadCredentialsException {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                User user = userService.findByLogin(authRequest.getLogin());
                Cookie cookie = cookiService.generateCookie("Authorization",jwtService.generateToken(authRequest.getLogin()),40000);
                response.addCookie(cookie);
                return userDtoToUser.userToUserDto(user);
            } else {
                throw new UsernameNotFoundException(Code.A2.label);
            }
    }

    public List<UserDTO> getUsersList() {
        List<User> users = userService.getAllUsers();
        return users.stream().map(userDtoToUser::userToUserDto).collect(Collectors.toList());
    }

    public UserDTO loggedIn(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")){
            UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
            if(jwtService.validateToken(token,userDetails)){
                User user = userService.findByLogin(userDetails.getPassword());
                return userDtoToUser.userToUserDto(user);
            }
        }
        throw new RuntimeException();
    }
}
