package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:app.xml"})
public class GroupPageServiceTest {

    @Autowired
    GroupPageService groupPageService;

    @Autowired
    PageService pageService;

    @Autowired
    ApplicationService applicationService;

    @Test
    public void saveGroupPages() throws Exception {
        Application application = getApp();
        Application dbApp = applicationService.getByAppId(application.getAppId());

        List<Page> pages = getPages();
        List<GroupPage> groupPages = getGroupPages();

        pageService.save(pages, dbApp);
        groupPageService.saveGroupPages(groupPages, dbApp);
        applicationService.save(application);

    }

    Application getApp(){
        Application application = new Application();
        application.setAppId("9408e357-eb0c-44b8-8b6e-af227a00a69f_2cddbe857f00000120efc2da2ad7c32a");
        application.setDisplayName("SideNavigation");
        application.setDescription("");
        application.setState(Application.State.FULL);
        application.setContentType(Application.ContentType.CHILD);
        return application;
    }

    List<GroupPage> getGroupPages(){
        Page page1 = new Page("page1", "page1", "page1", "page1");
        page1.setImage("hkjhjhj");
        Page page2 = new Page("page2", "page2", "page2", "page2");
        List<Page> pages1 =  new ArrayList<>();
        pages1.add(page1);
        pages1.add(page2);

        Page page3 = new Page("page3", "page3", "page3", "page3");
        Page page4 = new Page("page4", "page4", "page4", "page4");
        List<Page> pages2 =  new ArrayList<>();
        pages2.add(page3);
        pages2.add(page4);

        GroupPage groupPage1 = new GroupPage();
        groupPage1.setName("dfdf");
        groupPage1.setPages(pages1);

        GroupPage groupPage2 = new GroupPage();
        groupPage2.setName("dfdf");
        groupPage2.setPages(pages2);

        List<GroupPage> groupPages = new ArrayList<>();
        groupPages.add(groupPage1);
        groupPages.add(groupPage2);

         return groupPages;
    }

    List<Page> getPages(){
        Page page3 = new Page("page3", "page3", "page3", "page3");
        Page page4 = new Page("page4", "page4", "page4", "page4");
        List<Page> pages =  new ArrayList<>();
        pages.add(page3);
        pages.add(page4);

        return pages;
    }
}