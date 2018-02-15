package com.digdes.rst.navigation.web.portlet.sitemap;


import com.digdes.rst.navigation.persistence.services.NavigationService;
import org.exoplatform.portal.webui.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.ModelAndView;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

//import com.digdes.rst.sitemap.persistence.model.Application;

/**
 * Created by Yaroslavtsev.I on 25.08.2017.
 */
@Controller
@RequestMapping("VIEW")
public class SiteMapPortletController {

    @Autowired
    NavigationService navigationService;

    @RenderMapping
    protected ModelAndView view(RenderRequest req, RenderResponse resp) throws Exception {
        String currentPortal = getCurrentPortal().toLowerCase().trim();
        ModelAndView model = new ModelAndView(  "siteMap");
        model.addObject("map", navigationService.getMap(getCurrentSite()));
        return model;
    }

    private String getCurrentPortal() {
        return Util.getPortalRequestContext().getUserPortalConfig().getPortalName();
    }

    private String getCurrentSite() {
        return Util.getPortalRequestContext().getSiteName();
    }
}
