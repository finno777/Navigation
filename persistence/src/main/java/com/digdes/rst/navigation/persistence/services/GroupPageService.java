package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dao.GroupPageDao;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Log4j
public class GroupPageService {

    @Autowired
    GroupPageDao groupPageDao;
    @Autowired
    PageService pageService;
    @Autowired
    NavigationService navigationService;

    public void saveGroupPages(List<GroupPage> groupPages, Application application) {
        groupPageDao.deleteAllByApp(application);
        if (groupPages != null)
            for (GroupPage groupPage : groupPages) {
                saveGroupPage(groupPage, application);
            }
    }

    public void saveGroupPage(GroupPage groupPage, Application application) {
        groupPage.setApplication(application);
        groupPage.setId(null);
        groupPageDao.saveOrUpdate(groupPage);
        if (groupPage.getPages() != null && groupPage.getPages().size() != 0) {
            for (Page page : groupPage.getPages()) {
                page.setApplication(application);
                page.setGroupPage(groupPage);
                pageService.save(page);
            }
        }
    }

    public void deleteGroupPage(Long id) {
        GroupPage groupPage = getGroup(id);
        List<Page> pages = pageService.getByGroup(groupPage);
        if (pages != null) {
            for (Page page : pages) {
                page.setGroupPage(null);
                pageService.save(page);
            }
        }
        groupPageDao.delete(groupPage);
    }


    public List<GroupPage> getGroupPageByApp(Application application) {
//        List<GroupPage> groupPages = groupPageDao.findGroupPageByApplication(application);
//        for (GroupPage groupPage : groupPages) {
//            List<Page> pages = getPagesByGroup(groupPage);
//            groupPage.setPages(pages);
//        }
        return groupPageDao.findGroupPageByApplication(application);
    }

    public GroupPage getGroup(long id) {
        GroupPage groupPage = groupPageDao.findById(id);
        return groupPage;
    }


}
