package com.digdes.rst.navigation.persistence.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class RedirectPage {
    @Id
    @ApiModelProperty("URL узла")
    private String nodeUrl;

    @Column(nullable = false)
    @ApiModelProperty("URL редирект")
    private String redirectUrl;
}
