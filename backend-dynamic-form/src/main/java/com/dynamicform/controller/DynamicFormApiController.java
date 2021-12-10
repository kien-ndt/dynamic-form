package com.dynamicform.controller;

import com.dynamicform.entity.Form;
import com.dynamicform.service.DynamicFormCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class DynamicFormApiController {

    @Autowired
    private DynamicFormCRUDService crudService;

    @GetMapping("/")
    @ResponseBody
    public Form createForm(@RequestBody Form form){
        return crudService.createForm(form);
    }
}
