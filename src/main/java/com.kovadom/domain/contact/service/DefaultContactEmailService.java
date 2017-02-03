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
        MimeMessagePreparator preparator = mimeMessage -> {
            log.debug(format("Notifying contact of a company registration via email to '%s'...", contact.getEmail()));

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(contact.getEmail());
            message.setFrom(from);
            message.setSubject(messageSource.getMessage(MAIL_COMPANY_REGISTRATION_SUBJECT, null, LocaleContextHolder.getLocale()));
            Context context = new Context();
            context.setVariable("contact", contact);
            String logoId = "logo-kovadom-txt";
            context.setVariable("logoId", logoId);
            message.setText(templateEngine.process(COMPANY_REGISTRATION_TEMPLATE, context), true);

            message.addInline(logoId, resourceLoader.load(KOVADOM_LOGO_TXT), KOVADOM_LOGO_TXT.getMimeType());

            log.debug(format("Notify contact of a company registration via email to '%s': done", contact.getEmail()));
        };

        this.mailSender.send(preparator);
    }

    @Override
    public void notifyKovadomForCompanyregistration(final Contact contact) {
        MimeMessagePreparator preparator = mimeMessage -> {
            log.debug(format("Notifying Kovadom of a company registration via email to '%s'...", kovadomAddress));

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(kovadomAddress);
            message.setFrom(from);
            message.setSubject(KOVADOM_COMPANY_REGISTRATION_SUBJECT);

            Context context = new Context();
            context.setVariable("contact", contact);
            context.setVariable("contactType", KOVADOM_COMPANY_REGISTRATION_SUBJECT);
            message.setText(templateEngine.process(KOVADOM_REGISTRATION_TEMPLATE, context), true);

            log.debug(format("Notify Kovadom of a company registration via email to '%s': done", kovadomAddress));
        };

        this.mailSender.send(preparator);
    }

}
