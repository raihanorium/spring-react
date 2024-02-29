import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {Company} from "../../model/Company";
import {useNavigate, useParams} from "react-router-dom";
import {useCompanyService} from "../../service/useService";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function CompanyForm() {
    const companyService = useCompanyService();
    const [validated, setValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const {companyId} = useParams();
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
        if (companyId && companyService) {
            setLoading(true);
            companyService.getCompany(Number(companyId)).then(c => {
                if (c) {
                    setCompany(c);
                }
            }).finally(() => setLoading(false));
        } else {
            setCompany(null);
        }
    }, [companyId]);

    return (
        <SpinnerContainer loading={loading}>
            <CForm className="row g-3 needs-validation pt-2"
                   noValidate
                   validated={validated}
                   onSubmit={handleSubmit}>
                <CRow className="mb-3">
                    <CCol>
                        {companyId && <CFormInput name="id" type="hidden" id="id" value={companyId}/>}

                        <CFormInput name="companyName" type="text" id="companyName" label="Company Name" required
                                    feedbackInvalid="Put a company name" defaultValue={company?.name ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput name="contactPerson" type="text" id="contactPerson" label="Contact Person Name"
                                    defaultValue={company?.contactPerson ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput type="text" name="contactNo" id="contactNo" label="Contact Number"
                                    defaultValue={company?.contactNo ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput type="text" name="officeAddress" id="officeAddress" label="Office Address"
                                    defaultValue={company?.officeAddress ?? undefined}/>
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
        </SpinnerContainer>
    );
}