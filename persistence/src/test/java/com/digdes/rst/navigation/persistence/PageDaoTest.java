package com.digdes.rst.navigation.persistence;


import com.digdes.rst.navigation.persistence.dao.ApplicationDao;
import com.digdes.rst.navigation.persistence.dao.GroupPageDao;
import com.digdes.rst.navigation.persistence.dao.PageDao;
import com.digdes.rst.navigation.persistence.model.Page;
import com.digdes.rst.navigation.persistence.services.ApplicationService;
import com.digdes.rst.navigation.persistence.services.GroupPageService;
import com.digdes.rst.navigation.persistence.services.PageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:app.xml"})
public class PageDaoTest {

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
    public void save12() throws Exception {

    }

    @Test
    public void save() throws Exception {
        List<Page> pages = new ArrayList<>();

        Page page = new Page("222", "222", "222", "222");
        System.out.println(page);
        pages.add(page);

//        pageService.save(pages, "64d14db5-7812-49c6-a462-2e045d104d66_2cddbe857f00000120efc2da2ad7c32a");
//
//        GroupPage groupPage= groupPageService.getGroup((long)92);
//
//        groupPage.setPages(pages);
//
//        List<GroupPage> groupPages=new ArrayList<>();
//
//        groupPages.add(groupPage);
//
//        groupPageService.saveGroupPages(groupPages,"64d14db5-7812-49c6-a462-2e045d104d66_2cddbe857f00000120efc2da2ad7c32a");


    }

    @Test
    public void test() {
        Page page1 = new Page("1", null, null, null);
        page1.setImage("dfdfdfdfdfdf");
        Page page2 = new Page("2", null, null, null);
        Page page3 = new Page("1", null, null, null);
        Page page4 = new Page("4", null, null, null);

        List<Page> portalNodes = new ArrayList<>();
        portalNodes.add(page1);
        portalNodes.add(page2);

        List<Page>pages = new ArrayList<>();
        pages.add(page3);
        pages.add(page4);

        Iterator<Page> iterator = pages.iterator();
        while (iterator.hasNext()) {
            Page page = iterator.next();

            int index = portalNodes.indexOf(page);
            if (portalNodes.contains(page)) {
                portalNodes.remove(page);
            } else {
                //если страницы нет на портале и она не добавлена вручную - удалим старницу из списка
                iterator.remove();
//                pages.remove(page);
            }
        }
        pages.addAll(portalNodes);//добавляем в список новые страницы с портала которых не было в БД
    }
}