package com.kovadom.domain.activity;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.domain.brand.Brand;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "activity")
@EntityListeners(AuditingEntityListener.class)
public class Activity extends AbstractAuditablePersistable<Long> {

    @JsonView(Views.Public.class)
    @Column(name = "code")
    private String code;

    @JsonView(Views.Public.class)
    @Column(name = "description")
    private String description;

    @JsonView(Views.Public.class)
    @Column(name = "label")
    private String label;

    @JsonView(Views.Dependency.class)
    @ManyToMany(mappedBy="activities")
    private List<Brand> brands;

    // JPA
    public Activity() {
    }

    public String getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    public List<Brand> getBrands() {
        return brands;
    }

    public String getDescription() {
        return description;
    }
}