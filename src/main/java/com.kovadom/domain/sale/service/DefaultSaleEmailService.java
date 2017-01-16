package com.kovadom.domain.sale.service;

import com.kovadom.domain.sale.Sale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

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
//        MimeMessagePreparator preparator = mimeMessage -> {
//            Host host = sale.getHost();
//            log.debug(format("Sending email to '%s'", host.getEmail()));
//
//            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            message.setTo(host.getEmail());
//            message.setFrom(from);
//            message.setSubject(sale.getStatus().name());   //TODO
//            Context context = new Context();
//            context.setVariable("sale", sale);
//            String logoId = "logo-kovadom.png";
//            context.setVariable("logoId", logoId);
//            message.setText(templateEngine.process(VERIFY_AVAILABILITY_TEMPLATE, context), true);
//
//            InputStream logoInputStream = servletContext.getResourceAsStream("img/kovadom/logo-kovadom.png");
//            message.addInline(logoId, new ByteArrayResource(toByteArray(logoInputStream)), "image/png");
//        };
//
//        this.mailSender.send(preparator);

        try {
//            Host host = sale.getHost();
//            final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
//            mimeMessage.setRecipients(Message.RecipientType.TO,
//                    InternetAddress.parse(host.getEmail()));
//            mimeMessage.setFrom(from);
//            mimeMessage.setSubject(sale.getStatus().name());
//
//
//            MimeMultipart multipart = new MimeMultipart("related");
//
//            // first part (the html)
//            BodyPart messageBodyPart = new MimeBodyPart();
//            String htmlText = "<H1>Hello</H1><img src=\"cid:image\">";
//            messageBodyPart.setContent(htmlText, "text/html");
//            // add it
//            multipart.addBodyPart(messageBodyPart);
//
//            // second part (the image)
//            messageBodyPart = new MimeBodyPart();
//            InputStream logoInputStream = servletContext.getResourceAsStream("img/kovadom/logo-kovadom.png");
//
//            messageBodyPart.setDataHandler(new DataHandler(new ByteArrayDataSource(logoInputStream, "image/png")));
//            messageBodyPart.setHeader("Content-ID", "<image>");
//
//            // add image to the multipart
//            multipart.addBodyPart(messageBodyPart);
//
//            // put everything together
//            mimeMessage.setContent(multipart);
//            //this.mailSender.send(mimeMessage);
//            Transport.send(mimeMessage);
            sendEmailWithAttachments("ns0.ovh.net",
                    "587",
                    "clement@kovadom.com",
                    "qwerty123zaq",
                    "arnaud.lescaroux@gmail.com",
                    "test",
                    "ca marche !",
                    new String[] {"/Users/arnaudlescaroux/Desktop/kovadom/logo/logo-kovadom.png"}
                    );

        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    public static void sendEmailWithAttachments(String host, String port,
                                                final String userName, final String password, String toAddress,
                                                String subject, String message, String[] attachFiles)
            throws AddressException, MessagingException {
        // sets SMTP server properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
       // properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.user", userName);
        properties.put("mail.password", password);

        // creates a new session with an authenticator
        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(userName, password);
            }
        };
        Session session = Session.getInstance(properties, auth);

        // creates a new e-mail message
        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress(userName));
        InternetAddress[] toAddresses = { new InternetAddress(toAddress) };
        msg.setRecipients(Message.RecipientType.TO, toAddresses);
        msg.setSubject(subject);
        msg.setSentDate(new Date());

        // creates message part
        MimeBodyPart messageBodyPart = new MimeBodyPart();
       // messageBodyPart.setContent(message, "text/html");
        messageBodyPart.setText(message);

        // creates multi-part
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        // adds attachments
        if (attachFiles != null && attachFiles.length > 0) {
            for (String filePath : attachFiles) {
                MimeBodyPart attachPart = new MimeBodyPart();

                try {
                    File file = new File(filePath);
                    if(!file.exists()) {
                        throw new FileNotFoundException();
                    }
                    attachPart.attachFile(file);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                multipart.addBodyPart(attachPart);
            }
        }

        // sets the multi-part as e-mail's content
        msg.setContent(multipart);

        // sends the e-mail
        Transport.send(msg);

    }

}
