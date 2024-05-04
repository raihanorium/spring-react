import * as React from 'react';
import {useEffect, useState} from 'react';
import {CCol, CRow} from "@coreui/react";
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

  return (
      <SpinnerContainer loading={loading}>
        {vouchersPage?.content && vouchersPage.content.map(voucher => {
          return (
              <CRow key={voucher.id} className="list-item">
                <CCol>
                  <p className="mb-1"><Link to={`/cargo/detail/${voucher.cargoId}`}>{voucher.cargoTitle}</Link></p>
                  <p className="mb-0"><small className="mb-1">{voucher.tripTitle}</small></p>
                  {voucher.voucherNo &&
                      <p className="mb-0">
                        <small className="mb-1 text-secondary">Voucher No.:{voucher.voucherNo}</small>
                      </p>
                  }
                </CCol>
                <CCol sm={2}>
                  {voucher.dr != null && voucher.dr > 0 &&
                      <small>
                        <span className="text-warning">Dr:</span>
                        <span className="float-end"><FormattedCurrency number={voucher.dr}/></span>
                      </small>
                  }
                  {voucher.cr != null && voucher.cr > 0 &&
                      <small>
                        Cr:
                        <span className="float-end"><FormattedCurrency number={voucher.cr}/></span>
                      </small>
                  }
                  <br/>
                  <small className="text-secondary">{voucher.particular}</small>
                </CCol>
                <CCol>
                  <small className="text-secondary float-end">{DateUtils.toString(voucher.date)}</small>
                  <br/>
                  <small className="text-secondary float-end">
                    <Link to={'/voucher/edit/' + voucher.id}>Edit</Link>
                  </small>
                </CCol>
              </CRow>
          )
        })}

        <Pagination page={vouchersPage} setCurrentPageNumber={setCurrentPageNumber}/>
      </SpinnerContainer>
  );
}