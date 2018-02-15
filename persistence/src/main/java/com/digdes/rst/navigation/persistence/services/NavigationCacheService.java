package com.digdes.rst.navigation.persistence.services;

import com.digdes.rst.navigation.persistence.dto.NavigationDto;
import lombok.extern.log4j.Log4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Log4j
@Service
public class NavigationCacheService {
    public static ConcurrentHashMap<String, NavigationDto> navigationCache = new ConcurrentHashMap<>();

}
