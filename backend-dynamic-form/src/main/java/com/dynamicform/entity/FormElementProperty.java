package com.dynamicform.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FormElementProperty {
    private String label;
    private List<String> content;
    private int gridWidth;
}
