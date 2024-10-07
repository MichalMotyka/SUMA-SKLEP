package com.example.suma.repository;

import com.example.suma.entity.PMDocument;
import com.example.suma.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PMDocumentRepository extends JpaRepository<PMDocument, Long> {
    List<PMDocument> findAllByUuid(String uuid);
    List<PMDocument> findAllByUuidAndState(String uuid, State state);

    List<PMDocument> findAllByState(State state);

    Optional<PMDocument> findByUuid(String uuid);
}
