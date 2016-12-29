package com.kovadom.rest;

import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.brand.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController()
@RequestMapping("/rest/brands")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    @RequestMapping(method = GET)
    public Iterable<Brand> getBrands(@RequestParam(value = "activityCode") String activityCode) {
        return brandRepository.findByActivitiesCode(activityCode);
    }

    @RequestMapping(method = GET, params = "brandCode")
    public Brand getBrandByCode(@RequestParam(value = "brandCode") String brandCode) {
        return brandRepository.findByCode(brandCode);
    }

}