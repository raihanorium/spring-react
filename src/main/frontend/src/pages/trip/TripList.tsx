import * as React from 'react';
import {useEffect, useState} from 'react';
import {CTable, CTableBody, CTableDataCell, CTableFoot, CTableRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Trip} from "../../model/Trip";
import DateUtils from "../../utils/DateUtils";
import {useTripService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function TripList() {
  const tripService = useTripService();

  const [tripsPage, setTripsPage] = useState<Page<Trip>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tripService !== null) {
      setLoading(true);
      tripService.getTrips(currentPageNumber).then((trips: Page<Trip>) => {
        setTripsPage(trips);
      }).finally(() => setLoading(false));
    }
  }, [currentPageNumber]);

  const columns = [
    {key: 'companyId', label: 'Company', _props: {scope: 'col'}},
    {key: 'cargoId', label: 'Cargo', _props: {scope: 'col'}},
    {key: 'startDate', label: 'Start Date', _props: {scope: 'col'}},
    {key: 'endDate', label: 'End Date', _props: {scope: 'col'}},
    {key: 'from', label: 'From', _props: {scope: 'col'}},
    {key: 'to', label: 'To', _props: {scope: 'col'}},
    {key: 'action', label: '', _props: {scope: 'col'}},
  ];

  return (
      <SpinnerContainer loading={loading}>
        <CTable striped hover columns={columns}>
          <CTableBody>
            {tripsPage?.content && tripsPage?.content.map(trip => {
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
                    <CTableDataCell>
                      <Link to={'/trip/edit/' + trip.id}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>)
            })}
          </CTableBody>
          <CTableFoot>
            <CTableRow>
              <CTableDataCell colSpan={7}>
                <Pagination page={tripsPage} setCurrentPageNumber={setCurrentPageNumber}/>
              </CTableDataCell>
            </CTableRow>
          </CTableFoot>
        </CTable>
      </SpinnerContainer>
  );
}