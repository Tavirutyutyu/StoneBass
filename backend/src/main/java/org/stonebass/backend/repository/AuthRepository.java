package org.stonebass.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stonebass.backend.model.AdminEntity;

public interface AuthRepository extends JpaRepository<AdminEntity, String> {
}
