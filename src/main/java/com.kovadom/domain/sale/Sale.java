package com.kovadom.domain.sale;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.host.Host;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "sale")
@EntityListeners(AuditingEntityListener.class)
public class Sale extends AbstractAuditablePersistable<Long> {

    @ManyToOne
    @JoinColumn(name="brand_id", nullable=false)
    @JsonDeserialize(using = SaleBrandDeserializer.class)
    private Brand brand;

    @ManyToOne(cascade= CascadeType.PERSIST)
    @JoinColumn(name="host_id", nullable=false)
    private Host host;

    @Column(name = "city")
    private String city;

    @Column(name = "stakeholder_count")
    private Integer stakeholderCount;

    @Column(name = "extra_information")
    private String extraInformation;

    @Column(name = "date")
    private LocalDateTime date;

    // JPA
    public Sale() {
    }

    public Brand getBrand() {
        return brand;
    }

    public Host getHost() {
        return host;
    }

    public String getCity() {
        return city;
    }

    public Integer getStakeholderCount() {
        return stakeholderCount;
    }

    public String getExtraInformation() {
        return extraInformation;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
