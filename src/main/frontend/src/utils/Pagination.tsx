import * as React from 'react';
import {Page} from "../model/Page";
import {CCol, CPagination, CPaginationItem, CRow} from "@coreui/react";

type Props = {
  page: Page<any> | undefined;
  setCurrentPageNumber: (pageNumber: number) => void;
};

export function Pagination(props: Props) {
  const {page, setCurrentPageNumber} = props;
  const pageSize = page?.size || 0;
  const totalElements = page?.totalElements || 0;
  const numberOfPages = totalElements ? Math.ceil(totalElements / pageSize) : 0;
  const currentPage = page?.number || 0;

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxButtons = 10; // Maximum number of buttons to show

    // Start and end page numbers for the pagination
    let startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(numberOfPages - 1, startPage + maxButtons - 1);

    // Adjust start and end page numbers if at the beginning or end
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(0, endPage - maxButtons + 1);
    }

    // Add "Jump to Beginning" button
    if (currentPage > 0) {
      paginationItems.push(
          <CPaginationItem
              key="jump-to-beginning"
              onClick={() => setCurrentPageNumber(0)}
              style={{cursor: 'pointer'}}
          >
            <span aria-hidden="true">&laquo;&laquo;</span>
          </CPaginationItem>
      );
    }

    // Add "Previous" button
    if (currentPage > 0) {
      paginationItems.push(
          <CPaginationItem
              key="prev"
              onClick={() => setCurrentPageNumber(currentPage - 1)}
              style={{cursor: 'pointer'}}
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
      );
    }

    // Add pagination buttons
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
          <CPaginationItem
              key={i}
              onClick={() => setCurrentPageNumber(i)}
              active={currentPage === i}
              style={{cursor: 'pointer'}}
          >
            {i + 1}
          </CPaginationItem>
      );
    }

    // Add "Next" button
    if (currentPage < numberOfPages - 1) {
      paginationItems.push(
          <CPaginationItem
              key="next"
              onClick={() => setCurrentPageNumber(currentPage + 1)}
              style={{cursor: 'pointer'}}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
      );
    }

    // Add "Jump to End" button
    if (currentPage < numberOfPages - 1) {
      paginationItems.push(
          <CPaginationItem
              key="jump-to-end"
              onClick={() => setCurrentPageNumber(numberOfPages - 1)}
              style={{cursor: 'pointer'}}
          >
            <span aria-hidden="true">&raquo;&raquo;</span>
          </CPaginationItem>
      );
    }

    return paginationItems;
  };

  return (
      <CRow className="mt-2">
        <CCol>
          <CPagination align="center" aria-label="Page navigation example" className="mb-0">
            {numberOfPages > 1 && renderPaginationItems()}
          </CPagination>

          {totalElements === 0 ? <small aria-hidden="true" className="text-secondary">Nothing here</small> :
              <small aria-hidden="true" className="text-secondary">
                <em>Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of total {totalElements}</em>
              </small>}
        </CCol>
      </CRow>
  );

}
