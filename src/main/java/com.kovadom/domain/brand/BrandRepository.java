package com.kovadom.domain.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    List<Brand> findByActivitiesCode(String activityCode);

    Brand findByCode(String code);

    @Query("select brand from Brand brand INNER JOIN FETCH brand.brandShowcaseImages where brand.code = ?1")
    Brand findWithFetchStrategy(String brandCode);
}
