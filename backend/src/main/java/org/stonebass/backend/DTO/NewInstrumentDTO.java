package org.stonebass.backend.DTO;

public record NewInstrumentDTO(
        String title,
        String description,
        String instrumentType,
        String youtubeLink
) {
}
