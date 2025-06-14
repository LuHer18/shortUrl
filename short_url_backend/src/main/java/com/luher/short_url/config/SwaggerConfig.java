package com.luher.short_url.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;

@Configuration
public class SwaggerConfig {

    @Value("${api.doc.title}")
    private String title;
    @Value("${api.doc.description}")
    private String description;
    @Value("${api.doc.version}")
    private String version;
    @Value("${api.doc.contact.name}")
    private String contactName;
    @Value("${api.doc.contact.email}")
    private String contactEmail;
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title(title)
                .description(description)
                .version(version)
                .contact(new Contact()
                    .name(contactName)
                    .email(contactEmail)));
    }


}
