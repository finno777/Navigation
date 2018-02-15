<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="cr" scope="request" value="${pageContext.request.contextPath}"/>

<c:if test = "${currentPage.name != 'home'}">
  <div class="container">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__wrapper">
        <a class="breadcrumbs__item breadcrumbs__item--home" href="/">
          Главная
          <svg class="breadcrumbs__svg--home" width="14" height="14">
            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#breadcrumbs--breadcrumbs_home"></use>
          </svg>
        </a>
        <svg width='14' height='14' class="breadcrumbs__svg--arrow">
          <use xmlns:xlink="http://www.w3.org/1999/xlink"
               xlink:href="${cr}/sprite/sprite.svg#breadcrumbs--breadcrumbs_arrow"></use>
        </svg>
      </li>
      <c:forEach var="breadcrumb" items="${breadcrumbs}">
        <c:if test = "${breadcrumb.displayName.length() > 0}">
          <li class="breadcrumbs__wrapper">
            <a class="breadcrumbs__item" href="${breadcrumb.uri}">${breadcrumb.displayName}</a>
            <svg width='14' height='14' class="breadcrumbs__svg--arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="${cr}/sprite/sprite.svg#breadcrumbs--breadcrumbs_arrow"></use>
            </svg>
          </li>
        </c:if>
      </c:forEach>
    </ul>
  </div>
</c:if>
