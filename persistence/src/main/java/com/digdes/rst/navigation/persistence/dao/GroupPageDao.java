package com.digdes.rst.navigation.persistence.dao;

import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;

import java.util.List;

public interface GroupPageDao extends AbstractDao<GroupPage, Long> {

    String DELETE_GROUPPAGE = "DELETE FROM grouppage WHERE application_id= :appId";

    List<GroupPage> findGroupPageByApplication(Application application);

    void deleteAllByApp(Application application);
}
