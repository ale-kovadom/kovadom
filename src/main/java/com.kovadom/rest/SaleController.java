package com.kovadom.rest;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.brand.BrandRepository;
import com.kovadom.domain.host.Host;
import com.kovadom.domain.sale.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;

import static java.time.format.DateTimeFormatter.ISO_DATE_TIME;
import static java.util.Optional.ofNullable;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController()
@RequestMapping("/rest/sale")
public class SaleController {

    @Autowired
    private SaleDeserializer saleDeserializer;

    @RequestMapping(method = POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createSale(@RequestBody final String json) throws IOException {
        Sale sale = deserialize(json);
    }

    private Sale deserialize(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addDeserializer(Sale.class, saleDeserializer);
        mapper.registerModule(module);

        return mapper.readValue(json, Sale.class);
    }

    @Component
    public static class SaleDeserializer extends StdDeserializer<Sale> {

        @Autowired
        private BrandRepository brandRepository;

        public SaleDeserializer() {
            this(null);
        }

        public SaleDeserializer(final Class<?> vc) {
            super(vc);
        }

        @Override
        public Sale deserialize(final JsonParser jp, final DeserializationContext ctx) throws IOException {
            JsonNode node = jp.getCodec().readTree(jp);

            String brandCode = node.get("brandCode").asText();
            final Brand brand = brandRepository.findByCode(brandCode);

            LocalDateTime date = LocalDateTime.parse(node.get("date").asText(), ISO_DATE_TIME);
            String city = node.get("city").asText();
            String extraInformation = ofNullable(node.get("extraInformation")).map(JsonNode::asText).orElse("");
            int stakeholderCount = node.get("stakeholderCount").asInt();

            JsonNode hostNode = node.get("host");

            ObjectMapper mapper = new ObjectMapper();
            Host host = mapper.readValue(hostNode.toString(), Host.class);

            return new Sale(date, city, stakeholderCount, extraInformation, brand, host);
        }
    }

}