import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {CForm, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import CIcon from "@coreui/icons-react";
import {cilSearch} from "@coreui/icons";
import {PageParams} from "../../model/PageParams";

export default function CargoList() {
  const cargoService = useCargoService();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [cargosPage, setCargosPage] = useState<Page<Cargo>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [term, setTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cargoService !== null) {
      setLoading(true);
      cargoService.getCargos(new PageParams(term, currentPageNumber)).then((cargos: Page<Cargo>) => {
        setCargosPage(cargos)
      }).finally(() => setLoading(false));
    }
  }, [currentPageNumber, term]);

  const columns = [
    {key: 'name', label: 'Cargo Name', _props: {scope: 'col'}},
    {key: 'proprietor', label: 'Proprietor', _props: {scope: 'col'}},
    {key: 'contactNo', label: 'Contact No', _props: {scope: 'col'}},
    {key: 'address', label: 'Address', _props: {scope: 'col'}},
    {key: 'reference', label: 'Reference', _props: {scope: 'col'}},
    {key: 'action', label: '', _props: {scope: 'col'}},
  ];

  return (
      <SpinnerContainer loading={loading}>
        <CForm onSubmit={(e) => {
          e.preventDefault();
          if (searchInputRef.current) {
            setCurrentPageNumber(0);
            setTerm(searchInputRef.current.value);
          }
        }}>
          <div className="row">
            <div className="input-group me-2" role="group" aria-label="Search button group">
              <input ref={searchInputRef} type="text" className="form-control" placeholder="Search..."
                     defaultValue={term}/>
              <button className="btn btn-outline-secondary input-group-text" type="submit">
                <CIcon icon={cilSearch} title="Search"/>
              </button>
            </div>
          </div>
        </CForm>
        <CTable responsive striped hover columns={columns}>
          <CTableBody>
            {cargosPage?.content && cargosPage?.content.map(cargo => {
              return (
                  <CTableRow key={cargo.id}>
                    <CTableDataCell>
                      <Link to={'/cargo/detail/' + cargo.id}>{cargo.name}</Link>
                    </CTableDataCell>
                    <CTableDataCell>{cargo.proprietor}</CTableDataCell>
                    <CTableDataCell>{cargo.contactNo}</CTableDataCell>
                    <CTableDataCell>{cargo.address}</CTableDataCell>
                    <CTableDataCell>{cargo.reference}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={'/cargo/edit/' + cargo.id}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>)
            })}
          </CTableBody>
        </CTable>
        <Pagination page={cargosPage} setCurrentPageNumber={setCurrentPageNumber}/>
      </SpinnerContainer>
  );
}