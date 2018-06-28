package com.mymusic;


import com.mymusic.Service.MusicService;
import org.apache.http.entity.ContentType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.multipart.MultipartFile;
import org.testng.Assert;

import java.io.File;
import java.io.FileInputStream;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class TestMusicService
{
    @Autowired
    private MusicService musicService;


    @Test
    public void testUploadMusic() throws Exception
    {
        File file = new File("C:\\Users\\11544\\Desktop\\music\\烟花易冷.mp3");
        MultipartFile multipartFile = new MockMultipartFile(
                file.getName(),        //文件名
                file.getName(),        //originalName 相当于上传文件在客户机上的文件名
                ContentType.MULTIPART_FORM_DATA.toString(),    //文件类型
                new FileInputStream(file)
        );
        try
        {
            musicService.uploadMusic(multipartFile);
            Assert.assertTrue(true);
        }catch (Exception e)
        {
            Assert.assertTrue(false);
        }
    }
}
