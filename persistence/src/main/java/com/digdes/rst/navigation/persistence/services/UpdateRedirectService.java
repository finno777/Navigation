package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.model.Page;
import com.digdes.rst.navigation.persistence.model.RedirectPage;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j
@Service
public class UpdateRedirectService {

    @Autowired
    NavigationService navigationService;

    @Autowired
    RedirectPageService redirectPageService;

    public void update(String siteName) {
        Map<String, String> urls = getRedirectURLs();
        List<Page> portalPages = navigationService.getMap(siteName);
        log.debug("----------------updateRedirect-------------------");
        for(Page page: portalPages){
            update(page, urls);
        }
    }

    private void update(Page page,  Map<String, String> urls ){
        log.debug(page.getUri());
        String redirectUrl = urls.get(page.getUri());
        if(redirectUrl!=null){
            redirectPageService.save(new RedirectPage(page.getNodeId(),redirectUrl));
        }
        for(Page childPage: page.getPages()){
            update(childPage, urls);
        }
    }

    private Map<String, String> getRedirectURLs(){
        Map<String, String> urls = new HashMap<>();
        urls.put("/portal/gost/home/activity/metrology/podved/gsvch", "http://www.vniiftri.ru/index.php/ru/struct/gsvch");
        urls.put("/portal/gost/home/activity/metrology/podved/gsssd", "http://www.gostinfo.ru/pages/Centers/metrcenter/");
        urls.put("/portal/gost/home/activity/metrology/normandtech/anotherdocuments", "http://www.fundmetrology.ru/01_normparf/2list.aspx");
        urls.put("/portal/gost/home/activity/classifandcatal/catalogization", "http://fskp.gost.ru/");
        urls.put("/portal/gost/home/standarts/stansadrtsiso", "http://iso.gost.ru/wps/portal/!ut/p/c5/04_SB8K8xLLM9MSSzPy8xBz9CP0os3gLHzeXUFNLYwMLgwBXA09vVw-XYJ9gQxM_c6B8JG55H0NKdHuaEtAdDnItHtsN8MuDzAfJG-AAjgT0A33n55Gfm6pfkBsaYZDpqQsAIB0jyQ!!/dl3/d3/L2dJQSEvUUt3QS9ZQnZ3LzZfOExGRFU1OTMwODBQRTBJS0VIRFNMUzE0NzU!/");
        urls.put("/portal/gost/home/services/orderstansarts", "http://standard.gost.ru/wps/portal/ordercertificate");
        urls.put("/portal/gost/home/services/includereestsservice", "https://www.gosuslugi.ru/27156/1");
        urls.put("/portal/gost/home/services/infovoluntaryreestr", "https://www.gosuslugi.ru/27156/2");
        urls.put("/portal/gost/home/services/infofond", "https://www.gosuslugi.ru/29162/1/info");
        urls.put("/portal/gost/home/services/includereestrproduct", "https://www.gosuslugi.ru/17119/1/info");
        urls.put("/portal/gost/home/services/inforequirements", "https://www.gosuslugi.ru/39386/1/info");
        urls.put("/portal/gost/home/services/meansmeasuring", "https://www.gosuslugi.ru/39386/1/info");
        urls.put("/portal/gost/home/services/checkrequirements", "https://www.gosuslugi.ru/29096/1/info");
        urls.put("/portal/gost/home/services/meansmeasuring", "https://www.gosuslugi.ru/14119/1/info");
        urls.put("/portal/gost/home/services/infodocfond", "https://www.gosuslugi.ru/16581/1");
        urls.put("/portal/gost/home/services/standartforms", "https://www.gosuslugi.ru/11643/1/info");
        urls.put("/portal/gost/home/systems/standartizportal", "http://standard.gost.ru/wps/portal/");
        urls.put("/portal/gost/home/systems/katalogizportal", "http://cataloging.gostinfo.ru/");
        urls.put("/portal/gost/home/systems/expertsportal", "http://expert.gost.ru/RegistryExpPublic.nsf/MainForm?ReadForm");
        urls.put("/portal/gost/home/systems/infovtoportal", "http://wto.gost.ru/wps/portal/");
        urls.put("/portal/gost/home/systems/interstandartizportal", "http://iso.gost.ru/wps/portal/");
        urls.put("/portal/gost/home/systems/dangerproductportal", "http://sinatra-gost.ru/node/1");

        return urls;
    }
}
