import * as React from 'react';
import {useEffect, useState} from 'react';
import {CCol, CRow} from "@coreui/react";
import {Link} from "react-router-dom";
import {Trip} from "../../model/Trip";
import DateUtils from "../../utils/DateUtils";
import {useTripService} from "../../service/useService";
import {Page} from "../../model/Page";
import {Pagination} from "../../utils/Pagination";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import {Cargo} from "../../model/Cargo";
import {FormattedCurrency} from "../../components/FormattedCurrency";
import {PageParams} from "../../model/PageParams";

type Props = {
  cargo?: Cargo | null
};

export default function TripList(props: Props) {
  const tripService = useTripService();

  const [tripsPage, setTripsPage] = useState<Page<Trip>>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tripService !== null) {
      setLoading(true);
      const tripsPage = props.cargo ?
          tripService.getTripsByCargo(Number(props.cargo.id), currentPageNumber) :
          tripService.getTrips(new PageParams('', currentPageNumber));
      tripsPage.then((trips: Page<Trip>) => {
        setTripsPage(trips);
      }).finally(() => setLoading(false));
    }
  }, [currentPageNumber]);

  return (
      <SpinnerContainer loading={loading}>
        {tripsPage?.content && tripsPage?.content.map(trip => {
          return (
              <CRow key={trip.id} className="list-item">
                <CCol>
                  <p className="mb-1"><Link to={`/cargo/detail/${trip.cargoId}`}>{trip.cargoTitle}</Link></p>
                  <p className="mb-0">
                    <small className="mb-1 text-secondary">From {trip.from} to {trip.to} for {trip.companyTitle}</small>
                  </p>
                </CCol>
                <CCol sm={2}>
                  <small>
                    <span>Rent:</span>
                    <span className="float-end"><FormattedCurrency number={trip.rent}/></span>
                  </small>
                  {(trip.getTotalCost() > 0) && (
                      <>
                        <br/>
                        <small className="text-secondary">
                          <span>Total Cost:</span>
                          <span className="float-end"><FormattedCurrency number={trip.getTotalCost()}/></span>
                        </small>
                      </>
                  )}
                  {((trip.companyRent || 0) > 0) && (
                      <>
                        <br/>
                        <small className="text-secondary">
                          <span>Company Rent:</span>
                          <span className="float-end"><FormattedCurrency number={trip.companyRent}/></span>
                        </small>
                      </>
                  )}
                  {trip.getNetProfit() && (
                      <>
                        <br/>
                        <small className="text-secondary">
                          <span>Net Profit:</span>
                          <span className="float-end"><FormattedCurrency number={trip.getNetProfit()}/></span>
                        </small>
                      </>
                  )}
                </CCol>
                <CCol sm={2} className="text-secondary">
                  {((trip.load || 0) > 0) && (
                      <small>
                        <span>Load:</span>
                        <span className="float-end"><FormattedCurrency number={trip.load}/></span>
                      </small>
                  )}
                  {((trip.rate || 0) > 0) && (
                      <>
                        <br/>
                        <small>
                          <span>Rate:</span>
                          <span className="float-end"><FormattedCurrency number={trip.rate}/></span>
                        </small>
                      </>
                  )}
                  {((trip.shortage || 0) > 0) && (
                      <>
                        <br/>
                        <small>
                          <span>Shortage:</span>
                          <span className="float-end"><FormattedCurrency number={trip.shortage}/></span>
                        </small>
                      </>
                  )}
                  {((trip.shortageRate || 0) > 0) && (
                      <>
                        <br/>
                        <small>
                          <span>Shortage Rate:</span>
                          <span className="float-end"><FormattedCurrency number={trip.shortageRate}/></span>
                        </small>
                      </>
                  )}
                </CCol>
                <CCol>
                  <small className="text-secondary float-end">
                    {DateUtils.toString(trip.startDate)}
                    ~
                    {DateUtils.toString(trip.endDate)}
                  </small>
                  <br/>
                  <small className="text-secondary float-end">
                    <Link to={'/trip/edit/' + trip.id}>Edit</Link>
                  </small>
                </CCol>
              </CRow>
          )
        })}
        <Pagination page={tripsPage} setCurrentPageNumber={setCurrentPageNumber}/>
      </SpinnerContainer>
  );
}