package com.kovadom.domain.brand;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BrandRepository extends CrudRepository<Brand, Long> {

    List<Brand> findByActivitiesCode(String activityCode);

    Brand findByCode(String code);
}
