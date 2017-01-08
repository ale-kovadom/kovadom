package com.kovadom.domain.sale;

import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.host.Host;

import java.time.LocalDateTime;

public class Sale {

    private Brand brand;

    private Host host;

    private String city;

    private Integer stakeholderCount;

    private String extraInformation;

    private LocalDateTime date;

    // JPA
    public Sale() {
    }

    public Sale(final LocalDateTime date,
                final String city,
                final int stakeholderCount,
                final String extraInformation,
                final Brand brand,
                final Host host) {
        this.date = date;
        this.city = city;
        this.stakeholderCount = stakeholderCount;
        this.extraInformation = extraInformation;
        this.brand = brand;
        this.host = host;
    }
}
