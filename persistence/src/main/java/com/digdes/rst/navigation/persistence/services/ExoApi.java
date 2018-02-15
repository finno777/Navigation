package com.digdes.rst.navigation.persistence.services;

import lombok.extern.log4j.Log4j;
import org.exoplatform.container.PortalContainer;
import org.exoplatform.portal.config.DataStorage;
import org.exoplatform.portal.config.UserACL;
import org.exoplatform.portal.config.UserPortalConfigService;
import org.exoplatform.portal.mop.description.DescriptionService;
import org.exoplatform.portal.mop.navigation.NavigationService;
import org.exoplatform.portal.mop.page.PageService;
import org.exoplatform.portal.pom.config.POMSession;
import org.exoplatform.portal.pom.config.POMSessionManager;
import org.exoplatform.services.cache.CacheService;
import org.exoplatform.services.cache.ExoCache;
import org.exoplatform.services.jcr.RepositoryService;
import org.exoplatform.services.listener.ListenerService;
import org.exoplatform.services.organization.GroupHandler;
import org.exoplatform.services.organization.MembershipHandler;
import org.exoplatform.services.organization.OrganizationService;
import org.exoplatform.services.organization.idm.PicketLinkIDMService;

import java.util.Locale;

/**
 * Author shushkov.r on 23.03.2017.
 */
@Log4j
public abstract class ExoApi {

    private Object getComponent(Class type) {

        return getPortalContainer().getComponentInstanceOfType(type);
    }

    protected PortalContainer getPortalContainer() {
        return PortalContainer.getInstance();
    }

    protected PageService getPageService() {
        return (PageService) getComponent(PageService.class);
    }


    public POMSessionManager getPOMSessionManager() {
        return (POMSessionManager) getComponent(POMSessionManager.class);
    }

    public POMSession getPOMSession() {
        POMSession session = null;
        try {
            session = getPOMSessionManager().openSession();
        } catch (Exception e) {
            session = getPOMSessionManager().getSession();
        }

        return session;
    }

    protected DescriptionService getDescriptionService() {
        return (DescriptionService) getComponent(DescriptionService.class);
    }

    protected Locale getDefaultLocale() {
        return new Locale("ru");
    }

    //Очистка кэша
    public void clearCaches(CacheService cacheService) {
        for (Object o : cacheService.getAllCacheInstances()) {
            try {
                ((ExoCache) o).clearCache();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
    }
}
