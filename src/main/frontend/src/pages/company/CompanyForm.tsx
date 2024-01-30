import * as React from 'react';
import {FormEvent, useState} from 'react';
import {CButton, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {Company} from "../../model/Company";
import firestore from "../../firebase";
import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

export default function CompanyForm() {

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
      const company = Company.from(formData);

      addDoc(collection(firestore, 'companies'), company.toObject())
          .then(() => navigate("/company"))
          .catch(reason => {
            alert(reason);
            setSubmitting(false)
          });
    }
  }

  return (
      <CForm className="row g-3 needs-validation pt-2"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CCol>
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