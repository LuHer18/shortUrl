package com.luher.short_url.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luher.short_url.persistence.entity.EncryptEntity;
import com.luher.short_url.service.EncryptService;

@RestController
@RequestMapping("/api/v1/encrypt")
public class EncryptController {

    private final EncryptService encryptService;

    public EncryptController(EncryptService encryptService) {
        this.encryptService = encryptService;
    }

    @GetMapping("/all")
    public List<EncryptEntity> getAllEncrypt() {
        return encryptService.finAllEncrypt();
    }
}
