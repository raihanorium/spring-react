import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilX} from "@coreui/icons";

export default function CompanyLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>();
  const [action, setAction] = useState<ReactElement>();

  const addButton = (
      <Link to="/company/new" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilLibraryAdd} className="me-2" title="Add new company"/>
        Add
      </Link>);
  const cancelButton = (
      <Link to="/company" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilX} className="me-2" title="Back to list"/>
        Cancel
      </Link>);

  useEffect(() => {
    switch (location.pathname) {
      case '/company':
        setPageTitle('Companies');
        setAction(addButton);
        break;
      case '/company/new':
        setPageTitle('New Company');
        setAction(cancelButton);
        break;
      default:
        setPageTitle('Company');
        setAction(addButton);
        break;
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