package com.digdes.rst.navigation.persistence.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ApiModel("app")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @ApiModelProperty("id")
    private Long id; // id

    @Column(nullable = false)
    @ApiModelProperty("id портлета")
    public String appId;// id портлета

    @ApiModelProperty("id ноды")
    public String nodeId;// id ноды

    @ApiModelProperty("url страницы")
    public String pageUrl;// URI страницы

    @JsonIgnore
    @ApiModelProperty(value = "url приложения", required = false)
    @Column(name = "url")
    private String url;

    @Column(length = 128)
    @ApiModelProperty("Название портлета")
    private String displayName;

    @Column(length = 1024)
    @ApiModelProperty("Описание портлета")
    private String description;

    @ApiModelProperty("Стиль портлета")
    @Enumerated(EnumType.STRING)
    private State state;

    @ApiModelProperty("Отображаемые страницы")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType contentType;

    public enum State{
        FULL,
        SIDE
    }

    public enum ContentType{
        CUSTOM,
        CHILD,
        SIBLING
    }
}
