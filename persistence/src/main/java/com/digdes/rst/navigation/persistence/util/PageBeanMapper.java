package com.digdes.rst.navigation.persistence.util;

import com.digdes.rst.navigation.persistence.model.PageBean;
import org.exoplatform.portal.mop.user.UserNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Author shushkov.r on 05.07.2017.
 */
public class PageBeanMapper {


    public static String buildUri(String portalURI, UserNode node) {
        String uri = portalURI;
        List<String> path = pathNode(node);
        for (int i = path.size() - 2; i >= 0; i--) {
            uri += "/" + path.get(i);
        }
        return uri;
    }

    private static List<String> pathNode(UserNode node) {
        List<String> path = new ArrayList<>();
        while (node != null) {
            path.add(node.getName());
            node = node.getParent();
        }
        return path;
    }

    public static PageBean map1(UserNode userNode, String portalURI, String redirectURI) {
        PageBean pageBean = new PageBean();
        pageBean.setDisplayName(userNode.getEncodedResolvedLabel());
        pageBean.setUri(userNode.getURI());
        pageBean.setUniqueId(userNode.getId());
        pageBean.setName(userNode.getName());
        pageBean.setUri(redirectURI != null ? redirectURI : buildUri(portalURI, userNode));
        return pageBean;
    }
}
