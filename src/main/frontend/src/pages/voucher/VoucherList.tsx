import * as React from 'react';
import {useEffect, useState} from 'react';
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableFoot, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import DateUtils from "../../utils/DateUtils";
import {useVoucherService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";

export default function VoucherList() {
  const voucherService = useVoucherService();

  const [vouchersPage, setVouchersPage] = useState<Page<Voucher>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  useEffect(() => {
    if (voucherService !== null) {
      setVouchersPage(undefined);
      voucherService.getVouchers(currentPageNumber).then((vouchers) => {
        setVouchersPage(vouchers);
      });
    }
  }, [currentPageNumber]);

  const columns = [
    {key: 'cargoId', label: 'Cargo', _props: {scope: 'col'}},
    {key: 'tripId', label: 'Trip', _props: {scope: 'col'}},
    {key: 'voucherNo', label: 'Voucher No', _props: {scope: 'col'}},
    {key: 'date', label: 'Date', _props: {scope: 'col'}},
    {key: 'dr', label: 'Dr', _props: {scope: 'col'}},
    {key: 'cr', label: 'Cr', _props: {scope: 'col'}},
    {key: 'particular', label: 'Particular', _props: {scope: 'col'}},
  ];

  return (
      <CTable striped hover columns={columns}>
        <CTableBody>
          {vouchersPage?.content ? vouchersPage.content.map(voucher => {
            return (
                <CTableRow key={voucher.id}>
                  <CTableDataCell>{voucher.cargoId}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={'/voucher/' + voucher.id}>{voucher.tripId}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{voucher.voucherNo}</CTableDataCell>
                  <CTableDataCell>{DateUtils.toString(voucher.date)}</CTableDataCell>
                  <CTableDataCell>{voucher.dr?.toString()}</CTableDataCell>
                  <CTableDataCell>{voucher.cr?.toString()}</CTableDataCell>
                  <CTableDataCell>{voucher.particular}</CTableDataCell>
                </CTableRow>)
          }) : (
              <CTableRow>
                <CTableDataCell colSpan={7}>
                  <div className="d-flex justify-content-center">
                    <CSpinner color="primary"/>
                  </div>
                </CTableDataCell>
              </CTableRow>)}
        </CTableBody>
        <CTableFoot>
          <CTableRow>
            <CTableDataCell colSpan={7}>
              <Pagination page={vouchersPage} setCurrentPageNumber={setCurrentPageNumber}/>
            </CTableDataCell>
          </CTableRow>
        </CTableFoot>
      </CTable>
  );
}