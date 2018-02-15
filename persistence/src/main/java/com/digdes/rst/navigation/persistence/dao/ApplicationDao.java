package com.digdes.rst.navigation.persistence.dao;

import com.digdes.rst.navigation.persistence.model.Application;

public interface ApplicationDao extends AbstractDao<Application, Long> {

    Application findByAppId(String appId);
}
