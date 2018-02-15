<%@page session="false" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<portlet:defineObjects/>

<c:set var="cr" scope="request" value="${pageContext.request.contextPath}"/>

<link type="text/css" rel="stylesheet" href="${cr}/css/gost/main.css"/>
<c:if test="${fn:contains(roles, 'ALL') || fn:contains(roles, 'MANAGER')}">
    <script type="text/javascript">
        cr = '${cr}';

        sideNav${replaceAppId} = {
            adminsHeaders: {
                '${headerAppId}': '${headerAppIdValue}',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            nodeId: "${app.nodeId}",
            appId: "${app.appId}",
            id: 4,
            dialogs: null,
            api: null,
            images: [{
                title: 'Test2',
                src: '${cr}/images/sideNav/ModeSecret.png',
            }],
        };
    </script>
</c:if>

<div class="side-nav <c:if test="${app.state == 'SIDE'}">side-nav--small</c:if>" data-appId="${replaceAppId}">
    <div class="side-nav__header">
        <h1>${app.displayName}</h1>
        <c:if test="${fn:contains(roles, 'ALL') || fn:contains(roles, 'MANAGER')}">
            <button class="button button--icon button--rotate side-nav__settings-button js-open-settings"
                    data-title="Настройка портлета">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                         xlink:href="${cr}/sprite/sprite.svg#sideNav--settings"></use>
                </svg>
            </button>
            <div id="sideNavConfirm" class="js-sideNavConfirm" style="display: none;"></div>
            <div id="sideNavAddGroup" class="js-sideNavAddGroup" style="display: none;">
                <div class="input-section" style="display: none;">
                    <div class="toggler__wrap">
                        <div class="toggler">
                            <button class="toggler__button button"
                                    data-toggler-selected_idx="0">Рус</button>
                            <div class="toggler__menu">
                                <ul class="toggler__list">
                                    <li class="toggler__item toggler__item--current">
                                        <span>Рус</span>
                                    </li>
                                    <li class="toggler__item">
                                        <span>Eng</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                    <label for="groupName-${replaceAppId}" class="input-section__label">Название</label>
                    <div class="gost-form__value"
                         data-prop-name="name"
                         data-required
                         data-max-length="128"
                    >
                        <input id="groupName-${replaceAppId}" class="textbox js-groupName" type="text" value="">
                    </div>
                </div>
                <div class="input-section">
                    <label class="input-section__label">Ссылки</label>
                    <div class="add-group__links">
                        <ul class="add-group__links-container">

                        </ul>
                    </div>
                </div>
            </div>
            <div id="sideNavAddExternalPage" class="js-sideNavAddExternalPage" style="display: none;">
                <div class="input-section" style="display: none;">
                    <div class="toggler__wrap">
                        <div class="toggler">
                            <button class="toggler__button button"
                                    data-toggler-selected_idx="0">Рус</button>
                            <div class="toggler__menu">
                                <ul class="toggler__list">
                                    <li class="toggler__item toggler__item--current">
                                        <span>Рус</span>
                                    </li>
                                    <li class="toggler__item">
                                        <span>Eng</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                    <label for="pageLink-${replaceAppId}" class="input-section__label">Ссылка на страницу</label>
                    <div class="gost-form__value"
                         data-prop-name="uri"
                         data-required
                         data-max-length="1024"
                         data-pattern="uri"
                    >
                        <input id="pageLink-${replaceAppId}" class="textbox js-pageLink" type="text" value="">
                    </div>
                </div>
                <div class="input-section">
                    <label for="pageName-${replaceAppId}" class="input-section__label">Название</label>
                    <div class="gost-form__value"
                         data-prop-name="displayName"
                         data-required
                         data-max-length="128"
                    >
                        <input id="pageName-${replaceAppId}" class="textbox js-pageName" type="text" value="">
                    </div>
                </div>
                <div class="input-section">
                    <label for="pageDescription-${replaceAppId}" class="input-section__label">Описание</label>
                    <div class="gost-form__value"
                         data-prop-name="description"
                         data-max-length="256"
                    >
                    <textarea id="pageDescription-${replaceAppId}" class="textarea js-pageDescription"
                              type="text"></textarea>
                    </div>
                </div>
            </div>
            <div id="sideNavAddInternalPage" class="js-sideNavAddInternalPage" style="display: none;">
                <div class="input-section" style="display: none;">
                    <div class="toggler__wrap">
                        <div class="toggler">
                            <button class="toggler__button button"
                                    data-toggler-selected_idx="0">Рус</button>
                            <div class="toggler__menu">
                                <ul class="toggler__list">
                                    <li class="toggler__item toggler__item--current">
                                        <span>Рус</span>
                                    </li>
                                    <li class="toggler__item">
                                        <span>Eng</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                    <label class="input-section__label">Ссылка на страницу</label>
                    <div class="gost-form__value"
                         data-prop-name="uri"
                         data-required
                    >
                        <div class="dropdown dropdown--inline js-pageSelect">
                            <button class="dropdown__button textbox">*Выбор из страниц карты сайта*
                            </button>
                            <div class="dropdown__menu">
                                <input type="text" class="textbox" placeholder="Поиск"/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                    <label for="internalPageName-${replaceAppId}" class="input-section__label">Название</label>
                    <div class="gost-form__value"
                         data-prop-name="displayName"
                         data-required
                         data-max-length="128"
                    >
                        <input id="internalPageName-${replaceAppId}" class="textbox js-internalPageName" type="text"
                               value="">
                    </div>
                </div>
                <div class="input-section">
                    <label for="internalPageDescription-${replaceAppId}" class="input-section__label">Описание</label>
                    <div class="gost-form__value"
                         data-prop-name="description"
                         data-max-length="256"
                    >
                    <textarea id="internalPageDescription-${replaceAppId}"
                              class="textarea js-internalPageDescription"></textarea>
                    </div>
                </div>
                <div class="input-section">
                    <label for="internalPageImg" class="input-section__label">Иконка</label>
                    <div class="icon-selector__wrap">
                        <img id="internalPageImg" class="js-internalPageImg"/>
                        <div class="icon-selector__img-empty"></div>
                    </div>
                    <button id="imagesSelect-${replaceAppId}" class="js-imagesSelect link link--add">Выбрать иконку
                    </button>
                </div>
            </div>
            <div id="sideNavSettings" class="js-sideNavSettings" style="display: none;">
                <div class="input-section" style="display: none;">
                    <div class="toggler__wrap">
                        <div class="toggler">
                            <button class="toggler__button button"
                                    data-toggler-selected_idx="0">Рус</button>
                            <div class="toggler__menu">
                                <ul class="toggler__list">
                                    <li class="toggler__item toggler__item--current">
                                        <span>Рус</span>
                                    </li>
                                    <li class="toggler__item">
                                        <span>Eng</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                    <label for="portletName-${replaceAppId}" class="input-section__label">Название портлета</label>
                    <div class="gost-form__value"
                         data-prop-name="displayName"
                         data-required
                         data-max-length="128"
                    >
                        <input id="portletName-${replaceAppId}" class="textbox js-portletName" type="text"
                               value="${app.displayName}">
                    </div>
                </div>
                <div class="input-section">
                    <label for="portletDescription-${replaceAppId}" class="input-section__label">Описание</label>
                    <div class="gost-form__value"
                         data-prop-name="description"
                         data-max-length="1024"
                    >
                        <textarea id="portletDescription-${replaceAppId}"
                                  class="textarea js-portletDescription">${app.description}</textarea>
                    </div>
                </div>
                <div class="input-section">
                    <label for="pagesToShow-${replaceAppId}" class="input-section__label">Отображать</label>
                    <select id="pagesToShow-${replaceAppId}" class="js-pagesToShow">
                        <option value="CUSTOM" <c:if test="${app.contentType == 'CUSTOM'}">selected</c:if>>Выбранные
                            страницы
                        </option>
                        <option value="CHILD" <c:if test="${app.contentType == 'CHILD'}">selected</c:if>>Дочерние
                            страницы
                        </option>
                        <option value="SIBLING" <c:if test="${app.contentType == 'SIBLING'}">selected</c:if>>
                            Параллельные страницы
                        </option>
                    </select>
                </div>
                <div class="input-section">
                    <label class="input-section__label">Стиль портлета</label>
                    <div class="radiobutton-list">
                        <div class="radiobutton-list__item">
                            <input type="radio" name="portlet-type-${replaceAppId}" id="portlet-type-full-${replaceAppId}"
                                   value="FULL"
                                   <c:if test="${app.state == 'FULL'}">checked</c:if> class="radiobutton js-portletType">
                            <label for="portlet-type-full-${replaceAppId}">Основной контент</label>
                        </div>
                        <div class="radiobutton-list__item">
                            <input type="radio" name="portlet-type-${replaceAppId}" id="portlet-type-side-${replaceAppId}"
                                   value="SIDE"
                                   <c:if test="${app.state == 'SIDE'}">checked</c:if> class="radiobutton js-portletType">
                            <label for="portlet-type-side-${replaceAppId}">Вспомогательный (боковой) контент</label>
                        </div>
                    </div>
                </div>
                <div class="input-section">
                </div>
                <div class="links-settings">
                    <div class="toggler__wrap">
                        <div class="toggler">
                            <button class="toggler__button button"
                                    data-toggler-selected_idx="0">Ссылки</button>
                            <div class="toggler__menu">
                                <ul class="toggler__list">
                                    <li class="toggler__item toggler__item--current"
                                        data-content-area="links">
                                        <span>Ссылки</span>
                                    </li>
                                    <li class="toggler__item"
                                        data-content-area="groups">
                                        <span>Группы</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown dropdown--inline js-addLink" id="addLink">
                        <button class="dropdown__button button button--primary button--plus">Добавить ссылку</button>
                        <div class="dropdown__menu">
                            <ul class="dropdown__list">
                                <li class="dropdown__item">
                                    <a href="javascript:void(0)" class="js-add-external-page"
                                       data-title="Добавление внешней ссылки">Внешнюю ссылку</a>
                                </li>
                                <li class="dropdown__item">
                                    <a href="javascript:void(0)" class="js-add-internal-page"
                                       data-title="Добавление портальной ссылки">Портальную ссылку</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button id="addGroup" style="display: none;" class="button button--primary button--plus js-addGroup"
                            data-title="Добавление группы">Добавить группу
                    </button>
                </div>
                <div class="input-section js-sideNavSettingsLinks">
                    <div class="side-nav side-nav--settings">
                        <ul class="side-nav__groups">

                        </ul>
                    </div>
                </div>
                <div class="input-section js-sideNavSettingsGroups" style="display: none;">
                    <div class="navigation-group-table">
                        <ul class="navigation-group-table__list"></ul>
                    </div>
                </div>
            </div>
        </c:if>
    </div>
    <ul class="side-nav__groups">
        <li class="side-nav__group side-nav__group--active">
            <ul class="side-nav__pages">
                <c:forEach var="page" items="${pagesWithoutGroup}">
                    <li>
                        <a href="${page.uri}">
                            <div class="side-nav__page-img">
                                <c:choose>
                                    <c:when test="${page.image != null && app.state == 'FULL'}">
                                        <c:catch var="e">
                                            <c:import url="http://localhost${page.image}"/>
                                        </c:catch>
                                        <c:if test="${!empty e}">
                                            <div class="side-nav__page-img-empty"></div>
                                            <span style="display: none;">${e}</span>
                                        </c:if>
                                    </c:when>
                                    <c:when test="${app.state == 'FULL'}">
                                        <div class="side-nav__page-img-empty"></div>
                                    </c:when>
                                </c:choose>
                            </div>
                            <div>
                                <p class="side-nav__page-title <c:if test="${!page.internal}">side-nav__page-title--external</c:if>">${page.displayName}</p>
                                <p class="side-nav__page-description">${page.description}</p>
                            </div>
                        </a>
                    </li>
                </c:forEach>
            </ul>
        </li>

        <c:forEach var="group" items="${groupPagesWithPages}">
            <li class="side-nav__group">
                <h3 class="side-nav__group-title">${group.name}</h3>
                <span class="link side-nav__group-show"
                      onclick="this.parentElement.classList.add('side-nav__group--active')">
                        Показать<svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                 xlink:href="${cr}/sprite/sprite.svg#sideNav--arrow_down"></use>
                        </svg>
                </span>
                <span class="link side-nav__group-hide"
                      onclick="this.parentElement.classList.remove('side-nav__group--active')">
                        Скрыть<svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                 xlink:href="${cr}/sprite/sprite.svg#sideNav--arrow_down"></use>
                        </svg>
                </span>
                <ul class="side-nav__pages">
                    <c:forEach var="page" items="${group.pages}">
                        <li>
                            <a href="${page.uri}">
                                <div class="side-nav__page-img">
                                    <c:choose>
                                        <c:when test="${page.image != null && app.state == 'FULL'}">
                                            <c:catch var="e">
                                                <c:import url="http://localhost${page.image}"/>
                                            </c:catch>
                                            <c:if test="${!empty e}">
                                                <div class="side-nav__page-img-empty"></div>
                                                <span style="display: none;">${e}</span>
                                            </c:if>
                                        </c:when>
                                        <c:when test="${app.state == 'FULL'}">
                                            <div class="side-nav__page-img-empty"></div>
                                        </c:when>
                                    </c:choose>
                                </div>
                                <div>
                                    <p class="side-nav__page-title <c:if test="${!page.internal}">side-nav__page-title--external</c:if>">${page.displayName}</p>
                                    <p class="side-nav__page-description">${page.description}</p>
                                </div>
                            </a>
                        </li>
                    </c:forEach>
                </ul>
            </li>
        </c:forEach>
    </ul>
</div>
