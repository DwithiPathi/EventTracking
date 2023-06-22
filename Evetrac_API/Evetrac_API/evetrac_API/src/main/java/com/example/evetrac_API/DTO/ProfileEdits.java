package com.example.evetrac_API.DTO;

public class ProfileEdits {

    private long userId;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    private String newAddress;
    private String newOrganizationName;
    private String newOrgDescription;

    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
    }

    public String getNewOrganizationName() {
        return newOrganizationName;
    }

    public void setNewOrganizationName(String newOrganizationName) {
        this.newOrganizationName = newOrganizationName;
    }

    public String getNewOrgDescription() {
        return newOrgDescription;
    }

    public void setNewOrgDescription(String newOrgDescription) {
        this.newOrgDescription = newOrgDescription;
    }
}
