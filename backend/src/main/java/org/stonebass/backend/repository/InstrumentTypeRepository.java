package org.stonebass.backend.repository;

import org.stonebass.backend.model.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InstrumentTypeRepository extends JpaRepository<InstrumentType, Long> {
    Optional<InstrumentType> findByName(String name);
    List<InstrumentType> findByHasResonator(boolean b);
}
