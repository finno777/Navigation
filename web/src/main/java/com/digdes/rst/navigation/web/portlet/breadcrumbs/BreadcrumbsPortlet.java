package com.digdes.rst.navigation.web.portlet.breadcrumbs;

import com.digdes.rst.navigation.persistence.services.NavigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.ModelAndView;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

@Controller
@RequestMapping("VIEW")
public class BreadcrumbsPortlet {

@Autowired
    NavigationService navigationService;

    @RenderMapping
    protected ModelAndView view(RenderRequest req, RenderResponse resp) throws Exception {
        ModelAndView modelAndView = new ModelAndView("breadcrumbs");
        modelAndView.addObject("currentPage", navigationService.getSelectedNode());
        modelAndView.addObject("breadcrumbs", navigationService.getBreadCrumbs());
        return modelAndView;
    }
}
