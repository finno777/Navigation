<%@page session="true" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>

<c:set var="cr" value="${pageContext.request.contextPath}"/>

<link type="text/css" rel="stylesheet" href="${cr}/css/gost/main.css"/>

<div class="site-map">
    <div class="site-map__inner js-site-map-box">
        <c:forEach var="page" items="${map}">
            <c:set var="page" value="${page}" scope="request" />
            <jsp:include page="page.jsp"/>
        </c:forEach>
    </div>
</div>

<script>
    var cr = "${cr}";
</script>

<script src='<c:url value="/js/gost/siteMap/siteMap.js"/>'></script>
