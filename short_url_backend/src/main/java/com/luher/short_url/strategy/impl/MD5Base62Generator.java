package com.luher.short_url.strategy.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.stereotype.Component;

import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;

@Component("md5Base62Generator")
public class MD5Base62Generator implements ShortUrlGeneratorStrategy {
    private static final String BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    @Override
    public String generateShortUrl(String urlOriginal) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(urlOriginal.getBytes(StandardCharsets.UTF_8));
            return encodeBase62(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 algorithm no funciona", e);
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
