<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

    <base href="/">

    <spring:eval var="gtmEnvironment" expression="@environment.getProperty('kovadom.googletagmanager.environment')"/>


    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl + '<c:out value="${gtmEnvironment}" escapeXml="false"/>';
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-5KD6BPX');</script>
    <!-- End Google Tag Manager -->


    <title>Kovadom</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">

    <!-- favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="${urls.getForLookupPath('/resources/img/favicon/apple-touch-icon.png')}">
    <link rel="icon" type="image/png" href="${urls.getForLookupPath('/resources/img/favicon/favicon-32x32.png')}" sizes="32x32">
    <link rel="icon" type="image/png" href="${urls.getForLookupPath('/resources/img/favicon/favicon-16x16.png')}" sizes="16x16">
    <link rel="manifest" href="${urls.getForLookupPath('/resources/img/favicon/manifest.json')}">
    <link rel="mask-icon" href="${urls.getForLookupPath('/resources/img/favicon/safari-pinned-tab.svg')}" color="#5bbad5">
    <link rel="shortcut icon" href="${urls.getForLookupPath('/resources/img/favicon/favicon.ico')}">
    <meta name="msapplication-config" content="${urls.getForLookupPath('/resources/img/browserconfig.xml')}">
    <meta name="theme-color" content="#197e9e">

    <link rel="stylesheet" href="${urls.getForLookupPath('/resources/bootstrap/css/bootstrap.min.css')}"/>
    <link rel="stylesheet" href="${urls.getForLookupPath('/resources/generated/kovadom/kovadom.css')}"/>
    <link rel="stylesheet" href="${urls.getForLookupPath('/resources/generated/swiper/dist/css/swiper.min.css')}"/>
    <link rel="stylesheet" type="text/css" href="${urls.getForLookupPath('/resources/generated/primeng/resources/themes/omega/theme.css')}"/>
    <link rel="stylesheet" type="text/css" href="${urls.getForLookupPath('/resources/generated/primeng/resources/primeng.min.css')}"/>
    <link rel="stylesheet" type="text/css" href="${urls.getForLookupPath('/resources/generated/font-awesome/css/font-awesome.min.css')}"/>


    <!-- Polyfill(s) for older browsers -->
    <script src="${urls.getForLookupPath('/resources/generated/core-js/client/shim.min.js')}"></script>

    <script src="${urls.getForLookupPath('/resources/generated/zone.js/dist/zone.min.js')}"></script>
    <script src="${urls.getForLookupPath('/resources/generated/swiper/dist/js/swiper.min.js')}"></script>

    <script>window.module = {};</script>

</head>

<body>

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KD6BPX<c:out value="${gtmEnvironment}" escapeXml="false"/>"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<my-app>Kovadom is loading...</my-app>

</body>

<script src="${urls.getForLookupPath('/resources/generated/kovadom/build.js')}"></script>

</html>
