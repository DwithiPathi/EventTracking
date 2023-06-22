package com.example.evetrac_API.model;

public class BaseClass {

    private String userName;
    private String password;
    private String userRole;

    public BaseClass() {
    }

    public String getUserName() {
        return this.userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}

