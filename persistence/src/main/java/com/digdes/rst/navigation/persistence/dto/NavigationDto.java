package com.digdes.rst.navigation.persistence.dto;

import com.digdes.rst.navigation.persistence.model.Application;
import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NavigationDto {
    Application application;
    List<Page> pagesWithoutGroup;
    List<GroupPage> groups;
}
