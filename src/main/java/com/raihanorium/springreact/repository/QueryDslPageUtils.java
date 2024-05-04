package com.raihanorium.springreact.repository;

import com.querydsl.jpa.JPQLQuery;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QueryDslPageUtils {

    public static <T> Page<T> createPage(Querydsl querydsl, JPQLQuery<T> query, Pageable pageable) {
        long total = query.fetchCount();
        JPQLQuery<T> pageableQuery = querydsl.applyPagination(pageable, query);
        List<T> content = ((pageable == null) || (total > pageable.getOffset())) ? pageableQuery.fetch() : Collections.emptyList();
        return new PageImpl<>(content, pageable, total);
    }

    public static <T> Page<T> emptyPage(){
        return new PageImpl<>(new ArrayList<>());
    }
}
