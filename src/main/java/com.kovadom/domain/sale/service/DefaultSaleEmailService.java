package com.kovadom.domain.sale.service;

import com.kovadom.domain.host.Host;
import com.kovadom.domain.sale.Sale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;

@Service
public class DefaultSaleEmailService implements SaleEmailService {

    private final JavaMailSender mailSender;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public DefaultSaleEmailService(final JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void notifyHost(Sale sale) {
        MimeMessagePreparator preparator = mimeMessage -> {
            log.debug("Sending email to " + sale.getHost().getEmail());

            Host host = sale.getHost();
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(host.getEmail()));
            mimeMessage.setFrom(new InternetAddress("mail@mycompany.com"));
            mimeMessage.setText(
                    "Dear " + host.getFirstName() + " "
                            + host.getLastName()
                            + ", thank you for placing order. Your order number is "
                            + sale.getId());
        };

        this.mailSender.send(preparator);
    }

}
