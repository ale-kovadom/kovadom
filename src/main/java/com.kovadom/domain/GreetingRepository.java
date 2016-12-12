package com.kovadom.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface GreetingRepository extends Repository<Greeting, Long> {

    Optional<Greeting> findOne(Long id);

}
