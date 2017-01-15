package com.kovadom.domain.sale.service;

import com.kovadom.domain.host.Host;
import com.kovadom.domain.sale.Sale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import static java.lang.String.format;

@Service
public class DefaultSaleEmailService implements SaleEmailService {

    private static final String VERIFY_AVAILABILITY_TEMPLATE = "verify_availability";

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    @Value("${kovadom.mail.from}")
    private String from;

    @Autowired
    public DefaultSaleEmailService(final JavaMailSender mailSender, final TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void notifyHost(Sale sale) {
        MimeMessagePreparator preparator = mimeMessage -> {
            Host host = sale.getHost();
            log.debug(format("Sending email to '%s'", host.getEmail()));

//            mimeMessage.setRecipient(TO, new InternetAddress(host.getEmail()));
//            mimeMessage.setFrom(new InternetAddress(from));
//            mimeMessage.setSubject(sale.getStatus().name()); //TODO i18n
//
//            mimeMessage.setText(message);

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
            message.setTo(host.getEmail());
            message.setFrom(from);
            Context context = new Context();
            context.setVariable("message", "toto l'asticot");

            message.setText(templateEngine.process(VERIFY_AVAILABILITY_TEMPLATE, context), true);
        };

        this.mailSender.send(preparator);
    }

}
