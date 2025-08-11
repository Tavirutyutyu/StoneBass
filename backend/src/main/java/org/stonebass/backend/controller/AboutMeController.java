package org.stonebass.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.stonebass.backend.DTO.AboutMeDTO;
import org.stonebass.backend.service.AboutMeService;

@RestController
@RequestMapping("/api/aboutMe")
public class AboutMeController {
    private final AboutMeService aboutMeService;
    @Autowired
    public AboutMeController(AboutMeService aboutMeService) {
        this.aboutMeService = aboutMeService;
    }
    @GetMapping("/get")
    public AboutMeDTO getAboutMe() {
        return aboutMeService.getAboutMe();
    }
}
