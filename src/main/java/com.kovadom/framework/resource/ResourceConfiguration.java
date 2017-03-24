package com.kovadom.framework.resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.ContentVersionStrategy;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceUrlProvider;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import javax.inject.Inject;

@Configuration
public class ResourceConfiguration extends WebMvcConfigurerAdapter {

    private static final int ONE_YEAR = 60 * 60 * 24 * 365;
    
    private static final int ONE_DAY = 60 * 60 * 24;

    @Value("${kovadom.resources.dynamic.data}")
    private String dynamicDataDirectory;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        VersionResourceResolver versionResourceResolver = new VersionResourceResolver()
                .addVersionStrategy(new ContentVersionStrategy(), "/**");

        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/")
                .setCachePeriod(ONE_YEAR)
                .resourceChain(true)
                .addResolver(versionResourceResolver);

        registry.addResourceHandler("/dynamic/**")
                .addResourceLocations("file:" + dynamicDataDirectory)
                .setCachePeriod(ONE_DAY)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }

    @ControllerAdvice
    public static class ResourceUrlAdvice {

        @Inject
        ResourceUrlProvider resourceUrlProvider;

        @ModelAttribute("urls")
        public ResourceUrlProvider urls() {
            return this.resourceUrlProvider;
        }

    }


}
