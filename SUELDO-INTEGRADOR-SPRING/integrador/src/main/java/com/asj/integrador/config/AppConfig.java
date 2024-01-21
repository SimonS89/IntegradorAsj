package com.asj.integrador.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class AppConfig {

    @Value("${country.base.url2}")
    private String urlBaseCountry;

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public WebClient webClient(){
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "U0xEa3ltbE50R3ZMS0hOb3l2UmkwRENQaVd3cXhsQVBaUXhRS0YzRg==");
        return WebClient.builder().baseUrl(urlBaseCountry).defaultHeaders(httpHeaders -> httpHeaders.addAll(headers)).codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)).build();
    }

    @Bean
    public RestClient restClient(){
        return RestClient.builder().baseUrl(urlBaseCountry).build();
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
