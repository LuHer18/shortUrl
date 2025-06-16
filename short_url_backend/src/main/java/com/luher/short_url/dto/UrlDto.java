package com.luher.short_url.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlDto {
    @NotBlank(message = "La URL original no puede estar vacía")
    private String urlOriginal;
    @NotBlank(message = "El nombre no puede estar vacío")
    private String name;

}
