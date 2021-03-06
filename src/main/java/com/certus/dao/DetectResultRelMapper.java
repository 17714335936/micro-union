package com.certus.dao;

import java.util.List;

import com.certus.dao.DetectResultRel;

public interface DetectResultRelMapper extends BaseDao{
    int deleteByPrimaryKey(Integer id);

    int insert(DetectResultRel record);

    int insertSelective(DetectResultRel record);

    DetectResultRel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DetectResultRel record);

    int updateByPrimaryKey(DetectResultRel record);
    
    List<DetectResultRel> getDetectResultByDetectId(int detectId );
}