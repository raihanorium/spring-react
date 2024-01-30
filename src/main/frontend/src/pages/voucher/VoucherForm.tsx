import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner} from "@coreui/react";
import firestore from "../../firebase";
import {addDoc, collection, onSnapshot} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {Voucher} from "../../model/Voucher";
import "react-datepicker/dist/react-datepicker.css";
import {DateInput} from "../../components/DateInput";
import {Trip} from "../../model/Trip";
import Select from "react-select";
import {Cargo} from "../../model/Cargo";
import DateUtils from "../../utils/DateUtils";


export default function VoucherForm() {
  const [date, setDate] = useState();
  const [trips, setTrips] = useState<Trip[]>();
  const [cargos, setCargos] = useState<Cargo[]>();

  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [tripId, setTripId] = useState(null);
  const [tripValid, setTripValid] = useState(true);

  const [cargoId, setCargoId] = useState(null);
  const [cargoValid, setCargoValid] = useState(true);

  const navigate = useNavigate();

  const handleTripChange = (selectedOption: any) => {
    setTripId(selectedOption);
    setTripValid(!!selectedOption);
  };

  const handleCargoChange = (selectedOption: any) => {
    setCargoId(selectedOption);
    setCargoValid(!!selectedOption);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    setValidated(true);
    setTripValid(!!tripId);
    setCargoValid(!!cargoId);
    if (form.checkValidity()) {
      setSubmitting(true);
      const formData = new FormData(form);
      const voucher = Voucher.from(formData);

      addDoc(collection(firestore, 'vouchers'), voucher.toObject())
          .then(() => navigate("/voucher"))
          .catch(reason => {
            alert(reason);
            setSubmitting(false)
          });
    }
  }

  useEffect(() => {
    onSnapshot(collection(firestore, "trips"), (snapshot) => {
      setTrips(snapshot.docs.map(d => {
        return new Trip(
            d.id,
            d.get("companyId"),
            d.get("cargoId"),
            d.get('startDate').toDate(),
            d.get('endDate').toDate(),
            d.get('from'),
            d.get('to'),
            d.get('rent')
        );
      }))
    });

    onSnapshot(collection(firestore, "cargos"), (snapshot) => {
      setCargos(snapshot.docs.map(doc => {
        return new Cargo(
            doc.id,
            doc.get('name'),
            doc.get('proprietor'),
            doc.get('contactNo'),
            doc.get('address'),
            doc.get('reference')
        );
      }))
    });
  }, []);

  const tripOptions = trips ? trips
      .map(trip => ({
        label: trip.from + "-" + trip.to + "-" + DateUtils.toString(trip.startDate),
        value: trip.id
      })) : [];

  const cargoOptions = cargos ? cargos
      .map(cargo => ({label: cargo.name, value: cargo.id})) : [];

  return (
      <CForm className="row g-3 needs-validation pt-2"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="tripId">Trip</CFormLabel>
            <Select name="tripId" id="tripId" options={tripOptions} isClearable={true} required
                    onChange={handleTripChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: validated ? (tripValid ? '#2eb85c' : 'red') : 'gray',
                      }),
                    }}/>
            <CFormFeedback invalid style={{display: tripValid ? 'none' : 'block'}}>
              Please select a trip.
            </CFormFeedback>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="cargoId">Cargo</CFormLabel>
            <Select name="cargoId" id="cargoId" options={cargoOptions} isClearable={true} required
                    onChange={handleCargoChange}
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
            <CFormInput name="voucherNo" type="text" id="voucherNo" label="Voucher No" required
                        feedbackInvalid="Enter the voucher number"/>
          </CCol>
          <CCol>
            <DateInput id="date" controlName="date" label="Date" requiredField={true}
                       invalidFeedback="Enter voucher date" dateValue={date} setDateValue={setDate}/>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormInput name="dr" type="number" id="dr" label="Dr" required
                        feedbackInvalid="Enter the Debit amount"/>
          </CCol>
          <CCol>
            <CFormInput name="cr" type="number" id="cr" label="Cr" required
                        feedbackInvalid="Enter the Credit amount"/>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormInput name="particular" type="text" id="particular" label="Particular" required autoComplete="on"
                        feedbackInvalid="Enter the voucher particular"/>
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
  );
}