package com.example.evetrac_API;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@SpringBootApplication
public class EvetracApiApplication {
		public static void main(String[] args) {
		SpringApplication.run(EvetracApiApplication.class, args);
	}

//	@Bean
//	public JavaMailSender javaMailSender() {
//		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//		return mailSender;
//	}

}
