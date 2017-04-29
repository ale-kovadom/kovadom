package com.kovadom.domain.sale;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.kovadom.domain.brand.Brand;
import com.kovadom.domain.brand.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SaleBrandDeserializer extends JsonDeserializer<Brand> {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Brand deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String brandCode = jsonParser.getText();
        return brandRepository.findByCode(brandCode);
    }
}

