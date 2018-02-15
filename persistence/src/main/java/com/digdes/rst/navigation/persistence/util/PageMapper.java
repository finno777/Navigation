package com.digdes.rst.navigation.persistence.util;

import com.digdes.rst.navigation.persistence.model.Page;
import org.exoplatform.portal.mop.Described;
import org.exoplatform.portal.mop.description.DescriptionService;
import org.exoplatform.portal.mop.page.PageContext;
import org.exoplatform.portal.mop.page.PageKey;
import org.exoplatform.portal.mop.page.PageService;
import org.exoplatform.portal.mop.page.PageState;
import org.exoplatform.portal.mop.user.UserNode;
import org.gatein.mop.api.workspace.Navigation;
import org.gatein.mop.api.workspace.link.PageLink;
import org.hibernate.cache.NoCacheRegionFactoryAvailableException;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class PageMapper {

    public static Page mapPage(Navigation navigation, String label, String redirectURI) {
        Page myPage = null;
        if (navigation.getLink() != null) {
            org.gatein.mop.api.workspace.Page page = ((PageLink) navigation.getLink()).getPage();

            if (page != null) {
                if (label == null) label = page.getName();
                String url = redirectURI != null ? redirectURI : buildUri(navigation);
                myPage = new Page(navigation.getObjectId(), url, navigation.getName(), label);
                myPage.setInternal(true);
            }
        }
        return myPage;
    }

    public static String buildUri(Navigation navigation) {
        String uri = navigation.getSite().getName();
        List<String> path = pathNode(navigation);
        for (int i = path.size() - 3; i >= 0; i--) {
            uri += "/" + path.get(i);
        }
        return "/portal/" + uri;
    }

    private static List<String> pathNode(Navigation navigation) {
        List<String> path = new ArrayList<>();
        while (navigation != null) {
            path.add(navigation.getName());
            navigation = navigation.getParent();
        }
        return path;
    }





    private static String getDisplayName(UserNode node, PageService pageService) {
        String displayName = node.getEncodedResolvedLabel();
        String pageId = getPageRef(node);
        if (pageId != null) {
            PageKey sourceKey = PageKey.parse(pageId);
            PageContext page = pageService.loadPage(sourceKey);
            displayName = page.getState().getDisplayName();
        }
        return displayName;
    }


    private static String getLabel(UserNode node, DescriptionService descriptionService, PageService pageService) {
        String label = null;

        Described.State de = descriptionService.getDescription(node.getId(), new Locale("ru"));
        if (de != null) {
            label = de.getName();
        }

        if (label == null || label.trim().isEmpty()) {
            label = getDisplayName(node, pageService);
        }

        return label;
    }

    private static String getPageRef(UserNode node) {
        return node.getPageRef() != null ? node.getPageRef().format() : null;
    }
}
