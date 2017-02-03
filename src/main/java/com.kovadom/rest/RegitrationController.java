package com.kovadom.rest;

import com.kovadom.domain.contact.Contact;
import com.kovadom.domain.contact.service.ContactEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController()
@RequestMapping("/rest/registration/")
public class RegitrationController {

    private final ContactEmailService contactEmailService;

    @Autowired
    public RegitrationController(final ContactEmailService contactEmailService) {
        this.contactEmailService = contactEmailService;
    }

    @RequestMapping(path = "company", method = POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> registerCompany(@RequestBody final Contact contact) {

        contactEmailService.notifyRequesterForCompanyregistration(contact);
        contactEmailService.notifyKovadomForCompanyregistration(contact);

        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}
