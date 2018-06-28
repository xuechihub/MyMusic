package com.mymusic.web;

import com.mymusic.Service.MusicService;
import com.mymusic.domain.Music;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@RestController
@RequestMapping("/rest/music")
public class MusicController
{

    @Autowired
    private MusicService musicService;

    public void setMusicService(MusicService musicService)
    {
        this.musicService = musicService;
    }

    @RequestMapping("/player/{id}")
    public void getMusic(@PathVariable String id, HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        musicService.getMusic(id, request, response);
    }

    @RequestMapping("/list")
    public List getMusicList()
    {
        return musicService.getAllMusicList();
    }

}
