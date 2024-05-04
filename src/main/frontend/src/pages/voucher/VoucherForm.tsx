import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner} from "@coreui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import "react-datepicker/dist/react-datepicker.css";
import {DateInput} from "../../components/DateInput";
import {useCargoService, useTripService, useVoucherService} from "../../service/useService";
import {SpinnerContainer} from "../../utils/SpinnerContainer";
import {PageParams} from "../../model/PageParams";
import {SelectionOption} from "../../model/SelectionOption";
import {AsyncPaginate} from "react-select-async-paginate";


export default function VoucherForm() {
  const voucherService = useVoucherService();
  const tripService = useTripService();
  const cargoService = useCargoService();

  const [date, setDate] = useState<Date | null>();
  const [tripOptions, setTripOptions] = useState<SelectionOption[]>();
  const [cargoOptions, setCargoOptions] = useState<SelectionOption[]>();

  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [selectedTripOption, setSelectedTripOption] = useState<SelectionOption | null>(null);
  const [tripValid, setTripValid] = useState(true);

  const [selectedCargoOption, setSelectedCargoOption] = useState<SelectionOption | null>(null);
  const [cargoValid, setCargoValid] = useState(true);

  const [amountValid, setAmountValid] = useState(true);

  const navigate = useNavigate();

  const {voucherId} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    if (voucherId && voucherService) {
      setLoading(true);
      voucherService.getVoucher(Number(voucherId)).then(v => {
        if (v) {
          setVoucher(v);
          v.tripId && setSelectedTripOption(SelectionOption.from(v.tripTitle, v.tripId));
          v.cargoId && setSelectedCargoOption(SelectionOption.from(v.cargoTitle, v.cargoId));
          setDate(v.date);
        }
      }).finally(() => setLoading(false));
    } else {
      setVoucher(null);
    }
  }, [voucherId, tripOptions, cargoOptions, voucherService]);

  const handleTripChange = (selectedOption: any) => {
    setSelectedTripOption(selectedOption);
    setTripValid(!!selectedOption);
  };

  const handleCargoChange = (selectedOption: any) => {
    setSelectedCargoOption(selectedOption);
    setCargoValid(!!selectedOption);
  };

  function isAmountValid(voucher: Voucher) {
    const drAmount = Number(voucher.dr) | 0;
    const crAmount = Number(voucher.cr) | 0;
    return (drAmount == 0 || crAmount == 0) && drAmount != crAmount;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    const formData = new FormData(form);
    const voucher = Voucher.from(formData);
    setValidated(true);
    setCargoValid(!!selectedCargoOption);
    setTripValid(!!selectedTripOption);
    setAmountValid(isAmountValid(voucher));

    if (form.checkValidity() && isAmountValid(voucher)) {
      setSubmitting(true);

      if (voucherService !== null) {
        voucherService.saveVoucher(voucher).then(() => {
          navigate("/voucher");
        }).catch(reason => {
          alert(reason);
          setSubmitting(false)
        });
        return;
      }
    }
  }

  return (
      <SpinnerContainer loading={loading}>
        <CForm className="row g-3 needs-validation pt-2"
               noValidate
               validated={validated}
               onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol>
              {voucherId && <CFormInput name="id" type="hidden" id="id" value={voucherId}/>}

              <CFormLabel htmlFor="cargoId">Cargo</CFormLabel>
              <AsyncPaginate
                  name="cargoId" id="cargoId" isClearable={true} required
                  value={selectedCargoOption}
                  loadOptions={async (search, prevOptions) => {
                    if (cargoService) {
                      let pageParams = PageParams.fromSearch(search);
                      pageParams.page = pageParams.size ? prevOptions.length / pageParams.size : 0;
                      pageParams.direction = 'desc';
                      const page = await cargoService.getCargos(pageParams);
                      return {
                        options: page.content.map(cargo => SelectionOption.from(cargo.name, cargo.id)),
                        hasMore: page.totalElements > page.number * page.size + page.content.length
                      };
                    }
                    return {options: [], hasMore: false, additional: {page: 0}};
                  }}
                  onChange={handleCargoChange}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: validated ? (cargoValid ? '#2eb85c' : 'red') : 'gray',
                    }),
                  }}
              />
              <CFormFeedback invalid style={{display: cargoValid ? 'none' : 'block'}}>
                Please select a cargo.
              </CFormFeedback>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel htmlFor="tripId">Trip</CFormLabel>
              <AsyncPaginate
                  name="tripId" id="tripId" isClearable={true} required
                  value={selectedTripOption}
                  loadOptions={async (search, prevOptions) => {
                    if (tripService) {
                      let pageParams = PageParams.fromSearch(search);
                      pageParams.page = pageParams.size ? prevOptions.length / pageParams.size : 0;
                      pageParams.direction = 'desc';
                      const page = await tripService.getTrips(pageParams);
                      return {
                        options: page.content.map(trip => SelectionOption.from(trip.getLabel(), trip.id)),
                        hasMore: page.totalElements > page.number * page.size + page.content.length
                      };
                    }
                    return {options: [], hasMore: false, additional: {page: 0}};
                  }}
                  onChange={handleTripChange}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: validated ? (tripValid ? '#2eb85c' : 'red') : 'gray',
                    }),
                  }}
              />
              <CFormFeedback invalid style={{display: tripValid ? 'none' : 'block'}}>
                Please select a trip
              </CFormFeedback>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput name="voucherNo" type="text" id="voucherNo" label="Voucher No" required
                          feedbackInvalid="Enter the voucher number" defaultValue={voucher?.voucherNo ?? undefined}/>
            </CCol>
            <CCol>
              <DateInput id="date" controlName="date" label="Date" requiredField={true}
                         invalidFeedback="Enter voucher date" dateValue={date} setDateValue={setDate}/>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput name="dr" type="number" id="dr" label="Dr" required min={0}
                          feedbackInvalid="Enter the Debit amount"
                          defaultValue={voucher?.dr?.toString() ?? undefined}/>
            </CCol>
            <CCol>
              <CFormInput name="cr" type="number" id="cr" label="Cr" required min={0}
                          feedbackInvalid="Enter the Credit amount"
                          defaultValue={voucher?.cr?.toString() ?? undefined}/>
            </CCol>
            <CFormFeedback invalid style={{display: amountValid ? 'none' : 'block'}}>
              One of the Dr or Cr amount must be 0.
            </CFormFeedback>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput name="particular" type="text" id="particular" label="Particular" required autoComplete="on"
                          feedbackInvalid="Enter the voucher particular"
                          defaultValue={voucher?.particular ?? undefined}/>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CButton color="primary" type="submit" disabled={submitting}>
                {submitting && <CSpinner component="span" size="sm" aria-hidden="true" className="me-2"/>}
                Save
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </SpinnerContainer>
  );
}