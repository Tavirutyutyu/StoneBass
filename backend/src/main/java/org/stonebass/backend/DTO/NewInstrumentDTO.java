package org.stonebass.backend.DTO;

public record NewInstrumentDTO(
        String title,
        String description,
        boolean hasResonator,
        String instrumentType,
        String youtubeLink
) {
}
