package com.example.suma.repository;

import com.example.suma.entity.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Authorities,Long> {
}
