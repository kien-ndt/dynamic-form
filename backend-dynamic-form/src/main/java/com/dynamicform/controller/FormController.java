package com.dynamicform.controller;

import com.dynamicform.entity.Form;
import com.dynamicform.service.DynamicFormCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/form")
public class FormController {

    @Autowired
    private DynamicFormCRUDService crudService;

    @GetMapping("/")
    @ResponseBody
    public List<Form> getAllForms(){
        return crudService.getAllForms();
    }

    @PostMapping("/")
    @ResponseBody
    public Form createForm(@RequestBody Form form){
        return crudService.createForm(form);
    }

//    @DeleteMapping("/")
//    @ResponseBody
//    public String deleteForm(@RequestParam String id){
//        System.out.println(id);
////        crudService.deleteForm(id);
//        return "da xoa nhe";
//    }
}
