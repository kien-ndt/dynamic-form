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

    @GetMapping("/{id}")
    @ResponseBody
    public Form getFormById(@PathVariable String id){
        return crudService.getFormById(id);
    }

    @PostMapping("/")
    @ResponseBody
    public Form createForm(@RequestBody Form form){
        return crudService.createForm(form);
    }

    @PutMapping("/")
    public Form updateForm(@RequestBody Form form) {
        return crudService.updateFrom(form);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public String deleteForm(@PathVariable String id){
        crudService.deleteForm(id);
        return "da xoa nhe";
    }
}
