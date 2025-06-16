package com.luher.short_url.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.luher.short_url.persistence.entity.UrlEntity;

@Repository
public interface UrlRepository extends JpaRepository<UrlEntity, Long> {
    Optional<UrlEntity> findByUrlShort(String urlShort);
    Optional<UrlEntity> findByUrlOriginal(String urlOriginal);  

}
