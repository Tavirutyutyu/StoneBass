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
public class AboutMeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(columnDefinition = "TEXT")
    public String description;
    @Column(columnDefinition = "BYTEA")
    public byte[] profileImage;

    public String playingOn1Description;
    @Column(columnDefinition = "BYTEA")
    public byte[] playingOn1;

    public String playingOn2Description;
    @Column(columnDefinition = "BYTEA")
    public byte[] playingOn2;

    public String playingOn3Description;
    @Column(columnDefinition = "BYTEA")
    public byte[] playingOn3;

    public String playingOn4Description;
    @Column(columnDefinition = "BYTEA")
    public byte[] playingOn4;
}
