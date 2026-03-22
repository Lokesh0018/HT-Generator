package com.api.htg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class HtgApplication {

	public static void main(String[] args) {
		SpringApplication.run(HtgApplication.class, args);
	}

}