package com.example.suma.repository;

import com.example.suma.entity.State;
import com.example.suma.entity.WMDocuments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WMDocumentsRepository extends JpaRepository<WMDocuments,Long> {
    List<WMDocuments> findAllByStateAndUuid(State state, String uuid);
    List<WMDocuments> findAllByUuid(String uuid);
    List<WMDocuments> findAllByState(State state);
    Optional<WMDocuments> findByUuid(String uuid);

}
