package com.luher.short_url.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.luher.short_url.dto.UrlDto;
import com.luher.short_url.persistence.entity.UrlEntity;
import com.luher.short_url.service.UrlService;
import com.luher.short_url.strategy.ShortUrlGeneratorStrategy;
import com.luher.short_url.strategy.ShortUrlGeneratorStrategyFactory;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/url")
public class UrlController {

    private final UrlService urlService;
    private final ShortUrlGeneratorStrategyFactory shortUrlGeneratorStrategyFactory;

    public UrlController(UrlService urlService, ShortUrlGeneratorStrategyFactory shortUrlGeneratorStrategyFactory) {
        this.urlService = urlService;
        this.shortUrlGeneratorStrategyFactory = shortUrlGeneratorStrategyFactory;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createShortUrl(@RequestBody @Valid UrlDto urlDto,
            @RequestParam(required = false, defaultValue = "randomAlphanumericGenerator") String strategy) {

        ShortUrlGeneratorStrategy shortUrlGeneratorStrategy = shortUrlGeneratorStrategyFactory.getStrategy(strategy);
        urlService.setShortUrlGeneratorStrategy(shortUrlGeneratorStrategy);
        UrlEntity createdUrl = urlService.createShortUrl(urlDto);
        return ResponseEntity.ok(createdUrl);
    }

    @GetMapping("/{urlShort}")
    public RedirectView getOrginalUrl(@PathVariable String urlShort) {
        try {
            String url = urlService.getOriginalUrl(urlShort);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(url);
            return redirectView;
        } catch (Exception e) {
            return new RedirectView("/error");
        }

    }


    @GetMapping("/error")
    public ResponseEntity<String> handleError() {
        return new ResponseEntity<>("La URL corta no existe o es inválida.", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUrls() {
        List<UrlEntity> urlEntities = urlService.getAllUrls();
        return ResponseEntity.ok(urlEntities);
    }

    @GetMapping("/all/paginated")
    public ResponseEntity<?> getAllUrlsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? 
            Sort.by(sortBy).ascending() : 
            Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<UrlEntity> urlEntities = urlService.getAllUrlsPaginated(pageable);
        
        return ResponseEntity.ok(urlEntities);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShortUrl(@PathVariable Long id) {
        urlService.deleteShortUrl(id);
        return ResponseEntity.ok("URL eliminada correctamente");
    }

}
