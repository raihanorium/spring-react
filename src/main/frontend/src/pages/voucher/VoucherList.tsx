import * as React from 'react';
import {useEffect, useState} from 'react';
import {CTable, CTableBody, CTableDataCell, CTableFoot, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import DateUtils from "../../utils/DateUtils";
import {useVoucherService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import {Cargo} from "../../model/Cargo";
import {FormattedCurrency} from "../../components/FormattedCurrency";

type Props = {
  cargo?: Cargo | null
};

export default function VoucherList(props: Props) {
  const voucherService = useVoucherService();

  const [vouchersPage, setVouchersPage] = useState<Page<Voucher>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (voucherService !== null) {
      setLoading(true);
      const vouchersPage = props.cargo ?
          voucherService.getVouchersByCargo(Number(props.cargo.id), currentPageNumber) :
          voucherService.getVouchers(currentPageNumber);
      vouchersPage.then((vouchers) => {
        setVouchersPage(vouchers);
      }).finally(() => setLoading(false));
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
    {key: 'action', label: '', _props: {scope: 'col'}},
  ];

  return (
      <SpinnerContainer loading={loading}>
        <CTable responsive striped hover columns={columns}>
          <CTableBody>
            {vouchersPage?.content && vouchersPage.content.map(voucher => {
              return (
                  <CTableRow key={voucher.id}>
                    <CTableDataCell>{voucher.cargoId}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={'/voucher/' + voucher.id}>{voucher.tripId}</Link>
                    </CTableDataCell>
                    <CTableDataCell>{voucher.voucherNo}</CTableDataCell>
                    <CTableDataCell>{DateUtils.toString(voucher.date)}</CTableDataCell>
                    <CTableDataCell><FormattedCurrency number={Number(voucher.dr)}/></CTableDataCell>
                    <CTableDataCell><FormattedCurrency number={Number(voucher.cr)}/></CTableDataCell>
                    <CTableDataCell>{voucher.particular}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={'/voucher/edit/' + voucher.id}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>)
            })}
          </CTableBody>
          <CTableFoot>
            <CTableRow>
              <CTableDataCell colSpan={8}>
                <Pagination page={vouchersPage} setCurrentPageNumber={setCurrentPageNumber}/>
              </CTableDataCell>
            </CTableRow>
          </CTableFoot>
        </CTable>
      </SpinnerContainer>
  );
}