package org.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String title;
    private String description;
    @Column(columnDefinition = "BYTEA")
    private byte[] image;
    private boolean hasResonator;
    @ManyToOne
    private InstrumentType instrumentType;

    public InstrumentEntity(String title, String description, byte[] bytes, boolean hasResonator, InstrumentType instrumentType) {
        this.title = title;
        this.description = description;
        this.image = bytes;
        this.hasResonator = hasResonator;
        this.instrumentType = instrumentType;
    }
}
