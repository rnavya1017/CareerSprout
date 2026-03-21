package com.careersprout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

    @GetMapping("/")
    public String home() {
        return "CareerSprout Backend is successfully deployed and running! \n\nNote: This is an API server, so you will only see text here. Use the frontend URL to access the UI.";
    }

    @GetMapping("/api/health")
    public String health() {
        return "CareerSprout Backend is Running!";
    }
}
