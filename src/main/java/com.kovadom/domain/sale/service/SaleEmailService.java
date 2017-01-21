package com.kovadom.domain.sale.service;

import com.kovadom.domain.sale.Sale;
import org.springframework.scheduling.annotation.Async;

public interface SaleEmailService {

    @Async
    void notifyHost(final Sale sale);

    @Async
    void notifyKovadom(final Sale sale);

}
