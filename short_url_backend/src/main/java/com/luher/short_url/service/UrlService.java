package com.luher.short_url.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.luher.short_url.dto.UrlDto;
import com.luher.short_url.persistence.entity.UrlEntity;
import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

public interface UrlService {
    UrlEntity createShortUrl(UrlDto urlDto);
    String getOriginalUrl(String urlShort);
    List<UrlEntity> getAllUrls();
    Page<UrlEntity> getAllUrlsPaginated(Pageable pageable);
    Map<String, String> deleteShortUrl(Long id);
    void setShortUrlGeneratorStrategy(ShortUrlGeneratorStrategy shortUrlGeneratorStrategy);
}
