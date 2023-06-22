package com.example.evetrac_API.repository;

import com.example.evetrac_API.model.Event;
import com.example.evetrac_API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventName(String eventName);

    List<Event> findByEventLocation(String eventLocation);

    Event findEventByEventId(Long eventId);

    List<Event> findByEventStartDateAfter(LocalDate eventStartDate);

    List<Event> findByEventEndDateBefore(LocalDate eventEndDate);

    Set<Event> findByEventLocationContainingAndEventStartDateGreaterThan(String eventLocation, LocalDate eventStartDate);


    Set<Event> findByEventNameContainingAndEventStartDateGreaterThan(String eventLocation,LocalDate eventStartDate);



    List<Event> findByEventLocationContaining(String eventLocation);
    Set<Event> findByEventLocationContainingAndEventEndDateBefore(String eventLocation,LocalDate eventEndDate);
    Set<Event> findByEventNameContainingAndEventEndDateBefore(String eventLocation,LocalDate eventEndDate);

    List<Event> findEventByCreatedUserId(Long createdUserId);
    //List<Event> findByEventDate(Date eventDate);
    List<Event> findByRegisteredUsers(Long userId);

}
