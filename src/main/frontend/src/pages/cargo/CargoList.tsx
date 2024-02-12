import * as React from 'react';
import {useEffect, useState} from 'react';
import {CTable, CTableBody, CTableDataCell, CTableFoot, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function CargoList() {
  const cargoService = useCargoService();

  const [cargosPage, setCargosPage] = useState<Page<Cargo>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cargoService !== null) {
      setLoading(true);
      cargoService.getCargos(currentPageNumber).then((cargos: Page<Cargo>) => {
        setCargosPage(cargos)
      }).finally(() => setLoading(false));
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
      <SpinnerContainer loading={loading}>
        <CTable striped hover columns={columns}>
          <CTableBody>
            {cargosPage?.content && cargosPage?.content.map(cargo => {
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
            })}
          </CTableBody>
          <CTableFoot>
            <CTableRow>
              <CTableDataCell colSpan={6}>
                <Pagination page={cargosPage} setCurrentPageNumber={setCurrentPageNumber}/>
              </CTableDataCell>
            </CTableRow>
          </CTableFoot>
        </CTable>
      </SpinnerContainer>
  );
}