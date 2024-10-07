package com.example.suma.repository;

import com.example.suma.entity.State;
import com.example.suma.entity.ZMDocument;
import com.example.suma.entity.notify.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ZMDocumentRepository extends JpaRepository<ZMDocument,Long> {
    Optional<ZMDocument> findZMDocumentByUuid(String uuid);
    List<ZMDocument> findZMDocumentByStateOrState(State state,State stat);
    List<ZMDocument> findAllByUuidOrEmailOrNameOrSurnameOrCompanyNameOrNip(String uuid, String email, String name, String surname, String companyName,String nip);
    List<ZMDocument> findAllByUuidOrEmailOrNameOrSurnameOrCompanyNameOrNipAndStateOrState(String uuid, String email, String name, String surname, String companyName,String nip,State state,State state2);
}
