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
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @Column(columnDefinition = "BYTEA")
    private byte[] image;

    public ImageEntity(String title, String description, byte[] bytes) {
        this.title = title;
        this.description = description;
        this.image = bytes;
    }
}
