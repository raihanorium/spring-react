import * as React from 'react';
import {useEffect, useState} from 'react';
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import DateUtils from "../../utils/DateUtils";
import {useVoucherService} from "../../service/useService";

export default function VoucherList() {

  const voucherService = useVoucherService();

  const [vouchers, setVouchers] = useState<Voucher[]>();

  useEffect(() => {
    if (voucherService !== null) {
      voucherService.getVouchers().then((vouchers) => {
        setVouchers(vouchers.content);
      });
    }
  }, []);

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
          {vouchers ? vouchers.map(voucher => {
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
      </CTable>
  );
}