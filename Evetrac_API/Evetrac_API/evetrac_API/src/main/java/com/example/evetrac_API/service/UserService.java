package com.example.evetrac_API.service;

import com.example.evetrac_API.model.PasswordResetToken;
import com.example.evetrac_API.model.User;
import com.example.evetrac_API.repository.passwordTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Calendar;
import java.util.Date;

@Service
@Transactional
public class UserService {
    @Autowired
    public passwordTokenRepository passwordTokenRepository;
    public void createPasswordResetTokenForUser(User user, String token) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, 30);
        Date createdDate=cal.getTime();
        PasswordResetToken myToken = new PasswordResetToken(token, user,createdDate);
        passwordTokenRepository.save(myToken);
    }

//      @Autowired
//      private JavaMailSender mailSender;
//
//    public void sendSimpleEmail(String toEmail) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("evetracupdates@gmail.com");
//        message.setTo(toEmail);
//        message.setText("Hi from evetrac");
//        message.setSubject("Forgot password test");
//        mailSender.send(message);
//        System.out.println("Mail Send...");
//  }



}
