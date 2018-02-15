package com.digdes.rst.navigation.persistence.dao.impl;

import com.digdes.rst.navigation.persistence.dao.AbstractDao;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

@Transactional
public abstract class AbstractDaoImpl<E, I extends Serializable> implements AbstractDao<E, I> {
    private Class<E> entityClass;

    @Autowired
    private SessionFactory sessionFactory;

    protected AbstractDaoImpl(Class<E> entityClass) {
        this.entityClass = entityClass;
    }

    public Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

    @SuppressWarnings("unchecked")
    @Override
    public E findById(I id) {
        return (E) getCurrentSession().get(entityClass, id);
    }

    @Override
    public E saveOrUpdate(E e) {
        getCurrentSession().saveOrUpdate(e);
        return e;
    }

    @Override
    public void delete(E e) {
        getCurrentSession().delete(e);
    }

    @Override
    public List findByCriteria(Criterion criterion) {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        criteria.add(criterion);
        return criteria.list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<E> findAll() {
        return getCurrentSession().createCriteria(entityClass).list();
    }

    @Override
    public E merge(E entity) {
        return (E) getCurrentSession().merge(entity);

    }
}

