package org.stonebass.backend.repository;

import org.stonebass.backend.model.InstrumentEntity;
import org.stonebass.backend.model.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentRepository extends JpaRepository<InstrumentEntity, Long> {

    List<InstrumentEntity> findByInstrumentType(InstrumentType instrumentType);

    List<InstrumentEntity> findByInstrumentType_HasResonator(boolean hasResonator);

    List<InstrumentEntity> findByInstrumentTypeAndInstrumentType_HasResonator(InstrumentType instrumentType, boolean hasResonator);

    List<InstrumentEntity> findByInstrumentTypeInAndInstrumentType_HasResonator(List<InstrumentType> types, boolean hasResonator);

    List<InstrumentEntity> findByInstrumentTypeIn(List<InstrumentType> types);

}
