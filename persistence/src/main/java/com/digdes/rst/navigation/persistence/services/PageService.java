package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dao.ApplicationDao;
import com.digdes.rst.navigation.persistence.dao.PageDao;
import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Log4j
@Transactional
@Service
public class PageService {
    @Autowired
    PageDao pageDao;

    @Autowired
    ApplicationDao applicationDao;

    @Autowired
    NavigationService navigationService;

    @Autowired
    GroupPageService groupPageService;

    @Autowired
    RedirectPageService redirectPageService;

    public void save(List<Page> pages, Application application) throws Exception {
//        Application application = applicationDao.findByAppId(appId);
//        List<Page> pagesDb=pageDao.findPagesByApp(application);
//        List<Page> newPage=new ArrayList<>();
//        List<Page> deletePage=new ArrayList<>();

        pageDao.deleteAllByApp(application.getId());
        if (pages != null)
            for (Page page : pages) {
                page.setApplication(application);
                save(page);


//            if (pages != null && !pages.isEmpty()) {
//                Iterator<Page> iterator = pages.iterator();
//                while (iterator.hasNext()) {
//                    Page page = iterator.next();
//                    if (!pagesDb.contains(page))
//                      {
//                        if (page.getId() != null) {
//                            pageDao.delete(page.getId());
//                        } else {
//                            page.setApplication(application);
//                            pageDao.saveOrUpdate(page);
//                        }
//                    }
//                }
//            }
//        for(Page page:newPage){
//            page.setApplication(application);
//            pageDao.saveOrUpdate(page);

            }
    }

    public void save(Page page) {
        //TODO: включить проверку после фикса прода
//        if (checkURL(page)) {
        page.setId(null);
        pageDao.saveOrUpdate(page);
//        }
    }

    public void deletePage(Page page) {
        if (page != null) {
            pageDao.delete(page);
        }
    }

    public List<Page> getByGroup(GroupPage groupPage) {
        return pageDao.findPagesByGroup(groupPage);
    }

    public boolean checkURL(Page page) {
        boolean isValid = false;
        try {
            String pareURL = page.isInternal() ? page.getApplication().getPageUrl() + page.getUri() : page.getUri();
            URL url = new URL(pareURL);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.connect();
            int statusCode = urlConnection.getResponseCode();
            if (statusCode >= 200 && statusCode <= 299) {
                isValid = true;
            }
        } catch (Exception e) {
            log.debug("checkURL failed");
            log.debug(e.getMessage(), e);
        }
        return isValid;
    }

    public NavigationDto getPagesByApp(Application application) {
        List<Page> pagesWithoutGroup = getPagesByAppWithoutGroup(application);
        List<GroupPage> groupPages = groupPageService.getGroupPageByApp(application);
        for (GroupPage groupPage : groupPages) {
            List<Page> pages = getPagesByGroup(groupPage);
            groupPage.setPages(pages);
        }
        compareDBPagesWithPortal(pagesWithoutGroup, groupPages, application);
        NavigationDto navigationDto = new NavigationDto(application, pagesWithoutGroup, groupPages);
        return navigationDto;
    }

    public List<Page> getPagesByAppWithoutGroup(Application application) {
        List<Page> pages = pageDao.findPagesWithoutGroupByApp(application);//беру список уже с нулом
//        compareDBPagesWithPortal(pages, application);
        return pages;
    }

    private void compareDBPagesWithPortal(List<Page> pagesWithoutGroup, List<GroupPage> groupPages, Application application) {
        //Если в портлете отображаются дочерние или парралельные страницы проверим изменения на портале
        if (application.getContentType() != null && !application.getContentType().equals(Application.ContentType.CUSTOM)) {
            List<Page> portalNodes = application.getContentType().equals(Application.ContentType.CHILD)
                    ? navigationService.getChildNodes(application.getNodeId())
                    : navigationService.getSiblingNodes(application.getNodeId());

            Map<String, String> redirectPages = redirectPageService.getAll();

            comparePages(redirectPages, portalNodes, pagesWithoutGroup);

            for (GroupPage groupPage : groupPages) {
                List<Page> pages = getPagesByGroup(groupPage);
                comparePages(redirectPages, portalNodes, pages);
                groupPage.setPages(pages);
            }

            pagesWithoutGroup.addAll(portalNodes);//добавляем в список новые страницы с портала которых не было в БД
        }
    }

    private void comparePages(Map<String, String> redirectPages, List<Page> portalNodes, List<Page> dbPages) {
        Iterator<Page> iterator = dbPages.iterator();
        while (iterator.hasNext()) {
            //проходим по страницам из бд
            Page page = iterator.next();
            if (page == null)
                continue;

            String url = redirectPages.get(page.getNodeId());
            if(url!=null) page.setUri(url);

            if (!page.isCustom()) {//не проверям страницы добавленные вручную
                int index = portalNodes.indexOf(page);
                if (index > -1) {
                    //если на портале есть такая страница
                    //обновим имя страницы(на случай если имя было изменено на портале)
                    Page portalPage = portalNodes.get(index);
                    page.setName(portalPage.getName());
                    page.setDisplayName(portalPage.getDisplayName());

                    portalNodes.remove(index);
                } else {
                    //если страницы нет на портале - удалим старницу из списка
                    iterator.remove();
                }
            }
        }
    }


    public List<Page> getPagesByGroup(GroupPage groupPage) {
        List<Page> pages = getByGroup(groupPage);
        return pages;
    }
}
