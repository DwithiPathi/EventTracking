package com.example.evetrac_API.DTO;

import com.example.evetrac_API.model.Event;
import org.springframework.http.HttpStatusCode;

public class ResponseBlob<T> {

    private T data;

    private String orgnaizationName;

    public String getOrgnaizationName() {
        return orgnaizationName;
    }

    public void setOrgnaizationName(String orgnaizationName) {
        this.orgnaizationName = orgnaizationName;
    }

    public String getOrganizationDescription() {
        return organizationDescription;
    }

    public void setOrganizationDescription(String organizationDescription) {
        this.organizationDescription = organizationDescription;
    }

    private String organizationDescription;
    private byte[] poster;
    private HttpStatusCode status;
    private String message;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public byte[] getPoster() {
        return poster;
    }

    public void setPoster(byte[] poster) {
        this.poster = poster;
    }

    public HttpStatusCode getStatus() {
        return status;
    }

    public void setStatus(HttpStatusCode status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
