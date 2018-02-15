package com.digdes.rst.navigation.web.portlet.top;


import com.digdes.rst.commons.CommonConstants;
import com.digdes.rst.commons.application.ApplicationUtils;
import com.digdes.rst.commons.model.ApplicationBean;
import com.digdes.rst.commons.portal.PortalUtils;
import com.digdes.rst.navigation.persistence.beans.LocaleBean;
import com.digdes.rst.navigation.persistence.config.AppConfig;
import com.digdes.rst.navigation.persistence.model.PageBean;
import com.digdes.rst.navigation.persistence.services.LocaleService;
import com.digdes.rst.navigation.persistence.services.NavigationService;
import lombok.extern.log4j.Log4j;
import org.exoplatform.portal.webui.util.Util;
import org.exoplatform.portal.webui.workspace.UIPortalApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.portlet.ModelAndView;
import org.springframework.web.portlet.bind.annotation.ActionMapping;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Shushkov.R
 *         Date 25.10.11 12:44
 *         Copyright http://digdes.com
 */
@Log4j
@Controller
@RequestMapping("VIEW")
public class TopNavigationPortletController {

    @Autowired
    NavigationService navigationService;

    @Autowired
    LocaleService localeService;

    public static List<PageBean> topPages;
    public static List<LocaleBean> locales;

    @RenderMapping
    protected ModelAndView view(RenderRequest req, RenderResponse resp) throws Exception {

        ModelAndView model = new ModelAndView("/header/main");
        initModel(model, req, resp);
        return model;
    }
    @RenderMapping(params = "action=changeLanguage")
    protected ModelAndView changeLanguageView(RenderRequest req, RenderResponse resp) throws Exception {

        ModelAndView model = new ModelAndView("/header/main");
        initModel(model, req, resp);
        return model;
    }
    private void initModel(ModelAndView model, RenderRequest req, RenderResponse resp) {
        ApplicationBean applicationBean = ApplicationUtils.getCurrentApp(req, resp, AppConfig.SECRET_KEY);
        model.addObject("headerAppId", CommonConstants.HEADER_APP_ID);
        if (topPages == null) {
            topPages = navigationService.getTopPagesNavigation();
        }
        if (locales == null) {
            locales = localeService.getLocales();
        }
        model.addObject("headerAppIdValue", applicationBean.getSecretAppId());
        model.addObject("pages", topPages);
        model.addObject("currentTheme", PortalUtils.getCurrentSkin());
        model.addObject("defaultTheme", PortalUtils.getRstDefaultSkin());
        model.addObject("locales", locales);
        if (req.getRemoteUser() != null && !req.getRemoteUser().isEmpty()) {
            model.addObject("currentUser", req.getRemoteUser());
        }
    }

    //TODO Дубль кода
    private String getCurrentSite() {
        return Util.getPortalRequestContext().getUserPortalConfig().getPortalName();
    }

    @ActionMapping(params = "action=changeSkinVisually")
    public void changeSkinVisually(@RequestParam("theme") String theme, ActionRequest request, ActionResponse response) {
        UIPortalApplication portalApp = Util.getUIPortalApplication();
        if (theme == null) theme = PortalUtils.getRstDefaultSkin();
        portalApp.setSkin(theme);

    }

    @ActionMapping(params = "action=changeLanguage")
    public void changeLanguage(@RequestParam("lang") String lang, ActionRequest request, ActionResponse response) {

        if (lang != null) {
            LocaleBean localeBean = new LocaleBean();
            localeBean.setLang(lang);
            localeService.saveLocale(localeBean);
        }

    }
}
