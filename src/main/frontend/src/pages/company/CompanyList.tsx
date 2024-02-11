import * as React from 'react';
import {useEffect, useState} from 'react';
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Company} from "../../model/Company";
import {Link} from "react-router-dom";
import {useCompanyService} from "../../service/useService";
import {Page} from "../../model/Page";

export default function CompanyList() {
  const companyService = useCompanyService();

  const [companiesPage, setCompaniesPage] = useState<Page<Company>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  useEffect(() => {
    if (companyService !== null) {
      companyService.getCompanies(currentPageNumber).then((companies: Page<Company>) => {
        setCompaniesPage(companies);
      });
    }
  }, [currentPageNumber]);

  const columns = [
    {key: 'name', label: 'Name', _props: {scope: 'col'}},
    {key: 'contactPerson', label: 'Contact Person', _props: {scope: 'col'}},
    {key: 'contactNo', label: 'Contact No', _props: {scope: 'col'}},
    {key: 'officeAddress', label: 'Office Address', _props: {scope: 'col'}},
  ];

  return (
      <CTable striped hover columns={columns}>
        <CTableBody>
          {companiesPage?.content ? companiesPage?.content.map(company => {
            return (
                <CTableRow key={company.id}>
                  <CTableDataCell>
                    <Link to={'/company/' + company.id}>{company.name}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{company.contactPerson}</CTableDataCell>
                  <CTableDataCell>{company.contactNo}</CTableDataCell>
                  <CTableDataCell>{company.officeAddress}</CTableDataCell>
                </CTableRow>)
          }) : (
              <CTableRow>
                <CTableDataCell colSpan={4}>
                  <div className="d-flex justify-content-center">
                    <CSpinner color="primary"/>
                  </div>
                </CTableDataCell>
              </CTableRow>)}
        </CTableBody>
      </CTable>
  );
}