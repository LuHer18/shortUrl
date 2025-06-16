package com.luher.short_url.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luher.short_url.persistence.entity.EncryptEntity;
import com.luher.short_url.persistence.repository.EncryptRepository;
import com.luher.short_url.service.EncryptService;

@Service
public class EncryptServiceImpl implements EncryptService {

    @Autowired
    private final EncryptRepository encryptRepository;
    
    public EncryptServiceImpl(EncryptRepository encryptRepository) {
        this.encryptRepository = encryptRepository;
    }

    @Override
    public List<EncryptEntity> finAllEncrypt() {
        return encryptRepository.findAll();
    }


}
