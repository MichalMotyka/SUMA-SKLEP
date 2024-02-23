package com.example.suma.repository;

import com.example.suma.entity.ZMDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZMDocumentRepository extends JpaRepository<ZMDocument,Long> {
    Optional<ZMDocument> findZMDocumentByUuid(String uuid);
}
