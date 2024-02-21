import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {Company} from "../../model/Company";
import {useNavigate, useParams} from "react-router-dom";
import {useCompanyService} from "../../service/useService";

export default function CompanyForm() {
    const companyService = useCompanyService();
    const [validated, setValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const {companyId} = useParams();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        setValidated(true)
        if (form.checkValidity()) {
            setSubmitting(true);
            const formData = new FormData(form);
            const company = Company.from(formData);

            if (companyService !== null) {
                companyService.saveCompany(company).then(() => {
                    navigate("/company");
                }).catch(reason => {
                    alert(reason);
                    setSubmitting(false)
                });
                return;
            }
        }
    }

    useEffect(() => {
        if (companyId && companyService !== null) {
            companyService.getCompany(Number(companyId)).then(company => {
                if (company) {
                    console.log(company);
                }
            });
        }
    }, [companyId]);

    return (
        <CForm className="row g-3 needs-validation pt-2"
               noValidate
               validated={validated}
               onSubmit={handleSubmit}>
            <CRow className="mb-3">
                <CCol>
                    {companyId && <p>{companyId}</p>}
                    <CFormInput name="companyName" type="text" id="companyName" label="Company Name" required
                                feedbackInvalid="Put a company name"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput name="contactPerson" type="text" id="contactPerson" label="Contact Person Name"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput type="text" name="contactNo" id="contactNo" label="Contact Number"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput type="text" name="officeAddress" id="officeAddress" label="Office Address"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CButton color="primary" type="submit" disabled={submitting}>
                        {submitting && <CSpinner component="span" size="sm" aria-hidden="true" className="me-2"/>}
                        Save
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
}