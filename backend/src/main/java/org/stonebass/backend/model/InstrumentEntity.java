package org.stonebass.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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
    private boolean hasResonator;
    @ManyToOne
    private InstrumentType instrumentType;
    @OneToMany(mappedBy = "instrument", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InstrumentImage> images;

    public InstrumentEntity(String title, String description, boolean hasResonator, InstrumentType instrumentType) {
        this.title = title;
        this.description = description;
        this.hasResonator = hasResonator;
        this.instrumentType = instrumentType;
        this.images = new ArrayList<>();
    }
}
