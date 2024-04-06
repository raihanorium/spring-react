import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useCargoService} from "../../service/useService";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import {CargoDetailsDto} from "../../model/CargoDetailsDto";
import {CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CCol, CRow} from "@coreui/react";
import {TripList} from "../trip";
import {VoucherList} from "../voucher";
import {FormattedCurrency} from "../../components/FormattedCurrency";

export default function CargoDetail() {
  const {cargoId} = useParams();
  const cargoService = useCargoService();

  const [loading, setLoading] = useState<boolean>(false);
  const [cargoDetails, setCargoDetails] = useState<CargoDetailsDto | null>(null);

  useEffect(() => {
    if (cargoService !== null && cargoId) {
      setLoading(true);
      cargoService.getCargoDetails(Number(cargoId)).then((cargo: CargoDetailsDto) => {
        setCargoDetails(cargo);
      }).finally(() => setLoading(false));
    }
  }, [cargoService, cargoId]);

  return (
      <SpinnerContainer loading={loading}>
        {cargoDetails && (
            <>
              <CRow>
                <CCol>
                  <h4>{cargoDetails.cargo?.name}</h4>
                  <p>
                    {cargoDetails.cargo?.proprietor && <>
                      <strong>Proprietor:</strong> {cargoDetails.cargo?.proprietor}<br/></>}
                    {cargoDetails.cargo?.address && <><strong>Address:</strong> {cargoDetails.cargo?.address}<br/></>}
                    {cargoDetails.cargo?.contactNo && <><strong>Contact
                      No:</strong> {cargoDetails.cargo?.contactNo}<br/></>}
                    {cargoDetails.cargo?.reference && <>
                      <strong>Reference:</strong> {cargoDetails.cargo?.reference}<br/></>}
                  </p>
                </CCol>
                <CCol>
                  <h4>Details</h4>
                  <p>
                    <><strong>Total Rent:</strong> <FormattedCurrency number={cargoDetails.totalRent}/><br/></>
                    <><strong>Total Return:</strong> <FormattedCurrency number={cargoDetails.totalReturn}/><br/></>
                    <><strong>Total Paid:</strong> <FormattedCurrency number={cargoDetails.totalPaid}/><br/></>
                    <><strong>Balance:</strong> <FormattedCurrency number={cargoDetails.balance}/><br/></>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CAccordion alwaysOpen>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader><h5>Trips</h5></CAccordionHeader>
                    <CAccordionBody>
                      <TripList cargo={cargoDetails.cargo}/>
                    </CAccordionBody>
                  </CAccordionItem>

                  <CAccordionItem itemKey={2}>
                    <CAccordionHeader><h5>Vouchers</h5></CAccordionHeader>
                    <CAccordionBody>
                      <VoucherList cargo={cargoDetails.cargo}/>
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </CRow>
            </>
        )}
      </SpinnerContainer>
  );
}