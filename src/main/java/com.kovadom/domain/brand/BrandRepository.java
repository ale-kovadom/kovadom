package com.kovadom.domain.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    List<Brand> findByActivitiesCode(String activityCode);

    Brand findByCode(String code);

    @Query("select image from BrandShowcaseImage image where image.brand.code = ?1")
    List<BrandShowcaseImage> findShowcaseImages(String brandCode);
}
