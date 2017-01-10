package com.kovadom.rest;

import com.kovadom.domain.sale.Sale;
import com.kovadom.domain.sale.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static java.util.Objects.requireNonNull;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController()
@RequestMapping("/rest/sale")
public class SaleController {

    private final SaleRepository saleRepository;

    @Autowired
    public SaleController(final SaleRepository saleRepository) {
        requireNonNull(saleRepository);
        this.saleRepository = saleRepository;
    }

    @RequestMapping(method = POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createSale(@RequestBody final Sale sale) throws IOException {
        saleRepository.save(sale);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}