import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilX} from "@coreui/icons";

export default function CargoLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>();
  const [action, setAction] = useState<ReactElement | null>();

  const addButton = (
      <Link to="/cargo/new" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilLibraryAdd} className="me-2" title="Add new cargo"/>
        Add
      </Link>);
  const cancelButton = (
      <Link to="/cargo" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilX} className="me-2" title="Back to list"/>
        Cancel
      </Link>);

  useEffect(() => {
    if (location.pathname.startsWith('/cargo/new')) {
      setPageTitle('New Cargo');
      setAction(cancelButton);
    } else if (location.pathname.startsWith('/cargo/detail')) {
      setPageTitle('Cargo Detail');
      setAction(null);
    } else if (location.pathname.startsWith('/cargo')) {
      setPageTitle('Cargo');
      setAction(addButton);
    } else {
      setPageTitle('Cargo');
      setAction(addButton);
    }

  }, [location]);

  return (
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol><h3>{pageTitle}</h3></CCol>
                <CCol>
                  <div className="float-end">
                    {action}
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <Outlet/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
  );
}