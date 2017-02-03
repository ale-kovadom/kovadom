package com.kovadom.framework.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.io.InputStream;

import static org.apache.commons.io.IOUtils.toByteArray;

@Component
public class ResourceLoader {

    public enum Resources {

        KOVADOM_LOGO_TXT("img/kovadom/logo-kovadom-txt.png", "image/png");

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

    private final ServletContext servletContext;

    @Autowired
    public ResourceLoader(final ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public ByteArrayResource load(Resources resource) throws IOException {
        InputStream logoInputStream = servletContext.getResourceAsStream(resource.getPath());
        return new ByteArrayResource(toByteArray(logoInputStream));
    }
}
