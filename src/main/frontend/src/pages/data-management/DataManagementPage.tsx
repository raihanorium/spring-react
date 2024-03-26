import * as React from 'react';
import {CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow} from "@coreui/react";

export default function DataManagementPage() {
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
                <div className="mb-3">
                  <CFormInput type="file" id="formFile" label="Import xlsx file"/>
                </div>
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