package com.digdes.rst.navigation.web.controller;

import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import com.digdes.rst.navigation.persistence.dto.ResponseDto;
import com.digdes.rst.navigation.persistence.services.UpdateRedirectService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@lombok.extern.log4j.Log4j
@Controller
@RequestMapping("/redirect")
public class UpdateRedirectController {

    @Autowired
    UpdateRedirectService updateRedirectService;

    @ApiOperation(value = "Обновление таблицы редиректов")
    @ResponseBody
    @RequestMapping(value = "/update.action", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDto save(@RequestParam String portal) throws Exception {
        try {
            updateRedirectService.update(portal);
            return new ResponseDto(true);
        }catch (Exception e){
            return new ResponseDto(false, e.getMessage());
        }
    }

}
