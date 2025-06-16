package com.luher.short_url.strategy.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

@Component("sha256Base62Generator")
public class Sha256Base62Generator implements ShortUrlGeneratorStrategy {
    private static final String BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    @Override
    public String generateShortUrl(String urlOriginal) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(urlOriginal.getBytes(StandardCharsets.UTF_8));
            return encodeBase62(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm no funciona", e);
        }
    }

    private String encodeBase62(byte[] digest) {
        StringBuilder shortUrl = new StringBuilder();
        for (byte b : digest) {
            shortUrl.append(BASE62_CHARS.charAt((b & 0xFF) % BASE62_CHARS.length()));
        }
        return shortUrl.toString();
    }
}
