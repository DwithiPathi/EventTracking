package com.example.evetrac_API.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity(
        name = "User"
)
public class User {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private long userId;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_event",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    Set<Event> createdEvents;

    public Set<Event> getCreatedEvents() {
        return createdEvents;
    }

    public void setCreatedEvents(Set<Event> createdEvents) {
        this.createdEvents = createdEvents;
    }

    @Column(
            name = "First_Name"
    )
    private String firstName;
    @Column(
            name = "Last_Name"
    )
    private String lastName;
    @Column(
            name = "Password"
    )
    private String password;
    @Column(
            name = "Address"
    )
    private String address;
    @Column(
            name = "Email"
    )
    private String email;

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    @Column(
            name = "userRole"
    )
    private String userRole;

    @Column(
            name = "OrganizationName"
    )
    private String organizationName;

    @Column(
            name = "OrganizationDescription"
    )
    private String organizationDescription;
    public User() {
    }

    public long getUserId() {
        return this.userId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }
    public String getPassword() {
        return this.password;
    }

    public String getAddress() {
        return this.address;
    }

    public String getEmail() {
        return this.email;
    }

    public void setUserId(final long userId) {
        this.userId = userId;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public void setAddress(final String address) {
        this.address = address;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getOrganizationDescription() {
        return organizationDescription;
    }

    public void setOrganizationDescription(String organizationDescription) {
        this.organizationDescription = organizationDescription;
    }
}
