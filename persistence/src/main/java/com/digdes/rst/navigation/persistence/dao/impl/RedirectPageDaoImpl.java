package com.digdes.rst.navigation.persistence.dao.impl;

import com.digdes.rst.navigation.persistence.dao.RedirectPageDao;
import com.digdes.rst.navigation.persistence.model.RedirectPage;
import org.springframework.stereotype.Repository;

@Repository
public class RedirectPageDaoImpl extends AbstractDaoImpl<RedirectPage, String> implements RedirectPageDao {
    public RedirectPageDaoImpl() {
        super(RedirectPage.class);
    }
}
