package com.kovadom.domain.activity;

import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@Entity
@Table(name = "activity")
@EntityListeners(AuditingEntityListener.class)
public class Activity extends AbstractAuditablePersistable<Long> {

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "label")
    private String label;

    // JPA
    public Activity() {
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public String getLabel() {
        return label;
    }

}