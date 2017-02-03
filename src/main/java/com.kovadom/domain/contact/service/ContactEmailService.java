package com.kovadom.domain.contact.service;

import com.kovadom.domain.contact.Contact;
import org.springframework.scheduling.annotation.Async;

public interface ContactEmailService {

    @Async
    void notifyRequesterForCompanyregistration(final Contact sale);

    @Async
    void notifyKovadomForCompanyregistration(final Contact sale);

}
