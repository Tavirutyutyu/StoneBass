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
    public String title;
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

    public AboutMeEntity(
            String title,
            String description,
            byte[] profileImage,
            byte[] playingOn1,
            String playingOn1Description,
            byte[] playingOn2,
            String playingOn2Description,
            byte[] playingOn3,
            String playingOn3Description,
            byte[] playingOn4,
            String playingOn4Description
    ) {
        this.title = title;
        this.description = description;
        this.profileImage = profileImage;
        this.playingOn1 = playingOn1;
        this.playingOn1Description = playingOn1Description;
        this.playingOn2 = playingOn2;
        this.playingOn2Description = playingOn2Description;
        this.playingOn3 = playingOn3;
        this.playingOn3Description = playingOn3Description;
        this.playingOn4 = playingOn4;
        this.playingOn4Description = playingOn4Description;
    }

}
