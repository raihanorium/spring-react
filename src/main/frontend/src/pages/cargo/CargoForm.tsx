import * as React from 'react';
import {FormEvent, useState} from 'react';
import {CButton, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {useNavigate} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";

export default function CargoForm() {
    const cargoService = useCargoService();
    const [validated, setValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        setValidated(true)
        if (form.checkValidity()) {
            setSubmitting(true);
            const formData = new FormData(form);
            const cargo = Cargo.from(formData);

            if (cargoService !== null) {
                cargoService.saveCargo(cargo).then(() => {
                    navigate("/cargo");
                }).catch(reason => {
                    alert(reason);
                    setSubmitting(false)
                });
                return;
            }
        }
    }

    return (
        <CForm className="row g-3 needs-validation pt-2"
               noValidate
               validated={validated}
               onSubmit={handleSubmit}>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput name="name" type="text" id="nme" label="Cargo Name" required
                                feedbackInvalid="Put a cargo name"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput name="proprietor" type="text" id="proprietor" label="Proprietor"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput type="text" name="contactNo" id="contactNo" label="Contact Number"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput type="text" name="address" id="address" label="Address"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol>
                    <CFormInput type="text" name="reference" id="reference" label="Reference"/>
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