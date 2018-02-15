<%@page session="false" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>
<portlet:defineObjects/>

<c:set var="cr" scope="request" value="${pageContext.request.contextPath}"/>

<link type="text/css" rel="stylesheet" href="${cr}/css/gost/main.css"/>

<script type="text/javascript">
    var headerConstants = {
        cr: '${cr}',
        adminsHeaders: {
            '${headerAppId}': '${headerAppIdValue}',
        },
    };
</script>
<header class="main-header">

    <c:choose>
        <c:when test="${currentTheme eq defaultTheme}">
        </c:when>
        <c:otherwise>
            <jsp:include page="spec-header.jsp"/>
        </c:otherwise>
    </c:choose>

    <jsp:include page="banner.jsp"/>
    <jsp:include page="menu.jsp"/>

</header>
