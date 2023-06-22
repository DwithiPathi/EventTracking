package com.example.evetrac_API.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.Set;

@Entity(
        name = "Event"
)
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long eventId;

    @ManyToMany(mappedBy = "createdEvents")
    Set<User> registeredUsers;
    @Column(name = "Event_Name")
    private String eventName;
    @Column(name = "Event_Descirption")
    private String eventDescription;
    @Column(name = "Created_User_Id")
    private int createdUserId;
    @Column(name = "Event_Location")
    private String eventLocation;
    @Column(name = "Event_Start_Date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date eventStartDate;
    @Column(name = "Event_End_Date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date eventEndDate;
    @Column(name = "Event_Start_Time")
    private String eventStartTime;
    @Column(name = "Event_End_Time")
    private String eventEndTime;

    @Column(name = "Is_Registration_Required")
    private String isRegistrationRequired;
    @Column(name = "Registration_Url")
    private String registrationUrl;

    @Lob
    @Column(name = "Image_Poster", length = 16777215)
    private byte[] imagePoster;
    //constructor
    public Event() {
    }



    //Getter and Setters
    public long getEventId() {
        return this.eventId;
    }

    public String getEventName() {
        return this.eventName;
    }

    public String getEventDescription() {
        return this.eventDescription;
    }
    public String getEventLocation() {
        return this.eventLocation;
    }

    public void setEventId(final long eventId) {
        this.eventId = eventId;
    }

    public void setEventName(final String eventName) {
        this.eventName = eventName;
    }

    public void setEventDescription(final String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public void setEventLocation(final String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public int getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(int createdUserId) {
        this.createdUserId = createdUserId;
    }

    public Date getEventStartDate() {return eventStartDate;}

    public String getEventEndTime() {return eventEndTime;}

    public void setEventEndTime(String eventEndTime) {this.eventEndTime = eventEndTime;}

    public String getEventStartTime() {return eventStartTime;}

    public void setEventStartTime(String eventStartTime) {this.eventStartTime = eventStartTime;}

    public Date getEventEndDate() {return eventEndDate;}

    @JsonFormat(pattern = "yyyy-MM-dd")
    public void setEventEndDate(Date eventEndDate) {this.eventEndDate = eventEndDate;}

    @JsonFormat(pattern = "yyyy-MM-dd")
    public void setEventStartDate(Date eventStartDate) {this.eventStartDate = eventStartDate;}

    public String getIsRegistrationRequired() {return isRegistrationRequired;}

    public void setIsRegistrationRequired(String isRegistrationRequired) {this.isRegistrationRequired = isRegistrationRequired;}

    public String getRegistrationUrl() {return registrationUrl;}

    public void setRegistrationUrl(String registrationUrl) {this.registrationUrl = registrationUrl;}
    public byte[] getImagePoster() {return imagePoster;}

    public void setImagePoster(byte[] imagePoster) {this.imagePoster = imagePoster;}
}