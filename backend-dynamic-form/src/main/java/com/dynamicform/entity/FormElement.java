package com.dynamicform.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormElement {
    private String type;

    private FormElementProperty property;
}
