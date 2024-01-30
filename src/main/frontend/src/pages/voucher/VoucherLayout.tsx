import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilX} from "@coreui/icons";

export default function VoucherLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>();
  const [action, setAction] = useState<ReactElement>();

  const addButton = (
      <Link to="/voucher/new" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilLibraryAdd} className="me-2" title="Add new voucher"/>
        Add
      </Link>);
  const cancelButton = (
      <Link to="/voucher" className="btn btn-outline-primary" color="success" type="button">
        <CIcon icon={cilX} className="me-2" title="Back to list"/>
        Cancel
      </Link>);

  useEffect(() => {
    switch (location.pathname) {
      case '/voucher':
        setPageTitle('Voucher');
        setAction(addButton);
        break;
      case '/voucher/new':
        setPageTitle('New Voucher');
        setAction(cancelButton);
        break;
      default:
        setPageTitle('Voucher');
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