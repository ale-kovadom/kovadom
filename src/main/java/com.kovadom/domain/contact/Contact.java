package com.kovadom.domain.contact;

import java.util.Optional;

import static java.util.Optional.ofNullable;

public class Contact {

    private String firstName;

    private String lastName;

    private String company;

    private String phoneNumber;

    private String email;


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Optional<String> getCompany() {
        return ofNullable(company);
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

}
