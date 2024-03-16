import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner} from "@coreui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import "react-datepicker/dist/react-datepicker.css";
import {DateInput} from "../../components/DateInput";
import {Trip} from "../../model/Trip";
import Select from "react-select";
import {Cargo} from "../../model/Cargo";
import DateUtils from "../../utils/DateUtils";
import {useCargoService, useTripService, useVoucherService} from "../../service/useService";
import {Page} from "../../model/Page";
import {SpinnerContainer} from "../../utils/SpinnerContainer";


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

  const navigate = useNavigate();

  const {voucherId} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    if (cargoService !== null) {
      cargoService.getCargos().then((cargos: Page<Cargo>) => {
        setCargoOptions(cargos.content.map(cargo => ({label: cargo.name, value: cargo.id} as SelectionOption)));
      });
    }

    if (tripService !== null) {
      tripService.getTrips().then((trips: Page<Trip>) => {
        setTripOptions(trips.content.map(trip => ({
          label: trip.from + "-" + trip.to + "-" + DateUtils.toString(trip.startDate),
          value: trip.id
        } as SelectionOption)));
      });
    }
  }, [cargoService, tripService]);

  useEffect(() => {
    if (voucherId && voucherService && tripOptions && cargoOptions) {
      setLoading(true);
      voucherService.getVoucher(Number(voucherId)).then(v => {
        if (v) {
          setVoucher(v);
          setSelectedTripOption(tripOptions.filter(option => option.value === v.tripId)[0]);
          setSelectedCargoOption(cargoOptions.filter(option => option.value === v.cargoId)[0]);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    setValidated(true);
    setCargoValid(!!selectedCargoOption);
    setTripValid(!!selectedTripOption);
    if (form.checkValidity()) {
      setSubmitting(true);
      const formData = new FormData(form);
      const voucher = Voucher.from(formData);

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
              <Select name="cargoId" id="cargoId" options={cargoOptions} isClearable={true} required
                      onChange={handleCargoChange}
                      value={selectedCargoOption}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: validated ? (cargoValid ? '#2eb85c' : 'red') : 'gray',
                        }),
                      }}/>
              <CFormFeedback invalid style={{display: cargoValid ? 'none' : 'block'}}>
                Please select a cargo.
              </CFormFeedback>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel htmlFor="tripId">Trip</CFormLabel>
              <Select name="tripId" id="tripId" options={tripOptions} isClearable={true}
                      onChange={handleTripChange}
                      value={selectedTripOption}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: validated ? (tripValid ? '#2eb85c' : 'red') : 'gray',
                        }),
                      }}/>
              <CFormFeedback invalid style={{display: tripValid ? 'none' : 'block'}}>
                Trip is not valid
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
              <CFormInput name="dr" type="number" id="dr" label="Dr" required
                          feedbackInvalid="Enter the Debit amount" defaultValue={voucher?.dr?.toString() ?? undefined}/>
            </CCol>
            <CCol>
              <CFormInput name="cr" type="number" id="cr" label="Cr" required
                          feedbackInvalid="Enter the Credit amount"
                          defaultValue={voucher?.cr?.toString() ?? undefined}/>
            </CCol>
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