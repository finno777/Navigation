package com.digdes.rst.navigation.web.portlet.side;

import com.digdes.rst.commons.CommonConstants;
import com.digdes.rst.commons.application.ApplicationUtils;
import com.digdes.rst.commons.model.ApplicationBean;
import com.digdes.rst.commons.permission.PermissionUtils;
import com.digdes.rst.commons.portal.PortalUtils;
import com.digdes.rst.navigation.persistence.config.AppConfig;
import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.services.ApplicationService;
import com.digdes.rst.navigation.persistence.services.GroupPageService;
import com.digdes.rst.navigation.persistence.services.NavigationService;
import com.digdes.rst.navigation.persistence.services.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.ModelAndView;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

/**
 * Created by Yaroslavtsev.I on 25.08.2017.
 */
@Controller
@RequestMapping("VIEW")
public class SideNavigationPortletController {
    private static final String RST_SKIN = "gost";

    @Autowired
    NavigationService navigationService;

    @Autowired
    ApplicationService applicationService;

    @Autowired
    PageService pageService;

    @Autowired
    GroupPageService groupPageService;

    @RenderMapping
    protected ModelAndView view(RenderRequest req, RenderResponse resp) throws Exception {
        ApplicationBean applicationBean = ApplicationUtils.getCurrentApp(req, resp, AppConfig.SECRET_KEY);
        String url = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + "" + resp.createRenderURL();
        Application application = applicationService.initApp(applicationBean.getAppId(), applicationBean.getNodeId(), applicationBean.getDisplayName(), url);
        String portalName = PortalUtils.getPortalName(application.getAppId());

        ModelAndView model = new ModelAndView("/sideNav/main");
        NavigationDto navigationDto = pageService.getPagesByApp(application);

        model.addObject("pagesWithoutGroup", navigationDto.getPagesWithoutGroup());
        model.addObject("groupPagesWithPages", navigationDto.getGroups());

        model.addObject("headerAppId", CommonConstants.HEADER_APP_ID);
        model.addObject("headerAppIdValue", applicationBean.getSecretAppId());
        model.addObject("nodeId", applicationBean.getNodeId());
        model.addObject("portalName", portalName);
        model.addObject("app", application);

        model.addObject("currentTheme", PortalUtils.getCurrentSkin());
        model.addObject("defaultTheme", PortalUtils.getRstDefaultSkin());

        model.addObject("roles", PermissionUtils.getRoles(req.getRemoteUser(), applicationBean));

        model.addObject("replaceAppId", application.getAppId().replace("-", "_"));
        return model;
    }
}
