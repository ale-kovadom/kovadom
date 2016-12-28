package com.kovadom.rest;

import com.kovadom.domain.activity.Activity;
import com.kovadom.domain.activity.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController()
@RequestMapping("/rest/activities")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @RequestMapping(method = GET)
    public Iterable<Activity> getActivities() {
        return activityRepository.findAll();
    }

    @RequestMapping(method = GET, params = "activityCode")
    public Activity getActivity(@RequestParam(value = "activityCode") String code) {
        return activityRepository.findByCode(code);
    }

}