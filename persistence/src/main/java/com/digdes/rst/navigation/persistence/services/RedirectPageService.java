package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dao.RedirectPageDao;
import com.digdes.rst.navigation.persistence.model.RedirectPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RedirectPageService {
    @Autowired
    private RedirectPageDao redirectPageDao;

    public Map<String, String> getAll(){
        return redirectPageDao.findAll().stream().collect(Collectors.toMap(RedirectPage::getNodeUrl, RedirectPage::getRedirectUrl));
    }

    public void save(RedirectPage redirectPage){
        redirectPageDao.saveOrUpdate(redirectPage);
    }
}
