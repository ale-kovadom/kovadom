package com.kovadom.framework.resource;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import java.io.IOException;
import java.io.InputStream;

import static org.apache.commons.io.IOUtils.toByteArray;

@Component
public class ResourceLoader {

    static String DYNAMIC_DIRECTORY_URL_PREFIX = "dynamic";

    static String RESOURCE_DIRECTORY_URL_PREFIX = "resources";

    public enum Resources {

        KOVADOM_LOGO_TXT(RESOURCE_DIRECTORY_URL_PREFIX + "/img/kovadom/logo-kovadom-txt.png", "image/png");

        private final String path;

        private final String mimeType;

        Resources(final String path, final String mimeType) {
            this.path = path;
            this.mimeType = mimeType;
        }

        private String getPath() {
            return path;
        }

        public String getMimeType() {
            return mimeType;
        }

    }

    @Inject
    private ResourceUrlProvider resourceUrlProvider;

    private final ServletContext servletContext;

    @Inject
    public ResourceLoader(final ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public final ByteArrayResource load(Resources resource) throws IOException {
        InputStream logoInputStream = servletContext.getResourceAsStream(resource.getPath());
        return new ByteArrayResource(toByteArray(logoInputStream));
    }

    public final String getActivityImagePath(String code) {
        return resourceUrlProvider.getForLookupPath(String.format("/%s/activities/%s.png", DYNAMIC_DIRECTORY_URL_PREFIX, code));
    }

    public String getBrandImagePath(final String code) {
        return resourceUrlProvider.getForLookupPath(String.format("/%s/brands/%s/%s.png", DYNAMIC_DIRECTORY_URL_PREFIX, code, code));
    }

    public String getBrandLogoPath(final String code) {
        return resourceUrlProvider.getForLookupPath(String.format("/%s/brands/%s/LOGO-%s.png", DYNAMIC_DIRECTORY_URL_PREFIX, code, code));
    }

    public String getBrandShowcasePath(final String code, final String imageName) {
        return resourceUrlProvider.getForLookupPath(String.format("/%s/brands/%s/slider/%s.png", DYNAMIC_DIRECTORY_URL_PREFIX, code, imageName));
    }

}
