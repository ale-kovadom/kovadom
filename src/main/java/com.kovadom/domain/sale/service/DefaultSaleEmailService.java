package com.kovadom.domain.sale.service;

import com.kovadom.domain.host.Host;
import com.kovadom.domain.sale.Sale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.ServletContext;
import java.io.InputStream;
import java.util.Locale;

import static java.lang.String.format;
import static org.apache.commons.io.IOUtils.toByteArray;

@Service
public class DefaultSaleEmailService implements SaleEmailService {

    private static final String VERIFY_AVAILABILITY_TEMPLATE = "verify_availability";

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    private final ServletContext servletContext;

    @Value("${kovadom.mail.from}")
    private String from;

    @Autowired
    public DefaultSaleEmailService(final JavaMailSender mailSender, final TemplateEngine templateEngine, final ServletContext servletContext) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.servletContext = servletContext;
    }

    @Override
    public void notifyHost(Sale sale) {
        MimeMessagePreparator preparator = mimeMessage -> {
            Host host = sale.getHost();
            log.debug(format("Sending email to '%s'", host.getEmail()));

            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(host.getEmail());
            message.setFrom(from);
            message.setSubject(sale.getStatus().name());   //TODO
            Context context = new Context();
            context.setVariable("sale", sale);
            String logoId = "logo-kovadom.png";
            context.setVariable("logoId", logoId);
            message.setText(templateEngine.process(VERIFY_AVAILABILITY_TEMPLATE, context), true);

            InputStream logoInputStream = servletContext.getResourceAsStream("img/kovadom/logo-kovadom.png");
            message.addInline(logoId, new ByteArrayResource(toByteArray(logoInputStream)), "image/png");
        };

        this.mailSender.send(preparator);

    }

}
