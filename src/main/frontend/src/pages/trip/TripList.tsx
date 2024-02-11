import * as React from 'react';
import {useEffect, useState} from 'react';
import {CSpinner, CTable, CTableBody, CTableDataCell, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Trip} from "../../model/Trip";
import DateUtils from "../../utils/DateUtils";
import {useTripService} from "../../service/useService";
import {Page} from "../../model/Page";

export default function TripList() {
  const tripService = useTripService();

  const [tripsPage, setTripsPage] = useState<Page<Trip>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  useEffect(() => {
    if (tripService !== null) {
      tripService.getTrips().then((trips: Page<Trip>) => {
        setTripsPage(trips);
      });
    }
  }, [currentPageNumber]);

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
          {tripsPage?.content ? tripsPage?.content.map(trip => {
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