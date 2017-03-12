package com.kovadom.domain.brand;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@Entity
@Table(name = "BrandShowcaseImage")
@EntityListeners(AuditingEntityListener.class)
public class BrandShowcaseImage extends AbstractAuditablePersistable<Long> {

    @JsonView(Views.Public.class)
    @Column(name = "name")
    private int name;

    @JsonView(Views.Public.class)
    @Column(name = "description")
    private String description;

    public BrandShowcaseImage() {
    }

    public int getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
