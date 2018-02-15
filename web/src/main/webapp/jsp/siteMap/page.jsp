<%@page session="true" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>


<div class="section-title <c:if test="${not empty  page.pages}">js-map-acco</c:if>">
    <c:if test="${not empty page.pages}">
        <div class="_icon js-map-acco-btn"></div>
    </c:if>
    <a href="${page.uri}" class="_link">${page.displayName}</a>

    <div class="section-inner">
        <c:if test="${not empty page.pages}">
            <c:forEach var="child" items="${page.pages}">
                <c:set var="page" value="${child}" scope="request" />
                <jsp:include page="page.jsp"/>
            </c:forEach>
        </c:if>
    </div>
</div>


