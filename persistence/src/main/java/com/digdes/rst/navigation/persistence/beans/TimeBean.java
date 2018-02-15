package com.digdes.rst.navigation.persistence.beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * Author shushkov.r on 23.08.2017.
 */
@ApiModel(value="TimeBean", description="Время")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class TimeBean {
    @ApiModelProperty(value = "Текущее время в миллисекундах", required = true)
    private Long currentTime;
    @ApiModelProperty(value = "Часовой пояс", required = false)
    private String timeZone;
}
