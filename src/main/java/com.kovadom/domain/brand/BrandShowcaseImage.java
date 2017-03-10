package com.kovadom.domain.brand;

import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BrandShowcaseImage")
@EntityListeners(AuditingEntityListener.class)
public class BrandShowcaseImage extends AbstractAuditablePersistable<Long> {

    @Column(name="name")
    private int name;

    @Column(name="description")
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name="brand_id", nullable=false, updatable=false)
    private Brand brand;

    public BrandShowcaseImage() {}

    public int getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
