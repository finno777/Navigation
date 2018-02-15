package com.digdes.rst.navigation.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class GroupPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    @ApiModelProperty("id")
    private Long id;// id
    @Column(nullable = false)
    @ApiModelProperty("название группы")
    private String name;// название группы
    @Column
    @ApiModelProperty("отображаемое имя группы")
    private String displayName;// отображаемое имя группы

    @ManyToOne(optional = false)
    @ApiModelProperty("Связь группы страниц с приложением")
    private Application application; // связка с портлетом

    @Transient
    @ApiModelProperty("Страницы содержащиеся в группе")
    private List<Page> pages;

    @Override
    public String toString() {
        return "GroupPage{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", displayName='" + displayName + '\'' +
                ", application=" + application +
                '}';
    }
}
