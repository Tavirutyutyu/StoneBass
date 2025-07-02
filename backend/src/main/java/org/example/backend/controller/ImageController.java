package org.example.backend.controller;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/all")
    public List<ImageDTO> getAll() {
        return imageService.getAll();
    }

    @GetMapping("/id/{id}")
    public ImageDTO getById(@PathVariable Long id) {
        return imageService.getById(id);
    }

    @PostMapping("/upload")
    public ImageDTO upload(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file) throws IOException {
        return imageService.upload(title, description, file);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        imageService.deleteById(id);
    }
}
