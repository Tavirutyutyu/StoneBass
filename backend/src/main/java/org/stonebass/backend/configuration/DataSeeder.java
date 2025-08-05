package org.stonebass.backend.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.stonebass.backend.model.AdminEntity;
import org.stonebass.backend.model.InstrumentEntity;
import org.stonebass.backend.model.InstrumentImage;
import org.stonebass.backend.model.InstrumentType;
import org.stonebass.backend.repository.AuthRepository;
import org.stonebass.backend.repository.InstrumentImageRepository;
import org.stonebass.backend.repository.InstrumentRepository;
import org.stonebass.backend.repository.InstrumentTypeRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Configuration
public class DataSeeder {

    @Value("${spring.profiles.active}")
    private String springProfile;


    @Bean
    public ApplicationRunner seedData(
            InstrumentTypeRepository instrumentTypeRepository,
            InstrumentRepository instrumentRepository,
            InstrumentImageRepository instrumentImageRepository,
            AuthRepository authenticationRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            seedInstrumentTypes(instrumentTypeRepository);
            seedAdminUser(authenticationRepository, passwordEncoder);
            if (springProfile.equals("dev")) {
                seedInstruments(instrumentRepository, instrumentTypeRepository, instrumentImageRepository);
            }
        };
    }

    private void seedInstruments(InstrumentRepository instrumentRepository, InstrumentTypeRepository instrumentTypeRepository, InstrumentImageRepository instrumentImageRepository) throws Exception {
        if (instrumentRepository.count() == 0) {
            InstrumentEntity entity = instrumentRepository.save(new InstrumentEntity("Guitar", "This is an exampleInstrument", instrumentTypeRepository.findByName("Guitar").orElseThrow(() -> new RuntimeException("Guitar instrument type not found")), "w0drLyhnByk"));
            instrumentImageRepository.save(new InstrumentImage(loadHexImage("images/guitar.hex"), entity));
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

    private void seedInstrumentTypes(InstrumentTypeRepository instrumentTypeRepository) throws Exception {
        if (instrumentTypeRepository.count() == 0) {
            instrumentTypeRepository.save(makeInstrumentType("Bass", false, "bass_guitar.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Guitar", false, "guitar.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Other", false, "other.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Upright Bass", true, "upright.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Cello", true, "cello.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Viola", true, "viola.hex"));
            instrumentTypeRepository.save(makeInstrumentType("Violin", true, "violin.hex"));
        }
    }

    private InstrumentType makeInstrumentType(String name, boolean hasResonator, String hexFileName) throws Exception {
        byte[] imageBytes = loadHexImage("images/" + hexFileName);
        return new InstrumentType(name, hasResonator, imageBytes);
    }

    private byte[] loadHexImage(String hexFileName) throws Exception {
        Path hexPath = Paths.get(Objects.requireNonNull(getClass().getClassLoader().getResource(hexFileName)).toURI());
        String hex = Files.readString(hexPath).replaceAll("\\s+", "");
        int len = hex.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4) + Character.digit(hex.charAt(i + 1), 16));
        }
        return data;
    }
}
