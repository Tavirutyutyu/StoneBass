package org.example.backend.controller;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.DTO.InstrumentTypeDTO;
import org.example.backend.service.InstrumentService;
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
    public List<ImageDTO> getAll() {
        return instrumentService.getAll();
    }

    @GetMapping("/id/{id}")
    public ImageDTO getById(@PathVariable Long id) {
        return instrumentService.getById(id);
    }

    @GetMapping("/filter")
    public List<ImageDTO> filter(@RequestParam (required = false) String instrumentType, @RequestParam (required = false) String hasResonator) {
        logger.info("filter instrumentType: " + instrumentType);
        logger.info("filter hasResonator: " + hasResonator);
        return instrumentService.filter(instrumentType, hasResonator);
    }

    @GetMapping("/type/{type}")
    public List<ImageDTO> getByType(@PathVariable String type) {
        return instrumentService.getByType(type);
    }

    @GetMapping("/hasResonator/{hasResonator}")
    public List<ImageDTO> getByResonator(@PathVariable Boolean hasResonator) {
        return instrumentService.getByResonator(hasResonator);
    }

    @PostMapping("/upload")
    public ImageDTO upload(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file,
            @RequestParam("hasResonator") boolean hasResonator,
            @RequestParam("instrumentType") String instrumentType) throws IOException {
        return instrumentService.upload(title, description, file, hasResonator, instrumentType);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        instrumentService.deleteById(id);
    }
}
