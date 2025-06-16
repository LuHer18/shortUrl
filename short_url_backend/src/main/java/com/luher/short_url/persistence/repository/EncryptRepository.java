package com.luher.short_url.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luher.short_url.persistence.entity.EncryptEntity;

public interface EncryptRepository extends JpaRepository<EncryptEntity, Long> {

}
