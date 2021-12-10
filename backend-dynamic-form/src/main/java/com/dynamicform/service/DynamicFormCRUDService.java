package com.dynamicform.service;

import com.dynamicform.entity.Form;
import com.dynamicform.repository.IFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DynamicFormCRUDService {
    @Autowired
    private IFormRepository formRepository;

    public Form createForm(Form form){
        System.out.println(formRepository.save(form));
        return form;
    }

    public List<Form> getAllForms(){
        return formRepository.findAll();
    }

    public void deleteForm(String id){
        formRepository.deleteById(id);
        return;
    }
}
