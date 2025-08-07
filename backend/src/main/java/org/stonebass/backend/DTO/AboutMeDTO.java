package org.stonebass.backend.DTO;

import org.stonebass.backend.model.AboutMeEntity;

import java.util.Base64;

public record AboutMeDTO(
        String description,
        String profilePictureBase64,
        String playingOn1Description,
        String playingOn1Base64,
        String playingOn2Description,
        String playingOn2Base64,
        String playingOn3Description,
        String playingOn3Base64,
        String playingOn4Description,
        String playingOn4Base64
) {

    public static AboutMeDTO fromEntity(AboutMeEntity entity) {
        return new AboutMeDTO(
                entity.description,
                getBase64FromImage(entity.profileImage),
                entity.playingOn1Description,
                getBase64FromImage(entity.playingOn1),
                entity.playingOn2Description,
                getBase64FromImage(entity.playingOn2),
                entity.playingOn3Description,
                getBase64FromImage(entity.playingOn3),
                entity.playingOn4Description,
                getBase64FromImage(entity.playingOn4)
        );
    }

    private static String getBase64FromImage(byte[] image) {
        return Base64.getEncoder().encodeToString(image);
    }
}
