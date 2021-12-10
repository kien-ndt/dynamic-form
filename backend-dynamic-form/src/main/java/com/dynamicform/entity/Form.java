package com.dynamicform.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter

@Document(collection = "form")
public class Form {
    @Id
    private String id;

    private String name;
}
