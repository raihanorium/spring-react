import * as React from 'react';
import {useEffect, useState} from 'react';
import {CTable, CTableBody, CTableDataCell, CTableFoot, CTableRow} from "@coreui/react";
import {Company} from "../../model/Company";
import {Link} from "react-router-dom";
import {useCompanyService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function CompanyList() {
  const companyService = useCompanyService();

  const [companiesPage, setCompaniesPage] = useState<Page<Company>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (companyService !== null) {
      setLoading(true);
      companyService.getCompanies(currentPageNumber).then((companies: Page<Company>) => {
        setCompaniesPage(companies);
      }).finally(() => setLoading(false));
    }
  }, [currentPageNumber]);

  const columns = [
    {key: 'name', label: 'Name', _props: {scope: 'col'}},
    {key: 'contactPerson', label: 'Contact Person', _props: {scope: 'col'}},
    {key: 'contactNo', label: 'Contact No', _props: {scope: 'col'}},
    {key: 'officeAddress', label: 'Office Address', _props: {scope: 'col'}},
    {key: 'action', label: '', _props: {scope: 'col'}},
  ];

  return (
      <SpinnerContainer loading={loading}>
        <CTable striped hover columns={columns}>
          <CTableBody>
            {companiesPage?.content && companiesPage?.content.map(company => {
              return (
                  <CTableRow key={company.id}>
                    <CTableDataCell>
                      <Link to={'/company/' + company.id}>{company.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>{company.contactPerson}</CTableDataCell>
                    <CTableDataCell>{company.contactNo}</CTableDataCell>
                    <CTableDataCell>{company.officeAddress}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={'/company/edit/' + company.id}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>)
            })}
          </CTableBody>
          <CTableFoot>
            <CTableRow>
              <CTableDataCell colSpan={5}>
                <Pagination page={companiesPage} setCurrentPageNumber={setCurrentPageNumber}/>
              </CTableDataCell>
            </CTableRow>
          </CTableFoot>
        </CTable>
      </SpinnerContainer>
  );
}