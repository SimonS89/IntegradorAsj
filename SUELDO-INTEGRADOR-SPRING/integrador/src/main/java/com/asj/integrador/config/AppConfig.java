package com.asj.integrador.config;

import com.asj.integrador.util.Encriptador;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Value("${country.base.url2}")
    private String urlBaseCountry;

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    @Bean
    public WebClient webClient() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "U0xEa3ltbE50R3ZMS0hOb3l2UmkwRENQaVd3cXhsQVBaUXhRS0YzRg==");
        return WebClient.builder().baseUrl(urlBaseCountry).defaultHeaders(httpHeaders -> httpHeaders.addAll(headers)).codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)).build();
    }

    @Bean
    public Encriptador encryptionUtils() {
        return new Encriptador();
    }

    @Bean
    public RestClient restClient() {
        return RestClient.builder().baseUrl(urlBaseCountry).build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*");
    }

}
