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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "brand")
@EntityListeners(AuditingEntityListener.class)
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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "brand_activity",
            joinColumns = @JoinColumn(name = "brand_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "activity_id", referencedColumnName = "id"))
    private List<Activity> activities;

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

    public List<Activity> getActivities() {
        return activities;
    }
}