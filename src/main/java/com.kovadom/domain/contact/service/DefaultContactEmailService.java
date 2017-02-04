package com.kovadom.domain.contact.service;

import com.kovadom.domain.contact.Contact;
import com.kovadom.framework.resource.ResourceLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import static com.kovadom.framework.resource.ResourceLoader.Resources.KOVADOM_LOGO_TXT;
import static java.lang.String.format;

@Service
public class DefaultContactEmailService implements ContactEmailService {

    private static final String COMPANY_REGISTRATION_TEMPLATE = "registration/company_registration";

    private static final String KOVADOM_REGISTRATION_TEMPLATE = "registration/kovadom_notification";

    private static final String MAIL_COMPANY_REGISTRATION_SUBJECT = "mail.registration.company.subject";

    private static final String KOVADOM_COMPANY_REGISTRATION_SUBJECT = "New company registration request";

    private static final String SALE_REGISTRATION_TEMPLATE = "registration/sale_registration";

    private static final String MAIL_SALE_REGISTRATION_SUBJECT = "mail.registration.sale.subject";

    private static final String KOVADOM_HOST_REGISTRATION_SUBJECT = "New sale registration request";

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    private final ResourceLoader resourceLoader;

    private final MessageSource messageSource;

    @Value("${kovadom.mail.from}")
    private String from;

    @Value("${kovadom.mail.address}")
    private String kovadomAddress;

    @Autowired
    public DefaultContactEmailService(final JavaMailSender mailSender, final TemplateEngine templateEngine,
                                      final ResourceLoader resourceLoader, final MessageSource messageSource) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.resourceLoader = resourceLoader;
        this.messageSource = messageSource;
    }

    @Override
    public void notifyRequesterForCompanyregistration(final Contact contact) {
        log.debug(format("Notifying contact of a company registration via email to '%s'...", contact.getEmail()));
        sendEmailToRequester(contact, MAIL_COMPANY_REGISTRATION_SUBJECT, COMPANY_REGISTRATION_TEMPLATE);
        log.debug(format("Notify contact of a company registration via email to '%s': done", contact.getEmail()));
    }

    @Override
    public void notifyKovadomForCompanyregistration(final Contact contact) {
        log.debug(format("Notifying Kovadom of a company registration via email to '%s'...", kovadomAddress));
        sendEmailToKovadom(contact, KOVADOM_COMPANY_REGISTRATION_SUBJECT, KOVADOM_REGISTRATION_TEMPLATE);
        log.debug(format("Notify Kovadom of a company registration via email to '%s': done", kovadomAddress));
    }

    @Override
    public void notifyRequesterForSaleRegistration(final Contact contact) {
        log.debug(format("Notifying contact of a host registration via email to '%s'...", contact.getEmail()));
        sendEmailToRequester(contact, MAIL_SALE_REGISTRATION_SUBJECT, SALE_REGISTRATION_TEMPLATE);
        log.debug(format("Notify contact of a host registration via email to '%s': done", contact.getEmail()));
    }

    @Override
    public void notifyKovadomForSaleRegistration(final Contact contact) {
        log.debug(format("Notifying Kovadom of a host registration via email to '%s'...", kovadomAddress));
        sendEmailToKovadom(contact, KOVADOM_HOST_REGISTRATION_SUBJECT, KOVADOM_REGISTRATION_TEMPLATE);
        log.debug(format("Notify Kovadom of a company host via email to '%s': done", kovadomAddress));
    }

    private void sendEmailToRequester(final Contact contact, final String mailCompanyRegistrationSubject, final String companyRegistrationTemplate) {
        MimeMessagePreparator preparator = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(contact.getEmail());
            message.setFrom(from);
            message.setSubject(messageSource.getMessage(mailCompanyRegistrationSubject, null, LocaleContextHolder.getLocale()));
            Context context = new Context();
            context.setVariable("contact", contact);
            String logoId = "logo-kovadom-txt";
            context.setVariable("logoId", logoId);
            message.setText(templateEngine.process(companyRegistrationTemplate, context), true);

            message.addInline(logoId, resourceLoader.load(KOVADOM_LOGO_TXT), KOVADOM_LOGO_TXT.getMimeType());
        };

        this.mailSender.send(preparator);
    }

    private void sendEmailToKovadom(final Contact contact, final String kovadomCompanyRegistrationSubject, final String kovadomRegistrationTemplate) {
        MimeMessagePreparator preparator = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(kovadomAddress);
            message.setFrom(from);
            message.setSubject(kovadomCompanyRegistrationSubject);

            Context context = new Context();
            context.setVariable("contact", contact);
            context.setVariable("contactType", kovadomCompanyRegistrationSubject);
            message.setText(templateEngine.process(kovadomRegistrationTemplate, context), true);
        };

        this.mailSender.send(preparator);
    }

}
