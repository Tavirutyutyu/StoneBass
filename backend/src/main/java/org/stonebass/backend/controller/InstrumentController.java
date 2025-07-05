package org.stonebass.backend.controller;

import org.stonebass.backend.DTO.InstrumentDTO;
import org.stonebass.backend.service.InstrumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/instrument")
public class InstrumentController {
    private static final Logger logger = Logger.getLogger(InstrumentController.class.getName());
    private final InstrumentService instrumentService;

    @Autowired
    public InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @GetMapping("/all")
    public List<InstrumentDTO> getAll() {
        return instrumentService.getAll();
    }

    @GetMapping("/id/{id}")
    public InstrumentDTO getById(@PathVariable Long id) {
        return instrumentService.getById(id);
    }

    @GetMapping("/filter")
    public List<InstrumentDTO> filter(@RequestParam (required = false) String instrumentType, @RequestParam (required = false) String hasResonator) {
        logger.info("filter instrumentType: " + instrumentType);
        logger.info("filter hasResonator: " + hasResonator);
        return instrumentService.filter(instrumentType, hasResonator);
    }

    @PostMapping("/upload")
    public InstrumentDTO upload(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam List<MultipartFile> files,
            @RequestParam boolean hasResonator,
            @RequestParam String instrumentType,
            @RequestParam String youtubeLink
    ) throws IOException {
        return instrumentService.upload(title, description, files, hasResonator, instrumentType, youtubeLink);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        instrumentService.deleteById(id);
    }
}
