package com.digdes.rst.navigation.persistence.beans;

import lombok.Data;

/**
 * Author shushkov.r on 10.07.2017.
 */
@Data
public class LocaleBean {
    private String key;
    private String name;
    private String lang;
    private String displayName;
    private boolean selected;
}
