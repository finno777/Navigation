package com.digdes.rst.navigation.persistence.dao.impl;

import com.digdes.rst.navigation.persistence.dao.GroupPageDao;
import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class GroupPageDaoImpl extends AbstractDaoImpl<GroupPage, Long> implements GroupPageDao {

    public GroupPageDaoImpl() {
        super(GroupPage.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<GroupPage> findGroupPageByApplication(Application application) {
        Criteria criteria = getCurrentSession().createCriteria(GroupPage.class);
        criteria.add(Restrictions.eq("application", application));
        return criteria.list();
    }

    @Override
    public void deleteAllByApp(Application application) {
        Query query = getCurrentSession().createSQLQuery(DELETE_GROUPPAGE)
                .setParameter("appId", application);
        query.executeUpdate();
    }
}
