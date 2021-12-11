package com.dynamicform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.dynamicform")
public class ServerDynamicForm {
    public static void main(String args[]){
        SpringApplication.run(ServerDynamicForm.class, args);

    }
}
