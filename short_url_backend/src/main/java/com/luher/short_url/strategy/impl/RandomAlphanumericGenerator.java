package com.luher.short_url.strategy.impl;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

@Component("randomAlphanumericGenerator")
public class RandomAlphanumericGenerator implements ShortUrlGeneratorStrategy {
    private static final String ALPHANUMERIC_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int SHORT_URL_LENGTH = 7;

    @Override
    public String generateShortUrl(String urlOriginal) {
        SecureRandom random = new SecureRandom();
        StringBuilder shortUrl = new StringBuilder(SHORT_URL_LENGTH);
        for (int i = 0; i < SHORT_URL_LENGTH; i++) {
            int index = random.nextInt(ALPHANUMERIC_CHARS.length());
            shortUrl.append(ALPHANUMERIC_CHARS.charAt(index));
        }
        return shortUrl.toString();
    }

    }
