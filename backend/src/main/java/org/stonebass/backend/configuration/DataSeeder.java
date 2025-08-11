package org.stonebass.backend.configuration;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.stonebass.backend.model.*;
import org.stonebass.backend.repository.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class DataSeeder {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataSeeder.class);

    @Value("${spring.profiles.active}")
    private String springProfile;


    @Bean
    public ApplicationRunner seedData(
            InstrumentTypeRepository instrumentTypeRepository,
            InstrumentRepository instrumentRepository,
            InstrumentImageRepository instrumentImageRepository,
            AuthRepository authenticationRepository,
            AboutMeRepository aboutMeRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            seedInstrumentTypes(instrumentTypeRepository);
            seedAdminUser(authenticationRepository, passwordEncoder);
            seedAboutMeData(aboutMeRepository);
            if (springProfile.equals("dev")) {
                seedInstruments(instrumentRepository, instrumentTypeRepository, instrumentImageRepository);
            }
        };
    }

    private void seedInstruments(InstrumentRepository instrumentRepository, InstrumentTypeRepository instrumentTypeRepository, InstrumentImageRepository instrumentImageRepository) throws Exception {
        if (instrumentRepository.count() == 0) {
            InstrumentEntity entity = instrumentRepository.save(new InstrumentEntity("Guitar", "This is an exampleInstrument", instrumentTypeRepository.findByName("Guitar").orElseThrow(() -> new RuntimeException("Guitar instrument type not found")), "w0drLyhnByk"));
            instrumentImageRepository.save(new InstrumentImage(loadBytesFromImage("images/guitar.jpg"), entity));
        }
    }

    private void seedAdminUser(AuthRepository authenticationRepository, PasswordEncoder passwordEncoder) {
        if (authenticationRepository.count() == 0) {
            String adminUser = System.getenv("adminUsername");
            String adminPasswordRaw = System.getenv("adminPassword");
            String adminPassword = passwordEncoder.encode(adminPasswordRaw);
            authenticationRepository.save(new AdminEntity(adminUser, adminPassword));
        }
    }

    private void seedAboutMeData(AboutMeRepository aboutMeRepository) throws IOException {
        if (aboutMeRepository.count() == 0) {
            String jsonString = new String(Files.readAllBytes(Paths.get("src/main/resources/texts/aboutMeInit.json")));
            JSONObject jsonObject = new JSONObject(jsonString);
            String title = jsonObject.getString("title");
            String description = jsonObject.getString("description");
            byte[] profilePicture = loadBytesFromImage("images/arpad.jpg");
            String playingOn1Description = jsonObject.getString("playingOn1Description");
            byte[] playingOn1 = loadBytesFromImage("images/kistehen.jpg");
            String playingOn2Description = jsonObject.getString("playingOn2Description");
            byte[] playingOn2 = loadBytesFromImage("images/holddalanap.jpg");
            String playingOn3Description = jsonObject.getString("playingOn3Description");
            byte[] playingOn3 = loadBytesFromImage("images/yengibarian.jpg");
            String playingOn4Description = jsonObject.getString("playingOn4Description");
            byte[] playingOn4 = loadBytesFromImage("images/peca.jpg");

            aboutMeRepository.save(new AboutMeEntity(
                    title,
                    description,
                    profilePicture,
                    playingOn1,
                    playingOn1Description,
                    playingOn2,
                    playingOn2Description,
                    playingOn3,
                    playingOn3Description,
                    playingOn4,
                    playingOn4Description
            ));
        }
    }

    private void seedInstrumentTypes(InstrumentTypeRepository instrumentTypeRepository) throws Exception {
        if (instrumentTypeRepository.count() == 0) {
            instrumentTypeRepository.save(makeInstrumentType("Bass", false, "bass.png"));
            instrumentTypeRepository.save(makeInstrumentType("Guitar", false, "guitar.jpg"));
            instrumentTypeRepository.save(makeInstrumentType("Other", false, "other.jpg"));
            instrumentTypeRepository.save(makeInstrumentType("Upright Bass", true, "upright.png"));
            instrumentTypeRepository.save(makeInstrumentType("Cello", true, "cello.png"));
            instrumentTypeRepository.save(makeInstrumentType("Viola", true, "viola.jpg"));
            instrumentTypeRepository.save(makeInstrumentType("Violin", true, "violin.png"));
        }
    }

    private InstrumentType makeInstrumentType(String name, boolean hasResonator, String fileName) throws Exception {
        byte[] imageBytes = loadBytesFromImage("images/" + fileName);
        LOGGER.info("Bytes length: {}", imageBytes.length);
        return new InstrumentType(name, hasResonator, imageBytes);
    }

    private byte[] loadBytesFromImage(String filename) throws IOException {
        Path path = Paths.get("src/main/resources/" + filename);
        String extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

        if (extension.equals("svg")) {
            String svgText = Files.readString(path, StandardCharsets.UTF_8);
            return svgText.getBytes(StandardCharsets.UTF_8);
        } else if (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png")) {
            return Files.readAllBytes(path);
        } else {
            throw new RuntimeException("Unsupported extension: " + extension);
        }
    }
}
