package com.example.evetrac_API.controller;

import com.example.evetrac_API.DTO.GenericResponse;
import com.example.evetrac_API.DTO.ResponseBlob;
import com.example.evetrac_API.model.Event;
import com.example.evetrac_API.model.User;
import com.example.evetrac_API.repository.EventRepository;
import com.example.evetrac_API.repository.UserRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin("*")
public class EventController {

    private static final Logger log = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;



    public EventController() {
    }

//    @PostMapping({"/uploadImage"})
//    String newEvent(@RequestParam("file") MultipartFile file) {
//        return "upload success";
//    }

//    @PostMapping({"/addNewFile"})
//    Event newEvent(@RequestParam("name") String name, @RequestBody Event event) {
//        log.info("Event: "+ event.toString()+ " name: " + name);
//        return event;
//
//    }


    @PostMapping(value={"/addNewEvent"},consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String newEvent(@RequestParam("file") MultipartFile file,@RequestParam("myObject") String event) throws JsonProcessingException {
       // return newEvent;
        ObjectMapper objectMapper = new ObjectMapper();
        Event newEvent = objectMapper.readValue(event, Event.class);
        log.info(newEvent.getEventName()+"I reached");
        try {
            if (this.eventRepository.findByEventName(newEvent.getEventName()).size() > 0 && this.eventRepository.findByEventLocation(newEvent.getEventLocation()).size() > 0) {
                log.info("Event already exists");
                return "Event already exists";
            } else {
                newEvent.setImagePoster(file.getBytes());
                this.eventRepository.save(newEvent);
                log.info("Event created succesfully");
                return "Event created Succesfully";
            }
        } catch (Exception var3) {
            log.error("Exception occured while saving referral: " + newEvent.toString(), var3);
            return "Event creation failed";
        }
    }

    @GetMapping({"/getAllUpcomingEvents"})
    List<ResponseBlob> getUpcomingEvents() {
        try {
            LocalDate today = LocalDate.now();
            List<Event> eb=this.eventRepository.findByEventStartDateAfter(today);
            List<ResponseBlob> newResponse=new ArrayList<>();
            for(Event event : eb)
            {
                ResponseBlob newResponse1=new ResponseBlob();
                newResponse1.setData(event);
                User u = this.userRepository.findByUserId(event.getCreatedUserId());
                newResponse1.setOrgnaizationName(u.getOrganizationName());
                newResponse1.setOrganizationDescription(u.getOrganizationDescription());
                newResponse.add(newResponse1);
            }
            return newResponse;
        } catch (Exception var2) {
            log.error("Exception in retreiving events" + var2.toString());
            return null;
        }
    }

    @GetMapping({"/getAllPreviousEvents"})
    List<ResponseBlob> getPreviousEvents() {
        try {
            LocalDate today = LocalDate.now();
            List<Event> eb=this.eventRepository.findByEventEndDateBefore(today);
            List<ResponseBlob> newResponse=new ArrayList<>();
            for(Event event : eb)
            {
                ResponseBlob newResponse1=new ResponseBlob();
                newResponse1.setData(event);
                User u = this.userRepository.findByUserId(event.getCreatedUserId());
                newResponse1.setOrgnaizationName(u.getOrganizationName());
                newResponse1.setOrganizationDescription(u.getOrganizationDescription());
                newResponse.add(newResponse1);
            }
            return newResponse;
        } catch (Exception var2) {
            log.error("Exception in retreiving events" + var2.toString());
            return null;
        }
    }

//    @GetMapping({"/getEventsbyOrganizationName"})
//    List<Event> eventsByOrg(@RequestBody String organizationName) {
//        try {
//            return this.eventRepository.findByOrganizationName(organizationName);
//        } catch (Exception var3) {
//            log.error("Exception in retreiving events" + var3.toString());
//            return null;
//        }
//    }

//    @GetMapping({"/getAllOrganizations"})
//    Map<String,String> getAllOrganizations() {
//        try {
//            HashMap<String,String> organizationDetails=new HashMap<>();
//            List<Event>  eves=new LinkedList<>(this.eventRepository.findAll());
//            for(Event ele :eves) {
//                List<User> usetd=(this.userRepository.findByCreatedEvents(ele.getEventId()));
//                organizationDetails.put(ele.getOrganizationName(),usetd.get(0).getOrganizationDescription());
//            }
//            return organizationDetails;    }
//        catch (Exception var2) {
//            log.error("Exception in retreiving organization names" + var2.toString());
//            return null;    }
//    }

//    @GetMapping({"/location"})
//    List<Event> eventsByLocation(@RequestParam String eventLocation) {
//        try {
//            return this.eventRepository.findByEventLocation(eventLocation);
//        } catch (Exception var3) {
//            log.error("Exception in retreiving events" + var3.toString());
//            return null;    }
//    }


@GetMapping({"/location"})
List<ResponseBlob> eventsByLocation(@RequestParam String eventLocation) {
    try {
        LocalDate today = LocalDate.now();
        Set<Event> FoundEvents = new HashSet<>();
        FoundEvents =  this.eventRepository.findByEventLocationContainingAndEventStartDateGreaterThan(eventLocation,today);
        Set<Event> FoundEventsByName = new HashSet<>();
        FoundEvents.addAll(this.eventRepository.findByEventNameContainingAndEventStartDateGreaterThan(eventLocation,today));
        List<ResponseBlob> newResponse=new ArrayList<>();
        for(Event event : FoundEvents)
        {
            ResponseBlob newResponse1=new ResponseBlob();
            newResponse1.setData(event);
            User u = this.userRepository.findByUserId(event.getCreatedUserId());
            newResponse1.setOrgnaizationName(u.getOrganizationName());
            newResponse1.setOrganizationDescription(u.getOrganizationDescription());
            newResponse.add(newResponse1);
        }
        return newResponse;

    } catch (Exception var3) {
        log.error("Exception in retreiving events" + var3.toString());
        return null;    }
}

    @GetMapping({"/location1"})
    List<ResponseBlob> eventsByBeforeLocation(@RequestParam String eventLocation) {
        try {
            LocalDate today = LocalDate.now();
            Set<Event> FoundEvents = new HashSet<>();
            FoundEvents =  this.eventRepository.findByEventLocationContainingAndEventEndDateBefore(eventLocation,today);
            Set<Event> FoundEventsByName = new HashSet<>();
            FoundEvents.addAll(this.eventRepository.findByEventNameContainingAndEventEndDateBefore(eventLocation,today));

            List<ResponseBlob> newResponse=new ArrayList<>();
            for(Event event : FoundEvents)
            {
                ResponseBlob newResponse1=new ResponseBlob();
                newResponse1.setData(event);
                User u = this.userRepository.findByUserId(event.getCreatedUserId());
                newResponse1.setOrgnaizationName(u.getOrganizationName());
                newResponse1.setOrganizationDescription(u.getOrganizationDescription());
                newResponse.add(newResponse1);
            }
            return newResponse;

        } catch (Exception var3) {
            log.error("Exception in retreiving events" + var3.toString());
            return null;    }
    }

    @GetMapping({"/locationonUserId"})
    List<ResponseBlob> eventsByUserIdLocation(@RequestParam String eventLocation,@RequestParam Long userId) {
        try {
            List<Event> AllEventsOnUserId = this.eventRepository.findEventByCreatedUserId(userId);
            List<Event> MatchingEvents = new ArrayList<>();
            for(Event event : AllEventsOnUserId)
            {
                if((event.getEventLocation().toUpperCase()).contains(eventLocation.toUpperCase()) || (event.getEventName().toUpperCase()).contains(eventLocation.toUpperCase()))
                {
                    MatchingEvents.add(event);
                }
            }
            List<ResponseBlob> newResponse=new ArrayList<>();
            for(Event event : MatchingEvents)
            {
                ResponseBlob newResponse1=new ResponseBlob();
                newResponse1.setData(event);
                User u = this.userRepository.findByUserId(event.getCreatedUserId());
                newResponse1.setOrgnaizationName(u.getOrganizationName());
                newResponse1.setOrganizationDescription(u.getOrganizationDescription());
                newResponse.add(newResponse1);
            }
            return newResponse;


        } catch (Exception var3) {
            log.error("Exception in retreiving events" + var3.toString());
            return null;    }
    }

//    @GetMapping({"/getEventByEventId"})
//    ResponseBlob<Event> eventByEventName(@RequestParam Long eventId) {
//        ResponseBlob<Event> response=new ResponseBlob<>();
//        try {
//            Event result=this.eventRepository.findEventByEventId(eventId);
//            response.setData(result);
//            response.setPoster(result.getImagePoster());
//            response.setStatus(HttpStatus.OK);
//            response.setMessage("Event Found");
//            return response;
//           // return this.eventRepository.findEventByEventId(eventId);
//        } catch (Exception var3) {
//            log.error("Exception in retreiving event" + var3.toString());
//            return null;    }
//    }
    @GetMapping({"/getEventByEventId"})
    ResponseBlob<Event> eventByEventName(@RequestParam Long eventId) {
        try {
            Event e = this.eventRepository.findEventByEventId(eventId);
            ResponseBlob newResponse=new ResponseBlob();
            newResponse.setData(e);
            User u = this.userRepository.findByUserId(e.getCreatedUserId());
            newResponse.setOrgnaizationName(u.getOrganizationName());
            newResponse.setOrganizationDescription(u.getOrganizationDescription());
            return newResponse;
          // return this.eventRepository.findEventByEventId(eventId);
        } catch (Exception var3) {
            log.error("Exception in retreiving event" + var3.toString());
            return null;    }
    }
    @GetMapping({"/getEventByUserId"})
    List<ResponseBlob>  eventByCreatedUserId(@RequestParam Long userId) {
        try {
            List<Event> eb=this.eventRepository.findEventByCreatedUserId(userId);
            List<ResponseBlob> newResponse=new ArrayList<>();
            for(Event event : eb)
            {
                ResponseBlob newResponse1=new ResponseBlob();
                newResponse1.setData(event);
                User u = this.userRepository.findByUserId(event.getCreatedUserId());
                newResponse1.setOrgnaizationName(u.getOrganizationName());
                newResponse1.setOrganizationDescription(u.getOrganizationDescription());
                newResponse.add(newResponse1);
            }
            return newResponse;

        } catch (Exception var3) {
            log.error("Exception in retreiving event" + var3.toString());
            return null;    }
    }

    @PutMapping(value={"/updateEventDetails"},consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseBlob<Event>  updateEventDetails(@RequestParam("file") MultipartFile file,@RequestParam("myObject") String event) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Event evedetails = objectMapper.readValue(event, Event.class);
            Event eventToUpdate = eventRepository.findEventByEventId(evedetails.getEventId());
            eventToUpdate.setEventName(evedetails.getEventName());
            eventToUpdate.setEventDescription(evedetails.getEventDescription());
            eventToUpdate.setEventLocation(evedetails.getEventLocation());
            eventToUpdate.setEventEndTime(evedetails.getEventEndTime());
            eventToUpdate.setEventStartTime(evedetails.getEventStartTime());
            eventToUpdate.setEventStartDate(evedetails.getEventStartDate());
            eventToUpdate.setEventEndDate(evedetails.getEventEndDate());
            eventToUpdate.setIsRegistrationRequired(evedetails.getIsRegistrationRequired());
            eventToUpdate.setRegistrationUrl(evedetails.getRegistrationUrl());
            // Update any other fields as needed
            Event updatedEvent = eventRepository.save(eventToUpdate);
            ResponseBlob<Event> response=new ResponseBlob<>();
            response.setData(eventRepository.findEventByEventId(updatedEvent.getEventId()));
            User u = this.userRepository.findByUserId(updatedEvent.getCreatedUserId());
            response.setOrgnaizationName(u.getOrganizationName());
            response.setOrganizationDescription(u.getOrganizationDescription());
            return response;

        } catch (Exception var3) {
            log.error("Exception in retreiving event" + var3.toString());
            return null;    }
    }

    @DeleteMapping({"/deleteEvent"})
    String deleteEvent(@RequestParam long eventId) {
        try {
            eventRepository.delete(eventRepository.findEventByEventId(eventId));
            return "Successfully deleted event!!";

        } catch (Exception var3) {
            log.error("Exception in retreiving event" + var3.toString());
            return null;    }
    }

    @GetMapping({"/getAllWishlistedEvents"})
    Set<ResponseBlob> getAllWishlistedEvents(@RequestParam long userId) {
        try {
            User u = this.userRepository.findByUserId(userId);
            Set<Event> eventsList=u.getCreatedEvents();
            Set<ResponseBlob> responseEvents=new HashSet<ResponseBlob>();
            for (Event e:eventsList
                 ) {
                ResponseBlob newResponse=new ResponseBlob();
                newResponse.setData(e);
                User ur = this.userRepository.findByUserId(e.getCreatedUserId());
                newResponse.setOrgnaizationName(ur.getOrganizationName());
                newResponse.setOrganizationDescription(ur.getOrganizationDescription());
                responseEvents.add(newResponse);
            }
            return responseEvents;
        } catch (Exception var3) {
            log.error("Exception in retreiving event" + var3.toString());
            return null;    }
    }
}
