package org.stonebass.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AdminEntity {
    @Id
    private String username;
    private String password;
}
