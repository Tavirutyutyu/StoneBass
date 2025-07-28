package org.stonebass.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstrumentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(nullable = false)
    private boolean hasResonator;
    @Column(columnDefinition = "BYTEA")
    private byte[] image;

    public InstrumentType(String name, boolean hasResonator, byte[] image) {
        this.name = name;
        this.hasResonator = hasResonator;
        this.image = image;
    }
}
