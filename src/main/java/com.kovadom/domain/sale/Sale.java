package com.kovadom.domain.sale;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.host.Host;
import com.kovadom.orm.AbstractAuditablePersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.ZonedDateTime;

@Entity
@Table(name = "sale")
@EntityListeners(AuditingEntityListener.class)
public class Sale extends AbstractAuditablePersistable<Long> {

    public enum Status {
        @JsonProperty("Availability")
        AVAILABILITY,
        @JsonProperty("BookRequest")
        BOOK_REQUEST
    }

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    @JsonDeserialize(using = SaleBrandDeserializer.class)
    private Brand brand;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "host_id", nullable = false)
    private Host host;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @Column(name = "stakeholder_count")
    private Integer stakeholderCount;

    @Column(name = "extra_information")
    private String extraInformation;

    @Column(name = "date")
    private ZonedDateTime date;

    // JPA
    public Sale() {
    }

    public Brand getBrand() {
        return brand;
    }

    public Host getHost() {
        return host;
    }

    public Place getPlace() {
        return place;
    }

    public Integer getStakeholderCount() {
        return stakeholderCount;
    }

    public String getExtraInformation() {
        return extraInformation;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Status getStatus() {
        return status;
    }
}
