package org.stonebass.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stonebass.backend.model.AboutMeEntity;

import java.util.Optional;

public interface AboutMeRepository extends JpaRepository<AboutMeEntity, Long> {
    Optional<AboutMeEntity> findFirstBy();
}
