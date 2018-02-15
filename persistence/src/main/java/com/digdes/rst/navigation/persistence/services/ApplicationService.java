package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dao.ApplicationDao;
import com.digdes.rst.navigation.persistence.model.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    ApplicationDao applicationDao;

    public Application initApp(String appId, String nodeId, String displayName, String url) {
        Application application = applicationDao.findByAppId(appId);
        if (application == null) {
            application = new Application();
            application.setAppId(appId);
            application.setNodeId(nodeId);
            application.setDisplayName(displayName);
            application.setUrl(url);
            application.setPageUrl(url.split("\\?")[0]);
            application.setState(Application.State.FULL);
            application.setContentType(Application.ContentType.CUSTOM);
            applicationDao.saveOrUpdate(application);
        }
        return application;
    }

    public void save(Application application) {
        if(application.getAppId()!=null){
            Application dbApp = getByAppId(application.getAppId());
            dbApp.setDisplayName(application.getDisplayName());
            dbApp.setDescription(application.getDescription());
            dbApp.setState(application.getState());
            dbApp.setContentType(application.getContentType());
            applicationDao.saveOrUpdate(dbApp);
        }
    }

    public Application getByAppId(String appId) {
        return applicationDao.findByAppId(appId);
    }

}
