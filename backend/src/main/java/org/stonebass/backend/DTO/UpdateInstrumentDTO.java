package org.stonebass.backend.DTO;

public record UpdateInstrumentDTO(
        String oldTitle,
        String newTitle,
        String description,
        String instrumentType,
        String youtubeLink
) {
}
