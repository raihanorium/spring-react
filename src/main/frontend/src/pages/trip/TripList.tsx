import * as React from 'react';
import {useEffect, useState} from 'react';
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";
import firestore from "../../firebase";
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Trip} from "../../model/Trip";
import DateUtils from "../../utils/DateUtils";

export default function TripList() {

  const [trips, setTrips] = useState<Trip[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "trips"), async (snapshot) => {
      const tripsData = await Promise.all(snapshot.docs.map(async (d) => {
        const company = await getDoc(doc(firestore, "companies", d.get('companyId')));
        const cargo = await getDoc(doc(firestore, "cargos", d.get('cargoId')));
        return new Trip(
            d.id,
            company.get("name"),
            cargo.get("name"),
            d.get('startDate').toDate(),
            d.get('endDate').toDate(),
            d.get('from'),
            d.get('to'),
            d.get('rent')
        );
      }));

      setTrips(tripsData);
    });

    return () => unsubscribe();
  }, []);


  const columns = [
    {key: 'companyId', label: 'Company', _props: {scope: 'col'}},
    {key: 'cargoId', label: 'Cargo', _props: {scope: 'col'}},
    {key: 'startDate', label: 'Start Date', _props: {scope: 'col'}},
    {key: 'endDate', label: 'End Date', _props: {scope: 'col'}},
    {key: 'from', label: 'From', _props: {scope: 'col'}},
    {key: 'to', label: 'To', _props: {scope: 'col'}},
  ];

  return (
      <CTable striped hover columns={columns}>
        <CTableBody>
          {trips ? trips.map(trip => {
            return (
                <CTableRow key={trip.id}>
                  <CTableDataCell>
                    <Link to={'/trip/' + trip.id}>{trip.companyId}</Link>
                  </CTableDataCell>
                  <CTableDataCell>{trip.cargoId}</CTableDataCell>
                  <CTableDataCell>{DateUtils.toString(trip.startDate)}</CTableDataCell>
                  <CTableDataCell>{DateUtils.toString(trip.endDate)}</CTableDataCell>
                  <CTableDataCell>{trip.from}</CTableDataCell>
                  <CTableDataCell>{trip.to}</CTableDataCell>
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