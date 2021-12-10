package com.dynamicform.service;

import com.dynamicform.entity.Form;
import com.dynamicform.repository.IFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DynamicFormCRUDService {
    @Autowired
    private IFormRepository formRepository;

    public Form createForm(Form form){
        formRepository.save(form);
        return form;
    }
}
