package com.mymusic.utils;

import org.springframework.stereotype.Component;

import java.util.UUID;

public class Utils
{
    public static String getUUID(){
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        return str.replaceAll("-","");
    }
}
