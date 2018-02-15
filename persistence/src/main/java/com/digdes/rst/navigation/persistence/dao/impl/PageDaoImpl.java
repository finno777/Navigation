package com.digdes.rst.navigation.persistence.dao.impl;

import com.digdes.rst.navigation.persistence.dao.PageDao;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public class PageDaoImpl extends AbstractDaoImpl<Page, Long> implements PageDao {

    public PageDaoImpl() {
        super(Page.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Page> findPagesByApp(Application application) {
        Criteria criteria = getCurrentSession().createCriteria(Page.class);
        criteria.add(Restrictions.eq("application", application));
        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Page> findPagesWithoutGroupByApp(Application application) {
        Criteria criteria = getCurrentSession().createCriteria(Page.class);
        criteria.add(Restrictions.eq("application", application));
        criteria.add(Restrictions.isNull("groupPage"));
        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Page> findPagesByGroup(GroupPage groupPage) {
        Criteria criteria = getCurrentSession().createCriteria(Page.class);
        criteria.add(Restrictions.eq("groupPage", groupPage));
        return criteria.list();
    }

    @Override
    public void deleteAllByApp(Long appId) {
        Query query = getCurrentSession().createSQLQuery(DELETE_PAGE)
                .setParameter("appId", appId);
        query.executeUpdate();
    }

    @Override
    public void deletePagesByGroup(GroupPage groupPage) {

        Query query = getCurrentSession().createSQLQuery(DELETE_PAGE_GROUP)
                .setParameter("groupId", groupPage.getId());
        query.executeUpdate();
    }
}
