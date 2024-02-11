import * as React from 'react';
import {Page} from "../model/Page";
import {CPagination, CPaginationItem} from "@coreui/react";

type Props = {
  page: Page<any> | undefined;
  setCurrentPageNumber: (pageNumber: number) => void;
};

export function Pagination(props: Props) {
  const numberOfPages = props.page?.totalElements ? Math.ceil(props.page.totalElements / props.page.size) : 0;
  const pageNumbers = Array.from(Array(numberOfPages).keys());

  return (
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem disabled={props.page?.number === 0}
                         style={(props.page?.number !== 0) ? {cursor: 'pointer'} : undefined}
                         onClick={() => props.setCurrentPageNumber(0)}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {
          pageNumbers.map(pageNumber => {
            return (
                <CPaginationItem key={pageNumber} onClick={() => props.setCurrentPageNumber(pageNumber)}
                                 active={props.page?.number === pageNumber} style={{cursor: 'pointer'}}>
                  {pageNumber + 1}
                </CPaginationItem>
            );
          })
        }
        <CPaginationItem disabled={props.page?.number === (numberOfPages - 1)}
                         style={(props.page?.number !== (numberOfPages - 1)) ? {cursor: 'pointer'} : undefined}
                         onClick={() => props.setCurrentPageNumber((numberOfPages - 1))}>
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
  );
}