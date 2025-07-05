package org.stonebass.backend.repository;

import org.stonebass.backend.model.InstrumentEntity;
import org.stonebass.backend.model.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentRepository extends JpaRepository<InstrumentEntity, Long> {
    List<InstrumentEntity> findByInstrumentType(InstrumentType instrumentType);
    List<InstrumentEntity> findByHasResonator(boolean hasResonator);
    List<InstrumentEntity> findByInstrumentTypeAndHasResonator(InstrumentType instrumentType, boolean hasResonator);
}
