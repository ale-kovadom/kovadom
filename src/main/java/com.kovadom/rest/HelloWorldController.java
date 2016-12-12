package com.kovadom.rest;

import com.kovadom.domain.Greeting;
import com.kovadom.domain.GreetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController()
@RequestMapping("/rest")
public class HelloWorldController {

    @Autowired
    private GreetingRepository greetingRepository;

    private static final String template = "Hello, %s!";

    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        Greeting defaultGreeting = new Greeting(counter.incrementAndGet(), String.format(template, name));
        Optional<Greeting> greeting = greetingRepository.findOne(1L);
        return greeting.orElse(defaultGreeting);
    }


}