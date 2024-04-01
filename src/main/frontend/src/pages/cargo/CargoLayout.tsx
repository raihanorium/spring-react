import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilSearch, cilX} from "@coreui/icons";

export default function CargoLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>();
  const [action, setAction] = useState<ReactElement>();

  const addButton = (
      <>
        <div className="btn-group me-2" role="group" aria-label="Search button group">
          <input type="text" className="form-control" placeholder="Search..."/>
          <button className="btn btn-outline-primary" type="button">
            <CIcon icon={cilSearch} title="Search"/>
          </button>
        </div>
        <Link to="/cargo/new" className="btn btn-outline-primary" color="success" type="button">
          <CIcon icon={cilLibraryAdd} className="me-2" title="Add new cargo"/>
          Add
        </Link>
      </>);
  const cancelButton = (
      <Link to="/cargo" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilX} className="me-2" title="Back to list"/>
        Cancel
      </Link>);

  useEffect(() => {
    switch (location.pathname) {
      case '/cargo':
        setPageTitle('Cargo');
        setAction(addButton);
        break;
      case '/cargo/new':
        setPageTitle('New Cargo');
        setAction(cancelButton);
        break;
      default:
        setPageTitle('Cargo');
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