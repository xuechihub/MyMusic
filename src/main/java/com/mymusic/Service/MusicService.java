package com.mymusic.Service;

import com.mymusic.dao.MusicDao;
import com.mymusic.domain.Music;
import com.mymusic.utils.AppSettings;
import com.mymusic.utils.Utils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class MusicService
{

    private static final Log LOGGER = LogFactory.getLog(MusicService.class);

    @Autowired
    private AppSettings settings;

    public void setSettings(AppSettings settings)
    {
        this.settings = settings;
    }

    public void setMusicDao(MusicDao musicDao)
    {
        this.musicDao = musicDao;
    }

    @Autowired
    private MusicDao musicDao;

    public boolean uploadMusic(MultipartFile multipartFile)
    {
        try
        {
            Music music = musicDao.getMusicByName(multipartFile.getName());

            if (music != null)
            {
                LOGGER.info("music exist!");
            } else
            {
                String path = settings.getMusicSaveBasePath() + multipartFile.getName();
                File file = new File(path);
                if (file.exists())
                {
                    LOGGER.info("music file exist!");
                } else
                {
                    FileCopyUtils.copy(multipartFile.getBytes(), file);
                }
                music = new Music();
                music.setId(Utils.getUUID());
                music.setName(multipartFile.getName());
                music.setPath(path);
                music.setAuthor("admin");
                music.setLength(multipartFile.getSize());
                music.setCreateTime(new Date());
                musicDao.insertMusic(music);
            }
        } catch (Exception e)
        {
            LOGGER.error(e.getMessage());
            return false;
        }
        return true;
    }

    public void getMusic(String id, HttpServletRequest request, HttpServletResponse response)
    {
        try
        {
            Music music = musicDao.getMusicById(id);
            File file = new File(music.getPath());
            if (!file.exists()) throw new RuntimeException("音频文件不存在 --> 404");
            String range = request.getHeader("Range");
            String[] rs = range.split("\\=");
            range = rs[1].split("\\-")[0];
            int start = Integer.parseInt(range);
            long length = file.length();
            if (start > 0)
            {
                response.setStatus(HttpStatus.SC_PARTIAL_CONTENT);
            }
            response.addHeader("Accept-Ranges", "bytes");
            response.addHeader("Content-Length", length + "");
            response.addHeader("Content-Range", "bytes " + start + "-" + (length - 1) + "/" + length);
            response.addHeader("Content-Type", "audio/mpeg;charset=UTF-8");

            OutputStream os = response.getOutputStream();
            FileInputStream fis = new FileInputStream(file);
            fis.skip(start);
            FileCopyUtils.copy(fis, os);
        } catch (Exception e)
        {
            LOGGER.error(e.getMessage());
        }
    }

    public List getAllMusicList()
    {
        List musicList = new ArrayList();
        try
        {
            musicList = musicDao.getMusicList();
        } catch (Exception e)
        {
            LOGGER.error(e.getMessage());
        }
        return musicList;
    }
}
