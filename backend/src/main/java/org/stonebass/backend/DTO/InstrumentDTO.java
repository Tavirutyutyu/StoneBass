package org.stonebass.backend.DTO;

import java.util.List;

public record InstrumentDTO(
        Long id,
        String title,
        String description,
        String instrumentType,
        List<String> images,
        String youtubeLink
) {
}
