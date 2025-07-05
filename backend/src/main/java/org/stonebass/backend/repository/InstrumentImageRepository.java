package org.stonebass.backend.repository;

import org.stonebass.backend.model.InstrumentImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentImageRepository extends JpaRepository<InstrumentImage, Long> {
}
