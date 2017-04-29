package com.kovadom.rest;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.domain.activity.Activity;
import com.kovadom.domain.activity.ActivityRepository;
import com.kovadom.framework.serialization.jackson.Views;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

import static java.util.Objects.requireNonNull;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController()
@RequestMapping("/rest/activities")
public class ActivityController {

    private final ActivityRepository activityRepository;

    @Inject
    public ActivityController(final ActivityRepository activityRepository) {
        requireNonNull(activityRepository);
        this.activityRepository = activityRepository;
    }

    @RequestMapping(method = GET)
    @JsonView(Views.Public.class)
    public Iterable<Activity> getActivities() {
        return activityRepository.findAll();
    }

    @RequestMapping(method = GET, params = "activityCode")
    @JsonView(Views.Dependency.class)
    public Activity getActivityByCode(@RequestParam(value = "activityCode") String code) {
        return activityRepository.findByCode(code);
    }

}