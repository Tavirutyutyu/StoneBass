package org.stonebass.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "BYTEA")
    private byte[] image;
    @ManyToOne
    @JoinColumn(name = "instrument_id", nullable = false)
    private InstrumentEntity instrument;

    public InstrumentImage(byte[] image, InstrumentEntity instrument) {
        this.image = image;
        this.instrument = instrument;
    }
}
