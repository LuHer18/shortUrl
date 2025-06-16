package com.luher.short_url.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "encrypt_url")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EncryptEntity {

    @Id
    private Long id;
    @Column(name = "type", nullable = false)
    private String type;

}
