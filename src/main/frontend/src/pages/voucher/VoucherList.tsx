import * as React from 'react';
import {useEffect, useState} from 'react';
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";
import firestore from "../../firebase";
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import DateUtils from "../../utils/DateUtils";

export default function VoucherList() {

  const [vouchers, setVouchers] = useState<Voucher[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "vouchers"), async (snapshot) => {
      const vouchersData = await Promise.all(snapshot.docs.map(async (d) => {
        const trip = await getDoc(doc(firestore, "trips", d.get('tripId')));
        const cargo = await getDoc(doc(firestore, "cargos", d.get('cargoId')));
        return new Voucher(
            d.id,
            trip.get("from") + "-" + trip.get("to") + "-" + DateUtils.toString(trip.get("startDate").toDate()),
            cargo.get("name"),
            d.get('voucherNo'),
            d.get('date').toDate(),
            d.get('dr'),
            d.get('cr'),
            d.get('particular')
        );
      }));

      setVouchers(vouchersData);
    });

    return () => unsubscribe();
  }, []);


  const columns = [
    {key: 'tripId', label: 'Trip', _props: {scope: 'col'}},
    {key: 'cargoId', label: 'Cargo', _props: {scope: 'col'}},
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
                  <CTableDataCell>
                    <Link to={'/voucher/' + voucher.id}>{voucher.tripId}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{voucher.cargoId}</CTableDataCell>
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