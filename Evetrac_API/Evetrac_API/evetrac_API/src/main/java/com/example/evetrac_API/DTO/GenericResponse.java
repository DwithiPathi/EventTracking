package com.example.evetrac_API.DTO;

import org.springframework.http.HttpStatusCode;

public class GenericResponse<T> {
    private T data;
    private HttpStatusCode status;
    private String message;

    public HttpStatusCode getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String error) {
        this.message = error;
    }

    public void setStatus(HttpStatusCode status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
