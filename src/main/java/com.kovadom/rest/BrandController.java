package com.kovadom.rest;

import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.brand.BrandRepository;
import com.kovadom.domain.brand.BrandShowcaseImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public Iterable<Brand> getBrands(@RequestParam(value = "activityCode") String activityCode) {
        return brandRepository.findByActivitiesCode(activityCode);
    }

    @RequestMapping(method = GET, params = "brandCode")
    public Brand getBrandByCode(@RequestParam(value = "brandCode") String brandCode) {
        return brandRepository.findByCode(brandCode);
    }

    @RequestMapping(path = "/images", method = GET, params = "brandCode")
    public List<BrandShowcaseImage> getBrandShowcaseImages(@RequestParam(value = "brandCode") String brandCode) {
        return brandRepository.findShowcaseImages(brandCode);
    }

}