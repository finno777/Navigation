package com.digdes.rst.navigation.persistence.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.List;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Data
@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("id")
    private Long id; // id

    @ApiModelProperty("id ноды")
    private String nodeId; //id ноды

    @Column(length = 129)
    @ApiModelProperty("имя страницы")
    private String name;// имя страницы

    @Column(length = 257)
    @ApiModelProperty("отображаемое имя")
    private String displayName;// отображаемое имя

    @Column(nullable = false)
    @ApiModelProperty("URI страницы")
    private String uri;// URI страницы

    @Column(length = 1024)
    @ApiModelProperty("Описание страницы")
    private String description;

    @Column(nullable = false, columnDefinition = "boolean default true")
    @ApiModelProperty("Признак внутренней ссылки")
    private boolean internal;

    @Column(nullable = false, columnDefinition = "boolean default false")
    @ApiModelProperty("Признак страницы добавленной вручную")
    private boolean custom;

    @ApiModelProperty("иконка")
    String image;//иконка

    @ManyToOne(optional = false)
    @ApiModelProperty("Связь страницы с приложением")
    private Application application;// связь с портлетом

    @JsonIgnore
    @ManyToOne
//    @OnDelete(action = CASCADE)
    @ApiModelProperty("Связь страниц с группами страниц")
    private GroupPage groupPage;//привязка к группе

    @Transient
    private List<Page> pages;

    public Page(String nodeId, String uri, String name, String displayName) {
        this.nodeId = nodeId;
        this.name = name;
        this.uri = uri;
        this.displayName = displayName;
    }

    public Page() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Page page = (Page) o;
        return nodeId != null && nodeId.equals(page.nodeId);
    }

    @Override
    public int hashCode() {
        return 31 * (nodeId != null ? nodeId.hashCode() : super.hashCode());
    }
}
