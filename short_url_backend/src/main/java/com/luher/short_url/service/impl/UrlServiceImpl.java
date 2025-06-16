package com.luher.short_url.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.luher.short_url.dto.UrlDto;
import com.luher.short_url.persistence.entity.UrlEntity;
import com.luher.short_url.persistence.repository.UrlRepository;    
import com.luher.short_url.service.UrlService;
import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

@Service
public class UrlServiceImpl implements UrlService {

    private final UrlRepository urlRepository;
    private ShortUrlGeneratorStrategy shortUrlGeneratorStrategy;

    public UrlServiceImpl(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @Autowired
    @Qualifier("randomAlphanumericGenerator")
    @Override
    public void setShortUrlGeneratorStrategy(ShortUrlGeneratorStrategy shortUrlGeneratorStrategy) {
        this.shortUrlGeneratorStrategy = shortUrlGeneratorStrategy;
    }

    @Override
    public UrlEntity createShortUrl(UrlDto urlDto) {

        Optional<UrlEntity> existingUrl = urlRepository.findByUrlOriginal(urlDto.getUrlOriginal());
        if (existingUrl.isPresent()) {
            return existingUrl.get();
        }

        String shortUrl;
        do {
        shortUrl = shortUrlGeneratorStrategy.generateShortUrl(urlDto.getUrlOriginal());
        } while (urlRepository.findByUrlShort(shortUrl).isPresent());

        UrlEntity urlEntity = UrlEntity.builder()
            .urlOriginal(urlDto.getUrlOriginal())
            .name(urlDto.getName())
            .urlShort(shortUrl)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        return urlRepository.save(urlEntity);
    }

    @Override
    public String getOriginalUrl(String urlShort) {
        UrlEntity urlEntity = urlRepository.findByUrlShort(urlShort)
            .orElseThrow(() -> new RuntimeException(" La URL corta no ha sido encontrada"));


            return urlEntity.getUrlOriginal();
    }



    @Override
    public Map<String, String> deleteShortUrl(Long id) {
        try {
            UrlEntity urlEntity = urlRepository.findById(id).orElseThrow(() -> new RuntimeException("La URL no existe"));
            urlRepository.deleteById(urlEntity.getId());
            return Map.of("message", "URL eliminada correctamente");
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la URL");
        }
    }

    @Override
    public List<UrlEntity> getAllUrls() {
        return urlRepository.findAll();
    }


}
