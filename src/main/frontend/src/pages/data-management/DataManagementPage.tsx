import * as React from 'react';
import {FormEvent, useState} from 'react';
import {CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import {useDataManagementService} from "../../service/useService";
import {useNavigate} from "react-router-dom";

export default function DataManagementPage() {

  const dataManagementService = useDataManagementService();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false)
  const [loadingImport, setLoadingImport] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    setValidated(true)
    if (form.checkValidity()) {
      setLoadingImport(true);
      const formData = new FormData(form);
      if (dataManagementService !== null) {
        dataManagementService.importData(formData).then((response) => {
          alert(response);
          navigate("/data-management");
        }).catch(reason => {
          alert(reason);
          setLoadingImport(false)
        }).finally(() => {
          form.reset();
          setValidated(false);
          setLoadingImport(false);
        });
        return;
      }
    }
  }

  return (
      <>
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>
                <CRow>
                  <CCol><h3>Import</h3></CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <SpinnerContainer loading={loadingImport}>
                  <CForm className="row g-3 needs-validation pt-2"
                         noValidate
                         validated={validated}
                         onSubmit={handleSubmit}>
                    <CRow className="mb-3">
                      <CCol>
                        <CFormInput type="file" id="importFile" name="file" label="Import xlsx file" required/>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol>
                        <CButton color="primary" type="submit" disabled={loadingImport}>
                          {loadingImport && <CSpinner component="span" size="sm" aria-hidden="true" className="me-2"/>}
                          Import
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </SpinnerContainer>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>
                <CRow>
                  <CCol><h3>Export</h3></CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                Export to xlsx file
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
  );
}