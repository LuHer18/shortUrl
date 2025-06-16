package com.luher.short_url.strategy;

import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class ShortUrlGeneratorStrategyFactory {
    
    private final Map<String, ShortUrlGeneratorStrategy> strategies;


    public ShortUrlGeneratorStrategyFactory(Map<String, ShortUrlGeneratorStrategy> strategies) {
        this.strategies = strategies;
    }

    public ShortUrlGeneratorStrategy getStrategy(String strategyName) {
        ShortUrlGeneratorStrategy strategy = strategies.get(strategyName);
        if (strategy == null) {
            throw new IllegalArgumentException("Estrategia no encontrada: " + strategyName);
        }
        return strategy;
    }
} 