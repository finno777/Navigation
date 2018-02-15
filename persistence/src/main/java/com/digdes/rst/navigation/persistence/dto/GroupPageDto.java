package com.digdes.rst.navigation.persistence.dto;


import com.digdes.rst.navigation.persistence.model.GroupPage;
import com.digdes.rst.navigation.persistence.model.Page;
import lombok.Data;
import java.util.List;

@Data
public class GroupPageDto {

    GroupPage groupPage;

    List<Page> pages;

    public GroupPageDto(GroupPage groupPage, List<Page> pages) {
        this.groupPage = groupPage;
        this.pages = pages;
    }
}
