import * as React from 'react';
import {useEffect, useState} from 'react';
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";
import {Page} from "../../model/Page";

export default function CargoList() {
  const cargoService = useCargoService();
  const [cargosPage, setCargosPage] = useState<Page<Cargo>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  useEffect(() => {
    if (cargoService !== null) {
      cargoService.getCargos(currentPageNumber).then((cargos: Page<Cargo>) => {
        setCargosPage(cargos)
      });
    }
  }, [currentPageNumber]);

  const columns = [
    {key: 'name', label: 'Cargo Name', _props: {scope: 'col'}},
    {key: 'proprietor', label: 'Proprietor', _props: {scope: 'col'}},
    {key: 'contactNo', label: 'Contact No', _props: {scope: 'col'}},
    {key: 'address', label: 'Address', _props: {scope: 'col'}},
    {key: 'reference', label: 'Reference', _props: {scope: 'col'}},
  ];

  return (
      <CTable striped hover columns={columns}>
        <CTableBody>
          {cargosPage?.content ? cargosPage?.content.map(cargo => {
            return (
                <CTableRow key={cargo.id}>
                  <CTableDataCell>
                    <Link to={'/cargo/' + cargo.id}>{cargo.name}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{cargo.proprietor}</CTableDataCell>
                  <CTableDataCell>{cargo.contactNo}</CTableDataCell>
                  <CTableDataCell>{cargo.address}</CTableDataCell>
                  <CTableDataCell>{cargo.reference}</CTableDataCell>
                </CTableRow>)
          }) : (
              <CTableRow>
                <CTableDataCell colSpan={6}>
                  <div className="d-flex justify-content-center">
                    <CSpinner color="primary"/>
                  </div>
                </CTableDataCell>
              </CTableRow>)}
        </CTableBody>
      </CTable>
  );
}