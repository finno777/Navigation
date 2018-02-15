package com.digdes.rst.navigation.web.controller;

import com.digdes.rst.commons.CommonConstants;
import com.digdes.rst.commons.application.ApplicationUtils;
import com.digdes.rst.commons.model.RoleBean;
import com.digdes.rst.commons.permission.EXOPermission;
import com.digdes.rst.commons.portal.PortalUtils;
import com.digdes.rst.navigation.persistence.config.AppConfig;
import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import com.digdes.rst.navigation.persistence.dto.ResponseDto;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import com.digdes.rst.navigation.persistence.services.ApplicationService;
import com.digdes.rst.navigation.persistence.services.GroupPageService;
import com.digdes.rst.navigation.persistence.services.NavigationService;
import com.digdes.rst.navigation.persistence.services.PageService;
import com.digdes.rst.navigation.web.portlet.top.TopNavigationPortletController;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@lombok.extern.log4j.Log4j
@Controller
@RequestMapping("/navigation")
public class NavigationController {

    @Autowired
    PageService pageService;

    @Autowired
    ApplicationService applicationService;

    @Autowired
    NavigationService navigationService;

    @Autowired
    GroupPageService groupPageService;

    @ApiOperation(value = "Сохранение всех страниц")
    @ApiImplicitParams({@ApiImplicitParam(name = CommonConstants.HEADER_APP_ID,
            dataType = "string",
            paramType = "header")})
    @EXOPermission(roles = {RoleBean.MANAGER}, secretKey = AppConfig.SECRET_KEY)
    @ResponseBody
    @RequestMapping(value = "/save.action", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public NavigationDto save(@RequestBody NavigationDto navigation, HttpServletRequest request) throws Exception {
        String appId = ApplicationUtils.getAppId(request, AppConfig.SECRET_KEY);
        Application dbApp = applicationService.getByAppId(appId);

        pageService.save(navigation.getPagesWithoutGroup(), dbApp);
        groupPageService.saveGroupPages(navigation.getGroups(), dbApp);

        Application application = navigation.getApplication();
        application.setAppId(appId);
        applicationService.save(application);

        return navigation;
    }

    @ApiOperation(value = "Список дочерних страниц")
    @RequestMapping(value = "/getChild.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    private List<Page> childPage(@RequestParam String nodeId) {
        return navigationService.getChildNodes(nodeId);
    }

    @ApiOperation(value = "Список параллельных страниц")
    @RequestMapping(value = "/getSibling.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    private List<Page> siblingPage(@RequestParam String nodeId) throws Exception {
        return navigationService.getSiblingNodes(nodeId);
    }

    @ApiOperation(value = "Список групп")
    @RequestMapping(value = "/getGroupPages.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    private List<GroupPage> getGroupPages(@RequestParam String appId) {
        Application application = applicationService.getByAppId(appId);
        return pageService.getPagesByApp(application).getGroups();
    }

    @ApiOperation(value = "Список страниц по апп без групп")
    @RequestMapping(value = "/getPagesByAppIdWithoutGroup.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Page> getPagesByAppIdWithoutGroup(@RequestParam String appId) {
        Application application = applicationService.getByAppId(appId);
        return pageService.getPagesByApp(application).getPagesWithoutGroup();
    }

    @ApiOperation(value = "Удалить группу страниц")
    @ApiImplicitParams({@ApiImplicitParam(name = CommonConstants.HEADER_APP_ID,
            dataType = "string",
            paramType = "header")})
    @EXOPermission(roles = {RoleBean.MANAGER}, secretKey = AppConfig.SECRET_KEY)
    @RequestMapping(value = "/removeGroupPage.action", method = RequestMethod.DELETE)
    public ResponseDto removeGroupPage(@RequestParam Long id, HttpServletResponse response) {
        groupPageService.deleteGroupPage(id);
        return new ResponseDto(true);
    }

    @ApiOperation(value = "Удалить страницу")
    @EXOPermission(roles = {RoleBean.MANAGER}, secretKey = AppConfig.SECRET_KEY)
    @RequestMapping(value = "/removePage.action", method = RequestMethod.DELETE)
    public ResponseDto removePage(@RequestBody Page page) {
        pageService.deletePage(page);
        return new ResponseDto(true);
    }

    @ApiOperation(value = "Получить карту сайта")
    @ResponseBody
    @RequestMapping(value = "/getMap.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Page> getMap(HttpServletRequest request) {
        String appId = ApplicationUtils.getAppId(request, AppConfig.SECRET_KEY);
        String portalName = PortalUtils.getPortalName(appId);
        return navigationService.getMap(portalName);
    }

    @RequestMapping(value = "/getStatePortlet.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Application.State getStatePortlet(@RequestParam Application.State state, String appId) {
        Application application = applicationService.getByAppId(appId);
        application.setState(state);
        applicationService.save(application);
        return application.getState();
    }

    @RequestMapping(value = "/clearCache.action", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public ResponseEntity<String> clearCache() {
        TopNavigationPortletController.topPages = null;
        TopNavigationPortletController.locales = null;
        return  ResponseEntity.ok("Success");
    }

}
