package com.digdes.rst.navigation.persistence.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonAutoDetect
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {
    boolean success;
    String errorMessage;

    public ResponseDto(boolean success) {
        this.success = success;
    }
}
