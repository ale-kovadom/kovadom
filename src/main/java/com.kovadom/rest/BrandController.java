package com.kovadom.rest;

import com.fasterxml.jackson.annotation.JsonView;
import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.brand.BrandRepository;
import com.kovadom.framework.serialization.jackson.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.requireNonNull;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController()
@RequestMapping("/rest/brands")
public class BrandController {

    private final BrandRepository brandRepository;

    @Autowired
    public BrandController(final BrandRepository brandRepository) {
        requireNonNull(brandRepository);
        this.brandRepository = brandRepository;
    }

    @RequestMapping(method = GET)
    @JsonView(Views.Public.class)
    public Iterable<Brand> getBrands(@RequestParam(value = "activityCode") String activityCode) {
        return brandRepository.findByActivitiesCode(activityCode);
    }

    @RequestMapping(method = GET, params = "brandCode")
    @JsonView(Views.Protected.class)
    public Brand getBrandByCode(@RequestParam(value = "brandCode") String brandCode) {
        return brandRepository.findWithFetchStrategy(brandCode);
    }

}