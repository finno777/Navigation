package com.digdes.rst.navigation.persistence;


import com.digdes.rst.navigation.persistence.dao.ApplicationDao;
import com.digdes.rst.navigation.persistence.dao.GroupPageDao;
import com.digdes.rst.navigation.persistence.dao.PageDao;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.services.ApplicationService;
import com.digdes.rst.navigation.persistence.services.GroupPageService;
import com.digdes.rst.navigation.persistence.services.PageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:app.xml"})
public class AppDaoTest {

    @Autowired
    PageDao pageDao;
    @Autowired
    ApplicationDao applicationDao;
    @Autowired
    GroupPageDao groupPageDao;
    @Autowired
    GroupPageService groupPageService;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    PageService pageService;
    @Test
    public void save() throws Exception {
//        Application application = new Application("qwerty", "qcv1", "sge1");
//        applicationDao.saveOrUpdate(application);
//        System.out.println(application);
    }
}
