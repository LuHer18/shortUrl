package com.luher.short_url.service;

import java.util.List;
import java.util.Map;

import com.luher.short_url.dto.UrlDto;
import com.luher.short_url.persistence.entity.UrlEntity;
import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

public interface UrlService {
    UrlEntity createShortUrl(UrlDto urlDto);
    String getOriginalUrl(String urlShort);
    List<UrlEntity> getAllUrls();
    Map<String, String> deleteShortUrl(Long id);
    void setShortUrlGeneratorStrategy(ShortUrlGeneratorStrategy shortUrlGeneratorStrategy);
}
