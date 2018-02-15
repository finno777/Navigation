package com.digdes.rst.navigation.web.controller;

import com.digdes.rst.navigation.persistence.beans.TimeBean;
import com.digdes.rst.navigation.persistence.services.NTPClient;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ntp.TimeStamp;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Author shushkov.r on 23.08.2017.
 */
@Slf4j
@org.springframework.web.bind.annotation.RestController
@RequestMapping("/commons")
public class TimeController {

    private static final String COOKIE_SESSION_ID = "JSESSIONID";
    @ApiOperation(value = "Текущее время")
    @RequestMapping(value = "/getTime.action", method = {RequestMethod.GET}, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public TimeBean time() {
        TimeBean timeBean = new TimeBean();
        //TimeStamp time = NTPClient.getTime(new ArrayList<>());
        Date date = new Date();
        TimeZone tz = Calendar.getInstance().getTimeZone();
       /* if(time == null){
            return null;
        }*/
        timeBean.setCurrentTime(date.getTime());
        timeBean.setTimeZone(tz.getID());
        return timeBean;
    }
    @ApiOperation(value = "SSO invalidation")
    @RequestMapping(value = "/logoutSSO.action", method = {RequestMethod.GET}, produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public ResponseEntity<String> logoutSSO(HttpServletRequest request, HttpServletResponse response) {

       /*Cookie[] cookies = request.getCookies();
        if(cookies!=null && cookies.length!=0){
            for(Cookie cookie:cookies){
                if(cookie.getName().equals(COOKIE_SESSION_ID)){
                    if(cookie.getPath()!=null && !cookie.getPath().equals("/portal")) {
                        cookie.setValue(null);
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                    }
                }else if(cookie.getName().equals(COOKIE_SESSION_ID+"SSO")){

                }
            }
        }
        Cookie cookie = new Cookie(COOKIE_SESSION_ID+"SSO","");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

         HttpSession httpSession = request.getSession(false);
        if(httpSession!=null){
            httpSession.invalidate();
        }*/
        try {
            request.logout();
        } catch (ServletException e) {
            log.debug(e.getMessage(),e);
        }
        return ResponseEntity.ok("Success");
    }
}
