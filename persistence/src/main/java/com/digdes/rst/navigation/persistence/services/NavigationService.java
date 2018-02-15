package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.config.AppConfig;
import com.digdes.rst.navigation.persistence.model.Page;
import com.digdes.rst.navigation.persistence.model.PageBean;
import com.digdes.rst.navigation.persistence.util.PageBeanMapper;
import com.digdes.rst.navigation.persistence.util.PageMapper;
import lombok.extern.log4j.Log4j;
import org.exoplatform.portal.application.PortalRequestContext;
import org.exoplatform.portal.mop.*;
import org.exoplatform.portal.mop.navigation.GenericScope;
import org.exoplatform.portal.mop.page.PageContext;
import org.exoplatform.portal.mop.page.PageKey;
import org.exoplatform.portal.mop.page.PageState;
import org.exoplatform.portal.mop.user.UserNavigation;
import org.exoplatform.portal.mop.user.UserNode;
import org.exoplatform.portal.mop.user.UserNodeFilterConfig;
import org.exoplatform.portal.mop.user.UserPortal;
import org.exoplatform.portal.pom.config.POMSession;
import org.exoplatform.portal.webui.portal.UIPortal;
import org.exoplatform.portal.webui.util.Util;
import org.exoplatform.webui.application.WebuiRequestContext;
import org.gatein.mop.api.workspace.Navigation;
import org.gatein.mop.api.workspace.ObjectType;
import org.gatein.mop.api.workspace.Site;
import org.gatein.mop.api.workspace.Workspace;
import org.gatein.mop.api.workspace.link.Link;
import org.gatein.mop.api.workspace.link.PageLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


/**
 * Author shushkov.r on 05.07.2017.
 */
@Log4j
@Service
public class NavigationService extends ExoApi {

    @Autowired
    RedirectPageService redirectPageService;

    private final UserNodeFilterConfig NAVIGATION_FILTER_CONFIG;
    private static final String DEFAULT_PAGE = "default";
    private static final String HOME_PAGE = "home";
    private final Integer DEFAULT_LEVEL = 3;


    public NavigationService() {
        UserNodeFilterConfig.Builder filterConfigBuilder = UserNodeFilterConfig.builder();
        filterConfigBuilder.withReadWriteCheck().withVisibility(Visibility.DISPLAYED, Visibility.TEMPORAL);
        filterConfigBuilder.withTemporalCheck();
        NAVIGATION_FILTER_CONFIG = filterConfigBuilder.build();
    }


    public List<PageBean> getTopPagesNavigation() {
        List<PageBean> pages = new ArrayList<>();
        WebuiRequestContext context = WebuiRequestContext.getCurrentInstance();
        String portalURI = null;
        String nodePath = null;
        if (context instanceof PortalRequestContext) {
            PortalRequestContext portalRequestContext = (PortalRequestContext) context;
            portalURI = portalRequestContext.getPortalURI();
            nodePath = portalRequestContext.getNodePath();
        }
        UserPortal userPortal = Util.getPortalRequestContext().getUserPortalConfig().getUserPortal();
        UserNode selectedNode = userPortal.resolvePath(Util.getUIPortal().getUserNavigation(), NAVIGATION_FILTER_CONFIG, nodePath);
        List<UserNavigation> navigations = userPortal.getNavigations();

        Map<String, String> redirectPages = redirectPageService.getAll();
        log.debug("--------------------top--------------------------");
        for (UserNavigation userNavigation : navigations) {
            if (userNavigation.getKey().getType().equals(SiteType.PORTAL)) {
                UserNode rootNode = userPortal.getNode(userNavigation, GenericScope.treeShape(DEFAULT_LEVEL), NAVIGATION_FILTER_CONFIG, null);
                UserNode homePage = rootNode.getChild(HOME_PAGE);
                Collection<UserNode> firstLevel = homePage.getChildren();
                for (UserNode p1 : firstLevel) {
                    PageBean pageBean = PageBeanMapper.map1(p1, portalURI, redirectPages.get(p1.getId()));
                    log.debug(p1.getId() + " " + pageBean.getUri());
                    if (selectedNode != null && p1.getId().equals(selectedNode.getId())) {
                        pageBean.setSelected(true);
                    }
                    Collection<UserNode> secondLevel = p1.getChildren();
                    List<PageBean> pageBeanListSecondLevel = new ArrayList<>();
                    if (secondLevel != null && !secondLevel.isEmpty()) {
                        for (UserNode p2 : secondLevel) {
                            PageBean pageBean2 = PageBeanMapper.map1(p2, portalURI, redirectPages.get(p2.getId()));
                            log.debug(p2.getId() + " " + pageBean2.getUri());
                            if (selectedNode != null && p2.getId().equals(selectedNode.getId())) {
                                pageBean2.setSelected(true);
                            }
                            pageBeanListSecondLevel.add(pageBean2);
                        }
                        pageBean.setChildren(pageBeanListSecondLevel);
                    }
                    pages.add(pageBean);
                }
            }
        }
        return pages;
    }

    //текущая страница
    public UserNode getSelectedNode() {
        UIPortal uiPortal = Util.getUIPortal();
        if (uiPortal != null) {
            try {
                return uiPortal.getSelectedUserNode();
            } catch (Exception e) {
                //log;
            }
        }
        return null;
    }

