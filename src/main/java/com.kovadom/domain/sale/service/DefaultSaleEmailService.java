package com.kovadom.domain.sale.service;

import com.kovadom.domain.host.Host;
import com.kovadom.domain.sale.Sale;
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

import static com.kovadom.domain.sale.Sale.Status.AVAILABILITY;
import static com.kovadom.domain.sale.Sale.Status.BOOK_REQUEST;
import static com.kovadom.framework.resource.ResourceLoader.Resources.KOVADOM_LOGO_TXT;
import static java.lang.String.format;

@Service
public class DefaultSaleEmailService implements SaleEmailService {

    private static final String VERIFY_AVAILABILITY_TEMPLATE = "booking/verify_availability";

    private static final String BOOK_REQUEST_TEMPLATE = "booking/book_request";

    private static final String KOVADOM_NOTIFICATION_TEMPLATE = "booking/kovadom_notification";

    private static final String MAIL_VERIFY_AVAILABILITY_SUBJECT = "mail.verify-availability.subject";

    private static final String MAIL_BOOK_REQUEST_SUBJECT = "mail.book-request.subject";

    private static final String KOVADOM_SUBJ_AVAILABILITY = "New availability request";

    private static final String KOVADOM_SUBJ_BOOK = "New booking request";

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
    public DefaultSaleEmailService(final JavaMailSender mailSender, final TemplateEngine templateEngine,
                                   final ResourceLoader resourceLoader, final MessageSource messageSource) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.resourceLoader = resourceLoader;
        this.messageSource = messageSource;
    }

    @Override
    public void notifyHost(final Sale sale) {
        MimeMessagePreparator preparator = mimeMessage -> {
            Sale.Status saleStatus = sale.getStatus();
            if (saleStatus != AVAILABILITY && saleStatus != BOOK_REQUEST) {
                throw new IllegalStateException(format("Can not notify host with sale status '%s'", saleStatus.name()));
            }

            Host host = sale.getHost();

            log.debug(format("Notifying user of a book/availability request via email to '%s'...", host.getEmail()));

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(host.getEmail());
            message.setFrom(from);
            message.setSubject(messageSource.getMessage(saleStatus == AVAILABILITY ? MAIL_VERIFY_AVAILABILITY_SUBJECT : MAIL_BOOK_REQUEST_SUBJECT, null, LocaleContextHolder.getLocale()));
            Context context = new Context();
            context.setVariable("sale", sale);
            String logoId = "logo-kovadom-txt";
            context.setVariable("logoId", logoId);
            message.setText(templateEngine.process(saleStatus == AVAILABILITY ? VERIFY_AVAILABILITY_TEMPLATE : BOOK_REQUEST_TEMPLATE, context), true);

            message.addInline(logoId, resourceLoader.load(KOVADOM_LOGO_TXT), KOVADOM_LOGO_TXT.getMimeType());

            log.debug(format("Notify user of a book/availability via email to '%s': done", host.getEmail()));
        };

        this.mailSender.send(preparator);
    }

    @Override
    public void notifyKovadom(final Sale sale) {
        MimeMessagePreparator preparator = mimeMessage -> {
            Sale.Status saleStatus = sale.getStatus();
            if (saleStatus != AVAILABILITY && saleStatus != BOOK_REQUEST) {
                throw new IllegalStateException(format("Can not notify Kovadom with sale status '%s'", saleStatus.name()));
            }

            log.debug(format("Notifying Kovadom of a book/availability via email to '%s'...", kovadomAddress));

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(kovadomAddress);
            message.setFrom(from);
            String status = saleStatus == AVAILABILITY ? KOVADOM_SUBJ_AVAILABILITY : KOVADOM_SUBJ_BOOK;
            message.setSubject(status + " (" + sale.getBrand().getName() + ")");

            Context context = new Context();
            context.setVariable("sale", sale);
            context.setVariable("saleStatus", status);
            message.setText(templateEngine.process(KOVADOM_NOTIFICATION_TEMPLATE, context), true);

            log.debug(format("Notify Kovadom of a book/availability via email to '%s': done", kovadomAddress));
        };

        this.mailSender.send(preparator);
    }

}
