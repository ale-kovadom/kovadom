package com.kovadom.domain.activity;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.framework.resource.ResourceLoader;
import com.kovadom.framework.serialization.jackson.Views;
import com.kovadom.framework.spring.ApplicationContextProvider;

import javax.inject.Inject;

import static com.kovadom.framework.spring.ApplicationContextProvider.processInjectionBasedOnCurrentContext;

public class ActivityMetadata {

    private final Activity activity;

    @Inject
    private ResourceLoader resourceLoader;

    ActivityMetadata(final Activity activity) {
        this.activity = activity;
        processInjectionBasedOnCurrentContext(this);
    }

    @JsonView(Views.Public.class)
    public String getActivityImageUrl() {
        return resourceLoader.getActivityImagePath(activity.getCode());
    }

}
