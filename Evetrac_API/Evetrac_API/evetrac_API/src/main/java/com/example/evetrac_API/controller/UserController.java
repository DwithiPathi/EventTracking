package com.example.evetrac_API.controller;

import com.example.evetrac_API.DTO.GenericResponse;
import com.example.evetrac_API.DTO.ProfileEdits;
import com.example.evetrac_API.model.BaseClass;
import com.example.evetrac_API.model.Event;
import com.example.evetrac_API.model.User;
import com.example.evetrac_API.repository.EventRepository;
import com.example.evetrac_API.repository.UserRepository;
import com.example.evetrac_API.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@RestController
@CrossOrigin
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserService userService;
    public UserController() {
    }

    @PostMapping({"/registerasuser"})
    ResponseEntity<String> newUser(@RequestBody User newUser) {
        try {

            if (this.userRepository.findByEmail(newUser.getEmail()).size() > 0) {
                log.info("email already exists");
                return new ResponseEntity<>("E-mail already exists", HttpStatus.OK);
            } else {
                this.userRepository.save(newUser);
                log.info("new email");
                return new ResponseEntity<>("Registered Successfully", HttpStatus.CREATED);
            }
        } catch (Exception var3) {
            log.error("Exception occured while saving referral: " + newUser.toString(), var3);
            return new ResponseEntity<>("Registration failed", HttpStatus.FORBIDDEN);

        }
    }

    @PostMapping("/login")
    GenericResponse<User> userLogin(@RequestBody BaseClass loginRequest) {
        List<User> user = this.userRepository.findByEmail(loginRequest.getUserName());
        GenericResponse<User> response=new GenericResponse<>();
        try {
            if (user.size() == 0) {
                response.setData(null);
                response.setMessage("User does not exist");
                response.setStatus(HttpStatus.ACCEPTED);
                return response;
            } else if ((user.get(0).getPassword().equals(loginRequest.getPassword())) && (user.get(0).getUserRole().equals(loginRequest.getUserRole()))) {
                response.setData(user.get(0));
                response.setMessage("Logged in successfully!");
                response.setStatus(HttpStatus.OK);
                return response;
            }
        }catch (Exception var4) {
            log.error("exception in login", var4.toString());
                response.setData(null);
                response.setMessage("Login failed");
                response.setStatus(HttpStatus.FORBIDDEN);
                return response;

        }
        response.setData(null);
        response.setMessage("Login failed");
        response.setStatus(HttpStatus.FORBIDDEN);
        return response;
    }

    @PostMapping("/resetPassword")
    public ResponseEntity resetPassword(@RequestParam("email") String userEmail) {
        List<User> user = userRepository.findByEmail(userEmail);
        if (user.get(0) == null) {
           // throw new UserNotFoundException();
        }
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user.get(0), token);
      //  userService.sendSimpleEmail(userEmail);
//        mailSender.send(constructResetTokenEmail(getAppUrl(request),
//                request.getLocale(), token, user));
        return new ResponseEntity<>("Reset mail has been sent!", HttpStatus.OK);
    }
//    private SimpleMailMessage constructResetTokenEmail(
//            String contextPath, Locale locale, String token, User user) {
//        String url = contextPath + "/user/changePassword?token=" + token;
//        String message = messages.getMessage("message.resetPassword",
//                null, locale);
//        return constructEmail("Reset Password", message + " \r\n" + url, user);
//    }

//    private SimpleMailMessage constructEmail(String subject, String body,
//                                             User user) {
//        SimpleMailMessage email = new SimpleMailMessage();
//        email.setSubject(subject);
//        email.setText(body);
//        email.setTo(user.getEmail());
//        email.setFrom(env.getProperty("support.email"));
//        return email;
//    }

    @GetMapping({"/getAllOrganizations"})List<User> getAllusers() {
        try {
            return this.userRepository.findAll();
        } catch (Exception var2) {
            log.error("Exception in retreiving events" + var2.toString());
            return null;    }}

    @PutMapping({"/updateProfile"})
    ResponseEntity<String> updateProfileDetails(@RequestBody ProfileEdits newProfDetails){
        try{
            User user=userRepository.findByUserId(newProfDetails.getUserId());
            user.setAddress(newProfDetails.getNewAddress());
            user.setOrganizationDescription(newProfDetails.getNewOrgDescription());
            user.setOrganizationName(newProfDetails.getNewOrganizationName());
            userRepository.save(user);
            return new ResponseEntity<>("Updated Changes Successfully", HttpStatus.OK);
        }
        catch (Exception e){
            log.error("Exception in retreiving events" + e.toString());
            return null;
        }
    }

    @GetMapping({"/userByUserId"})
    User getUserByUserId(@RequestParam("userId") long userId){
        return this.userRepository.findByUserId(userId);
    }

    @GetMapping({"/addToWishlist"})
    void addToWishList(@RequestParam("userId")Long userId, @RequestParam("eventId")Long eventId) {
        User user = userRepository.findByUserId(userId);
        Event event = eventRepository.findEventByEventId(eventId);
        user.getCreatedEvents().add(event);
        userRepository.save(user);
    }

    @GetMapping({"/removeFromWishlist"})
    void removeFromWishlist(@RequestParam("userId")Long userId, @RequestParam("eventId")Long eventId) {
        User user = userRepository.findByUserId(userId);
        Event event = eventRepository.findEventByEventId(eventId);
        user.getCreatedEvents().remove(event);
        userRepository.save(user);

    }
}

