package com.digdes.rst.navigation.persistence.dao;

import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;

import java.util.List;

public interface PageDao extends AbstractDao<Page, Long> {
    String DELETE_PAGE = "DELETE from page WHERE application_id = :appId ";

    String DELETE_PAGE_GROUP = "DELETE from page WHERE grouppage_id = :groupId ";

    List<Page> findPagesByApp(Application application);

    List<Page> findPagesWithoutGroupByApp(Application application);

    void deleteAllByApp(Long appId);

    List<Page> findPagesByGroup(GroupPage groupPage);

    void deletePagesByGroup(GroupPage groupPage);
}
