package com.kovadom.domain;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Greeting extends AbstractPersistable<Long>  {

    @Column(name = "name")
    private String content;

    // JPA
    public Greeting() {
    }

    public Greeting(long id, String content) {
        setId(id);
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}