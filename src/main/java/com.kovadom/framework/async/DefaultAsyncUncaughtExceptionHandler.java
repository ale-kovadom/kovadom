package com.kovadom.framework.async;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

public class DefaultAsyncUncaughtExceptionHandler implements AsyncUncaughtExceptionHandler {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public void handleUncaughtException(final Throwable throwable, final Method method, final Object... objects) {
        log.error("Error processing async method "+ method.getName(), throwable);
    }
}
