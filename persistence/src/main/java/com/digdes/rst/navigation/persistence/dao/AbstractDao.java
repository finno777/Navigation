package com.digdes.rst.navigation.persistence.dao;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;

import java.io.Serializable;
import java.util.List;

public interface AbstractDao<E, I extends Serializable> {
    Session getCurrentSession();

    E findById(I id);

    E saveOrUpdate(E e);

    void delete(E e);

    List findByCriteria(Criterion criterion);

    List<E> findAll();

    E merge(E entity);
}
