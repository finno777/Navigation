package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.beans.LocaleBean;
import org.exoplatform.container.ExoContainer;
import org.exoplatform.container.ExoContainerContext;
import org.exoplatform.portal.Constants;
import org.exoplatform.portal.application.PortalRequestContext;
import org.exoplatform.portal.webui.util.Util;
import org.exoplatform.services.organization.OrganizationService;
import org.exoplatform.services.organization.UserProfile;
import org.exoplatform.services.resources.LocaleConfig;
import org.exoplatform.services.resources.LocaleConfigService;
import org.exoplatform.services.resources.LocaleContextInfo;
import org.exoplatform.services.resources.ResourceBundleService;
import org.exoplatform.webui.application.WebuiRequestContext;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * Author shushkov.r on 10.07.2017.
 */
@Service
public class LocaleService {
    private static final String LOCALE_COOKIE = "LOCALE";
    public List<LocaleBean> getLocales() {
        List<LocaleBean> locales = new ArrayList<>();
        LocaleConfigService configService = getApplicationComponent(LocaleConfigService.class);
        Locale currentLocale = Util.getPortalRequestContext().getLocale();
        for (Object object : configService.getLocalConfigs()) {
            LocaleConfig localeConfig = (LocaleConfig) object;
            Locale locale = localeConfig.getLocale();
            String lang = locale.getLanguage();
            String country = locale.getCountry();

            ResourceBundle currentLocaleResourceBundle = getResourceBundle(currentLocale);
            ResourceBundle localeResourceBundle = getResourceBundle(locale);
            String key = "Locale." + lang;
            String displayName = null;
            try {
                displayName = currentLocaleResourceBundle.getString(key);
            } catch (MissingResourceException e) {
            }
            if (displayName != null) {
                String localedName = null;
                try {
                    localedName = localeResourceBundle.getString(key);
                } catch (MissingResourceException e) {
                }

                if (country != null && country.length() > 0) {
                    lang = lang + "_" + country;
                    key = "Locale." + lang;

                    try {
                        displayName = currentLocaleResourceBundle.getString(key);
                    } catch (MissingResourceException e) {
                    }

                    try {
                        localedName = localeResourceBundle.getString(key);
                    } catch (MissingResourceException e) {
                    }
                }

                if (localedName == null || localedName.length() == 0)
                    localedName = "???";
                LocaleBean localeBean = new LocaleBean();
                localeBean.setKey(key);
                localeBean.setLang(lang);
                localeBean.setName(localedName);
                localeBean.setDisplayName(displayName);
                if (locale.getDisplayName().equalsIgnoreCase(currentLocale.getDisplayName())) {
                    localeBean.setSelected(true);
                }
                locales.add(localeBean);
            }
        }
        return locales;
    }

    public void saveLocale(LocaleBean localeBean){
        PortalRequestContext prqCtx = PortalRequestContext.getCurrentInstance();
        LocaleConfigService configService = getApplicationComponent(LocaleConfigService.class);
        LocaleConfig localeConfig = configService.getLocaleConfig(localeBean.getLang().toLowerCase());
        prqCtx.setLocale(localeConfig.getLocale());
        if(prqCtx.getRemoteUser()!=null){
            saveLocaleToUserProfile(prqCtx,localeConfig.getLocale(),prqCtx.getRemoteUser());
        }
    }

    public <T> T getApplicationComponent(Class<T> type) {
        WebuiRequestContext context = WebuiRequestContext.getCurrentInstance();
        ExoContainer container = context.getApplication().getApplicationServiceContainer();
        return type.cast(container.getComponentInstanceOfType(type));
    }

    private ResourceBundle getResourceBundle(Locale locale) {
        ExoContainer appContainer = ExoContainerContext.getCurrentContainer();
        ResourceBundleService service = (ResourceBundleService) appContainer
                .getComponentInstanceOfType(ResourceBundleService.class);
        return service.getResourceBundle("locale.portal.webui", locale);
    }


    private void saveLocaleToUserProfile(PortalRequestContext context, Locale loc, String user) {
        ExoContainer container = context.getApplication().getApplicationServiceContainer();
        OrganizationService svc = (OrganizationService) container.getComponentInstanceOfType(OrganizationService.class);
        UserProfile userProfile = loadUserProfile(container, context);
        if (userProfile != null) {
            userProfile.getUserInfoMap().put(Constants.USER_LANGUAGE, LocaleContextInfo.getLocaleAsString(loc));
            try {
                svc.getUserProfileHandler().saveUserProfile(userProfile, false);
            } catch (Exception ignored) {
               // log.error("IGNORED: Failed to save profile for user: " + user, ignored);
                userProfile = null;
            }
        }

        if (userProfile == null) {
                //log.warn("Unable to save locale into profile for user: " + user);
        }
    }
    private void saveLocaleToCookie(PortalRequestContext context, Locale loc) {
        HttpServletResponse res = context.getResponse();
        Cookie cookie = new Cookie(LOCALE_COOKIE, LocaleContextInfo.getLocaleAsString(loc));
        cookie.setMaxAge(Integer.MAX_VALUE);
        cookie.setPath("/");
        res.addCookie(cookie);
    }

    private UserProfile loadUserProfile(ExoContainer container, PortalRequestContext context) {
        UserProfile userProfile = null;
        OrganizationService svc = (OrganizationService) container.getComponentInstanceOfType(OrganizationService.class);

        String user = context.getRemoteUser();
        if (user != null) {
            try {
                userProfile = svc.getUserProfileHandler().findUserProfileByName(user);
            } catch (Exception ignored) {
                //log.error("IGNORED: Failed to load UserProfile for username: " + user, ignored);
            }

            if (userProfile == null)
                //log.warn("Could not load user profile for " + user + ". Using default portal locale.");

            if(userProfile == null) {
                userProfile = svc.getUserProfileHandler().createUserProfileInstance(user);
            }
        }
        return userProfile;
    }
}
