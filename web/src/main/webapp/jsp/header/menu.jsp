<%@page session="false" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>
<portlet:defineObjects/>
<portlet:actionURL name="changeSkinVisually" var="urlChangeSkin" escapeXml="false">
    <portlet:param name="action" value="changeSkinVisually"/>
</portlet:actionURL>
<script type="text/javascript">
    var navUriChangeTheme = '${urlChangeSkin}';
    var currentTheme = '${currentTheme}';
</script>

<c:choose>
    <c:when test="${currentTheme eq defaultTheme}">
    </c:when>
    <c:otherwise>

    </c:otherwise>
</c:choose>

<div class="nav-menu__wrap">
    <nav class="container">
        <ul class="nav-menu">
            <li class="nav-menu__item nav-menu__logo">
                <a href="/portal/gost/" class="button button--icon">
                    <img src="${cr}/images/header/gerb.png" alt="Логотип Росстандарта"/>
                </a>
            </li>
            <c:forEach var="page" items="${pages}" varStatus="loop">
                <c:set var="activeClassName" value="${page.selected ? 'nav-menu__item--active' : ''}"/>
                <c:set var="hasDropdownClassName" value="${page.selected ? 'nav-menu__item--active' : ''}"/>
                <li class="nav-menu__item ${activeClassName}">
                    <c:choose>
                        <c:when test="${page.uri == '/portal/gost//home/activity'}">
                            <a href="${page.uri}">${page.displayName}</a>
                            <div class="nav-menu__dropdown-container">
                                <div class="container">
                                    <c:if test="${not empty page.children}">
                                        <div class="nav-menu__dropdown-wrap">
                                            <div class="nav-menu__dropdown-inner">
                                                <ul class="nav-menu__dropdown-list">
                                                    <c:forEach end="8" var="pageSecondLevel" items="${page.children}"
                                                               varStatus="loopSecondLevel">
                                                        <c:set var="activeClassName"
                                                               value="${pageSecondLevel.selected ? 'top-nav-active' : ''}"/>
                                                        <li class="nav-menu__dropdown-item ${activeClassName}">
                                                            <a href="${pageSecondLevel.uri}">${pageSecondLevel.displayName}</a>
                                                        </li>
                                                    </c:forEach>
                                                </ul>

                                                <div class="nav-menu__dropdown-title">Направления</div>

                                                <ul class="nav-menu__dropdown-list">
                                                    <c:forEach begin="9" var="pageSecondLevel" items="${page.children}"
                                                               varStatus="loopSecondLevel">
                                                        <c:set var="activeClassName"
                                                               value="${pageSecondLevel.selected ? 'top-nav-active' : ''}"/>
                                                        <li class="nav-menu__dropdown-item ${activeClassName}">
                                                            <a href="${pageSecondLevel.uri}">${pageSecondLevel.displayName}</a>
                                                        </li>
                                                    </c:forEach>
                                                </ul>
                                            </div>
                                            <div class="nav-menu__img"
                                                 style="background-image: url(${cr}/images/header/topMenuBackgrounds/${page.name}.png)"></div>
                                        </div>
                                    </c:if>
                                </div>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <a href="${page.uri}">${page.displayName}</a>
                            <div class="nav-menu__dropdown-container">
                                <div class="container">
                                    <c:if test="${not empty page.children}">
                                        <div class="nav-menu__dropdown-wrap">
                                            <ul class="nav-menu__dropdown-list">
                                                <c:forEach var="pageSecondLevel" items="${page.children}"
                                                           varStatus="loopSecondLevel">
                                                    <c:set var="activeClassName"
                                                           value="${pageSecondLevel.selected ? 'top-nav-active' : ''}"/>
                                                    <li class="nav-menu__dropdown-item ${activeClassName}">
                                                        <a href="${pageSecondLevel.uri}">${pageSecondLevel.displayName}</a>
                                                    </li>
                                                </c:forEach>
                                            </ul>
                                            <div class="nav-menu__img"
                                                 style="background-image: url(${cr}/images/header/topMenuBackgrounds/${page.name}.png)"></div>
                                        </div>
                                    </c:if>
                                </div>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </li>
            </c:forEach>
            <li class="nav-menu__item nav-menu__search">
                <a href="javascript:void(0)" class="button button--icon js-head-search-btn" role="button">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink"
                             xlink:href="${cr}/sprite/sprite.svg#header--search"></use>
                    </svg>
                </a>
            </li>
        </ul>
        <ul class="mobile-actions">
            <li class="actions__search">
                <a href="/portal/gost/search">
                    <span class="button button--icon">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                 xlink:href="${cr}/sprite/sprite.svg#header--search"></use>
                        </svg>
                    </span>
                    Поиск по сайту
                </a>
            </li>
            <li class="actions__locale">
                <c:forEach items="${locales}" var="locale">
                    <c:choose>
                        <c:when test="${locale.selected}">
                            <c:set var="currentLocale" value="${locale.lang}"/>
                        </c:when>
                    </c:choose>
                </c:forEach>

                <portlet:actionURL name="changeLanguage" var="urlChangeLanguage" escapeXml="false">
                    <portlet:param name="action" value="changeLanguage"/>
                </portlet:actionURL>

                <c:choose>
                    <c:when test="${currentLocale == 'en'}">
                        <a href="${urlChangeLanguage}&lang=en">
                        <span class="button button--icon">
                        <img src="${cr}/images/header/lang_ru.png" alt="Русская версия">
                        </span>Русская версия
                        </a>
                    </c:when>
                    <c:otherwise>
                        <a href="${urlChangeLanguage}&lang=ru">
                        <span class="button button--icon">
                        <img src="${cr}/images/header/lang_en.png" alt="English version">
                        </span>English version
                        </a>
                    </c:otherwise>
                </c:choose>
            </li>
        </ul>
    </nav>
</div>
