package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.Page;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:app.xml"})
public class PageServiceTest {

    @Autowired
    PageService pageService;

    @Test
    public void getPagesByAppWithoutGroup() throws Exception {
        Application application = new Application();
        application.setId(2L);
        List<Page> pageList = pageService.getPagesByAppWithoutGroup(application);
        System.out.println(pageList);
    }

    @Test
    public void getPagesByApp() throws Exception {
        Application application = new Application();
        application.setId(2L);
       NavigationDto navigationDto = pageService.getPagesByApp(application);
        System.out.println(navigationDto);
    }



    @Test
    public void distinct(){
        Page page1 = new Page("1", null, null, null);
        Page page2 = new Page("1", null, null, null);
        Page page3 = new Page("2", null, null, null);
        Page page4 = new Page(null, null, null, null);
        Page page5 = new Page(null, null, null, null);

        List<Page>pages = new ArrayList<>();
        pages.add(page1);
        pages.add(page2);
        pages.add(page3);
        pages.add(page4);
        pages.add(page5);

        List<Page> res = pages.stream().distinct().collect(Collectors.toList());
        assertEquals(page1, page2);
        assertNotEquals(page4, page5);
        assertEquals(4, res.size());
    }

    @Test
    public void dfdf(){
        String url = "/portal/gost//home/about?portal:componentId=768e7a31-c804-4846-a51f-ce1fd371cc53";
        System.out.println(url.split("\\?")[0]);
    }

}