    //Загрузить навигационный узел
    protected final Navigation loadNode(String nodeId, POMSession session) {
        return session != null ? session.findObjectById(ObjectType.NAVIGATION, nodeId) : null;
    }

    //дочерние страницы
    public List<Page> getChildNodes(String nodeId) {
        POMSession session = getPOMSession();
        try {
            return getChildNodes(nodeId, session);
        } finally {
            if (session != null)
                session.close();
        }
    }

    //параллельные страницы
    public List<Page> getSiblingNodes(String nodeId) {
        POMSession session = getPOMSession();
        try {
            return getSiblingNodes(nodeId, session);
        } finally {
            if (session != null)
                session.close();
        }
    }

    //дочерние страницы
    private List<Page> getChildNodes(String nodeId, POMSession session) {
        Navigation node = loadNode(nodeId, session);
        if (node == null)
            return Collections.emptyList();
        Collection<Navigation> nodes = node.getChildren();
        return mapPages(nodes);
    }

    //параллельные страницы
    private List<Page> getSiblingNodes(String nodeId, POMSession session) {
        Navigation node = loadNode(nodeId, session);
        if (node == null)
            return Collections.emptyList();
        Navigation parent = node.getParent();
        Collection<Navigation> nodes = parent.getChildren();
        return mapPages(nodes);
    }

    private List<Page> mapPages(Collection<Navigation> nodes) {
        List<Page> pages = new ArrayList<>();
        Map<String, String> redirectPages = redirectPageService.getAll();

        if (nodes != null) {
            for (Navigation n : nodes) {
                Page page = PageMapper.mapPage(n, getPageLabel(n), redirectPages.get(n.getObjectId()));
                if (page != null) {
                    pages.add(page);
                }
            }
        }
        return pages;
    }

    public List<Page> getMap(String siteName) {
        log.debug("--------------------map--------------------------");
        POMSession session = getPOMSession();
        try {
            Workspace workspace = session.getWorkspace();
            Site site = workspace.getSite(ObjectType.PORTAL_SITE, siteName);
            Navigation home = site.getRootNavigation().getChild(DEFAULT_PAGE).getChild(HOME_PAGE);
            Map<String, String> redirectPages = redirectPageService.getAll();
            Page page = loadPage(home, redirectPages);
            return page.getPages();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            if (session != null)
                session.close();
        }
        return null;
    }

    private Page loadPage(Navigation navigation, Map<String, String> redirectPages) {
        Page page = PageMapper.mapPage(navigation, getPageLabel(navigation), redirectPages.get(navigation.getObjectId()));
        if(page!=null)
            log.debug(page.getNodeId() + " " + page.getUri());

        if (page != null && navigation.getChildren() != null) {
            List<Page> children = new ArrayList<>();
            for (Navigation n : navigation.getChildren()) {
                Page child = loadPage(n, redirectPages);
                if (child != null) {
                    children.add(child);
                }
            }
            page.setPages(children);
        }
        return page;
    }

    //Получить наименование узла(страницы)
    public String getPageLabel(Navigation node) {
        String label = null;
        Described.State de = getDescriptionService().getDescription(node.getObjectId(), getDefaultLocale());
        if (de != null) {
            label = de.getName();
        }
        if (label == null || label.trim().isEmpty()) {
            label = getPageTitle(node);
        }

        return label;
    }

    //Получить заголовок узла(страницы)
    public String getPageTitle(Navigation node) {
        String title = null;

        Link pageLink = node.getLink();
        if (pageLink != null) {
            org.gatein.mop.api.workspace.Page page = ((PageLink) pageLink).getPage();
            if (page != null) {
                PageContext pageContext = getPageService().loadPage(getPageIdFor(page, node.getSite()));
                if (pageContext != null) {
                    PageState pageState = pageContext.getState();
                    if (pageState != null) {
                        title = pageState.getDisplayName();
                    }
                }
            }
        }

        if (title == null) {
            if (node.isAdapted(Described.class)) {
                Described described = node.adapt(Described.class);
                title = described.getName();
            }
        }
        if (title == null) {
            title = node.getName();
        }

        return title;
    }

    //Получить ключ для страницы
    public PageKey getPageIdFor(org.gatein.mop.api.workspace.Page page, Site site) {
        return getSiteKey(site).page(page.getName());
    }

    //Получить ключ для портала
    public SiteKey getSiteKey(Site site) {
        return Utils.siteType(site.getObjectType()).key(site.getName());
    }

    public List<Page> getBreadCrumbs() {
        List<Page> breadCrumbs = new ArrayList<>();

        POMSession session = getPOMSession();
        try {
            UserNode selected = getSelectedNode();
            Navigation item = loadNode(selected.getId(), session);
            Map<String, String> redirectPages = redirectPageService.getAll();
            while (item != null) {
                Page page = PageMapper.mapPage(item, getPageLabel(item), redirectPages.get(item.getObjectId()));
                breadCrumbs.add(page);
                if (item.getParent() != null && item.getParent().getName().equals(HOME_PAGE)) {
                    break;
                }
                item = item.getParent();
            }

            Collections.reverse(breadCrumbs);
        } finally {
            if (session != null)
                session.close();
        }

        return breadCrumbs;
    }
}
