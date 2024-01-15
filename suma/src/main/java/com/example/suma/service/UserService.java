package com.example.suma.service;

import com.example.suma.entity.User;
import com.example.suma.exceptions.UserAlreadyExistException;
import com.example.suma.exceptions.UserDontExistException;
import com.example.suma.repository.RoleRepository;
import com.example.suma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public void save(User user) {
        roleRepository.saveAll(user.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUuid(UUID.randomUUID().toString());
        userRepository.save(user);
    }
    public User findUserByUuid(String uuid){
        return userRepository.findUserByUuid(uuid).orElseThrow(UserDontExistException::new);
    }

    public void validateUser(String username, String password) throws UserAlreadyExistException{
        userRepository.findUserByLoginOrEmail(username, password)
                .ifPresent(value-> {throw new UserAlreadyExistException();});

    }

    public User findByLogin(String login) throws UserDontExistException{
        return userRepository.findUserByLogin(login).orElseThrow(UserDontExistException::new);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
