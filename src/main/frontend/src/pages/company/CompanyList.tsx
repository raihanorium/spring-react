import * as React from 'react';
import {useEffect, useState} from 'react';
import {collection, onSnapshot} from "firebase/firestore";
import firestore from "../../firebase";
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Company} from "../../model/Company";
import {Link} from "react-router-dom";
import {useCompanyService} from "../../service/useService";
import {Page} from "../../model/Page";

export default function CompanyList() {

    const [companies, setCompanies] = useState<Company[]>();
    const companyService = useCompanyService();

    useEffect(() => {
        if (companyService !== null) {
            companyService.getCompanies().then((companies: Page<Company>) => {
                setCompanies(companies.content.map(company => {
                    return new Company(
                        company.id,
                        company.name,
                        company.contactPerson,
                        company.contactNo,
                        company.officeAddress
                    );
                }));
            });
        }
    }, []);

    const columns = [
        {key: 'name', label: 'Name', _props: {scope: 'col'}},
        {key: 'contactPerson', label: 'Contact Person', _props: {scope: 'col'}},
        {key: 'contactNo', label: 'Contact No', _props: {scope: 'col'}},
        {key: 'officeAddress', label: 'Office Address', _props: {scope: 'col'}},
    ];

    return (
        <CTable striped hover columns={columns}>
            <CTableBody>
                {companies ? companies.map(company => {
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