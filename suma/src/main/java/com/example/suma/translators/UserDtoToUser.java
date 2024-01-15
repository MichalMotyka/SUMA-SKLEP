package com.example.suma.translators;

import com.example.suma.entity.Authorities;
import com.example.suma.entity.Role;
import com.example.suma.entity.User;
import com.example.suma.entity.dto.RoleDTO;
import com.example.suma.entity.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public abstract class UserDtoToUser {

    public User userDtoToUser(UserDTO userDTO){
        User user = translateUserDTO(userDTO);
        user.setRole(translateRoleDTOs(userDTO.getRole(),user));
        return user;
    }
    public UserDTO userToUserDto(User user){
        return translateUser(user);
    }

    @Mappings({
            @Mapping(target = "author",expression = "java(translateUserDTO(userDTO.getAuthor()))")
    })
    protected abstract User translateUserDTO(UserDTO userDTO);

    @Mappings({
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "author",ignore = true),
            @Mapping(target = "login",source = "username")
    })
    protected abstract UserDTO translateUser(User user);

    private Set<Authorities> translateRoleDTOs(Set<RoleDTO> roleDTOS,User user){
        if (roleDTOS.isEmpty()){
            return new HashSet<Authorities>();
        }
            return roleDTOS.stream().filter(RoleDTO::isActive).
                map(value ->
                        new Authorities(0,
                                user,
                                Role.findByValue(value.getName()))).
                collect(Collectors.toSet());
    }
}
