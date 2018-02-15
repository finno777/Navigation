<%@page session="false" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>
<portlet:defineObjects/>

<portlet:actionURL name="changeLanguage" var="urlChangeLanguage" escapeXml="false">
    <portlet:param name="action" value="changeLanguage"/>
</portlet:actionURL>

<portlet:actionURL name="changeSkinVisually" var="urlChangeSkin" escapeXml="false">
    <portlet:param name="action" value="changeSkinVisually"/>
</portlet:actionURL>
<script type="text/javascript">
    var navUriChangeTheme = '${urlChangeSkin}';
</script>
<%--<div style="max-width: 100px; color: green;">--%>
<%--<svg class="icon icon-4">--%>
<%--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${cr}/sprite/sprite.svg#f_blind"></use>--%>
<%--</svg>--%>
<%--</div>--%>
<div class="main-banner__wrap">
    <div class="container">
        <div class="main-banner">
            <div class="hamburger">
                <svg class="hamburger__icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 17h18v-2H2v2zm0-5h18v-2H2v2zm0-7v2h18V5H2z"/>
                </svg>
            </div>

            <div class="logo--wrap">
                <a href="/portal/gost/" class="logo">
                    <c:choose>
                        <c:when test="${currentTheme eq defaultTheme}">
                            <img src="${cr}/images/header/gerb.png" alt="Логотип Росстандарта" class="logo__image"/>
                        </c:when>
                        <c:otherwise>
                            <img src="${cr}/images/header/gerb_for_blind.png" alt="Логотип Росстандарта"
                                 class="logo__image"/>
                        </c:otherwise>
                    </c:choose>
                    <div class="logo__text">
                        <div class="logo__title">Росстандарт</div>
                        <div class="logo__description">
                            Федеральное агентство по техническому регулированию и метрологии
                        </div>
                    </div>
                </a>
            </div>

            <c:choose>
                <c:when test="${currentTheme eq defaultTheme}">

                    <div class="datetime uninitialized">
                        <div class="datetime__calendar">
                            <div data-clock="date" class="datetime__day">29 сентября 2017</div>
                            <div data-clock="dayOfWeek" class="datetime__day-of-week">Вторник</div>
                        </div>
                        <div class="datetime__clock">
                            <span data-clock="h">99</span>
                            <span class="separator">:</span>
                            <span data-clock="m">99</span>
                            <span class="separator">:</span>
                            <span data-clock="s">99</span>
                            <span class="separator">,</span>
                            <span data-clock="ms">999</span>
                        </div>
                        <div class="datetime__timezone">Московское время</div>
                    </div>


                    <div class="actions">

                        <div class="actions__locale" tabindex="0">
                            <div class="dropdown">
                                <div class="dropdown__button button">
                                    <c:forEach items="${locales}" var="locale">
                                        <c:choose>
                                            <c:when test="${locale.selected}">
                                                <span class="locale">${locale.displayName}</span>
                                            </c:when>
                                        </c:choose>
                                    </c:forEach>
                                </div>
                                <div class="dropdown__menu">
                                    <ul class="dropdown__list">
                                        <c:forEach items="${locales}" var="locale">
                                            <c:choose>
                                                <c:when test="${locale.selected}">
                                                </c:when>
                                                <c:when test="${locale.lang == 'en'}">
                                                    <li class="dropdown__item">
                                                        <a href="http://old.gost.ru/wps/portal/en">
                                                                ${locale.displayName}
                                                        </a>
                                                    </li>
                                                </c:when>
                                                <c:otherwise>
                                                    <li class="dropdown__item">
                                                        <a href="${urlChangeLanguage}&lang=${locale.lang}">
                                                                ${locale.displayName}
                                                        </a>
                                                    </li>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="actions__search" tabindex="0">
                            <a href="javascript:void(0)" class="button button--icon js-head-search-btn" role="button">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                         xlink:href="${cr}/sprite/sprite.svg#header--search"></use>
                                </svg>
                            </a>
                        </div>

                        <div class="actions__accessibility" tabindex="0">
                            <a href="${urlChangeSkin}&theme=low-black-show-ptsans-lsZero" class="button button--icon">
                                <div class="actions__accessibility-wrapper">Версия для слабовидящих</div>
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                         xlink:href="${cr}/sprite/sprite.svg#header--glasses"></use>
                                </svg>
                            </a>
                        </div>
                        <div class="actions__login" tabindex="0">
                            <c:choose>
                                <c:when test="${empty currentUser}">
                                    <a href="/portal/login" class="button button--icon">
                                        <img src="${cr}/images/header/login.png" alt="have not alt"/>
                                    </a>
                                </c:when>

                                <c:otherwise>
                                    <div class="dropdown dropdown--icon">
                                        <div class="dropdown__button button button--icon">
                                            <svg>
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                     xlink:href="${cr}/sprite/sprite.svg#header--profile"></use>
                                            </svg>
                                        </div>
                                        <div class="dropdown__menu">
                                            <ul class="dropdown__list">
                                                <li class="dropdown__item">
                                                    <a href="/portal/gost/personal">Личный кабинет</a>
                                                </li>
                                                <li class="dropdown__item">
                                                    <a id="logout" class="danger" href="#" title="Sign Out">Выйти</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </div>

                </c:when>

                <%-- Версия для слабовидящих --%>


                <c:otherwise>
                    <div class='spec-banner'>
                        <div class="spec-banner__top">
                            <div class="dropdown dropdown_spec">
                                <div class="dropdown__button button">
                                    <c:forEach items="${locales}" var="locale">
                                        <c:choose>
                                            <c:when test="${locale.selected}">
                                                <span class="locale">${locale.displayName}</span>
                                            </c:when>
                                        </c:choose>
                                    </c:forEach>
                                </div>
                                <div class="dropdown__menu">
                                    <ul class="dropdown__list">
                                        <c:forEach items="${locales}" var="locale">
                                            <c:choose>
                                                <c:when test="${locale.selected}">
                                                </c:when>
                                                <c:when test="${locale.lang == 'en'}">
                                                    <li class="dropdown__item">
                                                        <a href="http://old.gost.ru/wps/portal/en">${locale.displayName}</a>
                                                    </li>
                                                </c:when>
                                                <c:otherwise>
                                                    <li class="dropdown__item">
                                                        <a href="${urlChangeLanguage}&lang=${locale.lang}">${locale.displayName}</a>
                                                    </li>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </ul>
                                </div>
                            </div>

                            <c:choose>
                                <c:when test="${empty currentUser}">
                                    <a href="/portal/login" class="spec-banner__cab">Войти в личный кабинет</a>
                                </c:when>

                                <c:otherwise>
                                    <a href="/portal/gost/personal" class="spec-banner__cab">Личный кабинет</a>
                                    <a id="logout" href="#" class="spec-banner__cab spec-banner__cab_exit">Выйти</a>
                                </c:otherwise>
                            </c:choose>

                        </div>

                        <div class="spec-banner__bottom">
                            <form action="/portal/gost/search" method="get" class="header-search__form">

                                <input name="query" type='text' placeholder='Поиск по сайту'
                                       class="spec-banner__search-input">
                                <button type="submit" class="spec-banner__search-submit">Найти</button>
                            </form>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>

        </div>
    </div>

    <div class="header-search">
        <div class="container">
            <form action="/portal/gost/search" method="get" class="header-search__form" role="search">
                <div class="header-search__inner">
                    <div class="header-search__field">
                        <input name="query" type="text" class="header-search__input textbox js-head-search-input"
                               placeholder="Поиск">
                        <button class="_btn" type="submit">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                     xlink:href="${cr}/sprite/sprite.svg#header--search"></use>
                            </svg>
                        </button>
                    </div>

                    <div class="header-search__action">
                        <button class="button button--icon button--rotate js-head-search-close" type="reset">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                     xlink:href="${cr}/sprite/sprite.svg#header--close"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<%--<script src="${cr}/js/gost/svgForEverybody.js"></script>--%>
