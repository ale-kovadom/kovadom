package com.kovadom.domain.host;

public class Host {

    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    // JPA
    public Host() {

    }

    public Host(final String email, final String firstName, final String lastName, final String phone) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhone() {
        return phone;
    }

}
