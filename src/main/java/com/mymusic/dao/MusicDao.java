package com.mymusic.dao;

import com.mymusic.domain.Music;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MusicDao
{

    @Insert("INSERT INTO music(music_id, music_name, music_author, music_content_path, music_length, music_create_time) " +
            "VALUES(#{id}, #{name}, #{author}, #{path}, #{length}, #{createTime})")
    public void insertMusic(Music music);


    @Select("SELECT * FROM music WHERE music_id = #{uuid}")
    @Results({
            @Result(property="id",column="music_id"),
            @Result(property="name",column="music_name"),
            @Result(property="author",column="music_author"),
            @Result(property="path",column="music_content_path"),
            @Result(property="length",column="music_length"),
            @Result(property="createTime",column="music_create_time"),
    })
    public Music getMusicById(String uuid);

    @Select("SELECT * FROM music WHERE music_name = #{name}")
    @Results({
            @Result(property="id",column="music_id"),
            @Result(property="name",column="music_name"),
            @Result(property="author",column="music_author"),
            @Result(property="path",column="music_content_path"),
            @Result(property="length",column="music_length"),
            @Result(property="createTime",column="music_create_time"),
    })
    public Music getMusicByName(String name);

    @Select("SELECT music_id, music_name, music_author FROM music")
    @Results({
            @Result(property="id",column="music_id"),
            @Result(property="name",column="music_name"),
            @Result(property="author",column="music_author"),
            @Result(property="path",column="music_content_path"),
            @Result(property="length",column="music_length"),
            @Result(property="createTime",column="music_create_time"),
    })
    public List<Music> getMusicList();
}
