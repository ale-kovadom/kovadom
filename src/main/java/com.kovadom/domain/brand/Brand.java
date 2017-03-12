package com.kovadom.domain.brand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.domain.activity.Activity;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "brand")
@EntityListeners(AuditingEntityListener.class)
public class Brand extends AbstractAuditablePersistable<Long> {

    @Column(name = "code")
    @JsonView(Views.Public.class)
    private String code;

    @Column(name = "name")
    @JsonView(Views.Public.class)
    private String name;

    @Column(name = "catch_words")
    @JsonView(Views.Public.class)
    private String catchWords;

    @Column(name = "description")
    @JsonView(Views.Public.class)
    private String description;

    @Column(name = "sale_process")
    @JsonView(Views.Public.class)
    private String saleProcess;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "brand_activity",
            joinColumns = @JoinColumn(name = "brand_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "activity_id", referencedColumnName = "id"))
    private List<Activity> activities;

    @JsonView(Views.Metadata.class)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "brand_id")
    private List<BrandShowcaseImage> brandShowcaseImages;

    // JPA
    public Brand() {
    }

    public String getCode() {
        return code;
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

    public String getDescription() {
        return description;
    }

    public String getSaleProcess() {
        return saleProcess;
    }

    public List<BrandShowcaseImage> getBrandShowcaseImages() {
        return brandShowcaseImages;
    }

}