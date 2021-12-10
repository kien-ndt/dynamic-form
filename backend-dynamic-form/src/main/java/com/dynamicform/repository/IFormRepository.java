package com.dynamicform.repository;

import com.dynamicform.entity.Form;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFormRepository extends MongoRepository<Form, Long> {
}
