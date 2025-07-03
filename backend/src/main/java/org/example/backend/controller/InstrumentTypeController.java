package org.example.backend.controller;

import org.example.backend.DTO.InstrumentTypeDTO;
import org.example.backend.service.InstrumentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentType")
public class InstrumentTypeController {
    private final InstrumentTypeService instrumentTypeService;

    @Autowired
    public InstrumentTypeController(InstrumentTypeService instrumentTypeService) {
        this.instrumentTypeService = instrumentTypeService;
    }

    @GetMapping("/all")
    public List<InstrumentTypeDTO> findAll() {
        return instrumentTypeService.findAll();
    }
}
