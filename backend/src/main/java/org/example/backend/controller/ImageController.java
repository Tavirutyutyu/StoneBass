package org.example.backend.controller;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;
    @Autowired
    public ImageController(ImageService imageService){
        this.imageService = imageService;
    }
    @GetMapping("/all")
    public List<ImageDTO> getAll(){
        return imageService.getAll();
    }
    @GetMapping("/id/{id}")
    public ImageDTO getById(@PathVariable Long id){
        return imageService.getById(id);
    }
}
