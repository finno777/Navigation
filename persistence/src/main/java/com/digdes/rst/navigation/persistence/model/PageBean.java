package com.digdes.rst.navigation.persistence.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Author shushkov.r on 05.07.2017.
 */
@NoArgsConstructor
@Data
public class PageBean {

    private String uniqueId;// укникальный id
    private PageBean parent;// родительская страница
    private String displayName;// отображаемое имя
    private String name;// имя страницы
    private String uri;// URI страницы
    private boolean selected;// следующая страница
    private List<PageBean> children;//список дочерних страниц


}
