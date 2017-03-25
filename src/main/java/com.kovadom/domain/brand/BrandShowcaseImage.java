package com.kovadom.domain.brand;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.framework.resource.ResourceLoader;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.inject.Inject;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import static com.kovadom.framework.spring.ApplicationContextProvider.processInjectionBasedOnCurrentContext;

@Entity
@Table(name = "BrandShowcaseImage")
@EntityListeners(AuditingEntityListener.class)
public class BrandShowcaseImage extends AbstractAuditablePersistable<Long> {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @Inject
    @Transient
    private ResourceLoader resourceLoader;

    public BrandShowcaseImage() {
        processInjectionBasedOnCurrentContext(this);
    }

    public String getName() {
        return name;
    }

    @JsonView(Views.Public.class)
    public String getImageUrl() {
        return resourceLoader.getBrandShowcasePath(brand.getCode(), name);
    }

    public String getDescription() {
        return description;
    }
}
