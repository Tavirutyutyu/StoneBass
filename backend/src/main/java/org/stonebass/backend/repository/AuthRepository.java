package org.stonebass.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stonebass.backend.model.AdminEntity;

@Repository
public interface AuthRepository extends JpaRepository<AdminEntity, String> {
}
