package com.kovadom.domain.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kovadom.domain.activity.Activity;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "brand")
@EntityListeners(AuditingEntityListener.class)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Brand extends AbstractAuditablePersistable<Long> {

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "catch_words")
    private String catchWords;

    @JsonIgnore
    @ManyToOne(cascade= CascadeType.ALL, fetch=LAZY)
    @JoinColumn(name="activity_id")
    private Activity activity;

    // JPA
    public Brand() {
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public String getCatchWords() {
        return catchWords;
    }

    public Activity getActivity() {
        return activity;
    }
}