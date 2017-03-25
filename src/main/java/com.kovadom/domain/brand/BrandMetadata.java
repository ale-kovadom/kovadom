package com.kovadom.domain.brand;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.domain.activity.Activity;
import com.kovadom.framework.resource.ResourceLoader;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.framework.spring.ApplicationContextProvider;

import javax.inject.Inject;

public class BrandMetadata {

    private final Brand brand;

    @Inject
    private ResourceLoader resourceLoader;

    BrandMetadata(final Brand brand) {
        this.brand = brand;
        ApplicationContextProvider.processInjectionBasedOnCurrentContext(this);
    }

    @JsonView(Views.Public.class)
    public String getBrandLogoUrl() {
        return resourceLoader.getBrandLogoPath(brand.getCode());
    }

    @JsonView(Views.Public.class)
    public String getBrandImageUrl() {
        return resourceLoader.getBrandImagePath(brand.getCode());
    }

}
