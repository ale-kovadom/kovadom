package com.kovadom.framework.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    private final static Logger log = LoggerFactory.getLogger(ApplicationContextProvider.class);

    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext ac) throws BeansException {
        context = ac;
    }

    public static void processInjectionBasedOnCurrentContext(Object target) {
        AutowiredAnnotationBeanPostProcessor bpp = new AutowiredAnnotationBeanPostProcessor();

        /*
         * May be null if initialization of ApplicationContext has not been done.
         * Example: JPA entity initialization at startup.
         */
        if(getApplicationContext() != null) {
            bpp.setBeanFactory(getApplicationContext().getAutowireCapableBeanFactory());
            bpp.processInjection(target);
        } else {
            log.info("Unable to preform dependency injection on target '" + target + "' because the context is not loaded.");
        }
    }

    private static ApplicationContext getApplicationContext() {
        return context;
    }
}
