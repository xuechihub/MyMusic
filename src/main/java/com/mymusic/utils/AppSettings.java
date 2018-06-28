package com.mymusic.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.music")
public class AppSettings
{
    private String basePath;

    public void setBasepath(String basePath)
    {
        this.basePath = basePath;
    }

    public String getMusicSaveBasePath()
    {
        return basePath;
    }
}
