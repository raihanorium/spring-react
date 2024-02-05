import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner} from "@coreui/react";
import {useNavigate} from "react-router-dom";
import {Trip} from "../../model/Trip";
import "react-datepicker/dist/react-datepicker.css";
import {DateInput} from "../../components/DateInput";
import {Company} from "../../model/Company";
import Select from "react-select";
import {Cargo} from "../../model/Cargo";
import {useCargoService, useCompanyService, useTripService} from "../../service/useService";
import {Page} from "../../model/Page";


export default function TripForm() {
  const tripService = useTripService();
  const companyService = useCompanyService();
  const cargoService = useCargoService();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [companies, setCompanies] = useState<Company[]>();
  const [cargos, setCargos] = useState<Cargo[]>();

  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [companyId, setCompanyId] = useState(null);
  const [companyValid, setCompanyValid] = useState(true);

  const [cargoId, setCargoId] = useState(null);
  const [cargoValid, setCargoValid] = useState(true);

  const navigate = useNavigate();

  const handleCompanyChange = (selectedOption: any) => {
    setCompanyId(selectedOption);
    setCompanyValid(!!selectedOption);
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
    setCompanyValid(!!companyId);
    setCargoValid(!!cargoId);
    if (form.checkValidity()) {
      setSubmitting(true);
      const formData = new FormData(form);
      const trip = Trip.from(formData);

      if (tripService !== null) {
        tripService.saveTrip(trip).then(() => {
          navigate("/trip");
        }).catch(reason => {
          alert(reason);
          setSubmitting(false)
        });
        return;
      }
    }
  }

  useEffect(() => {
    if (companyService !== null) {
      companyService.getCompanies().then((companies: Page<Company>) => {
        setCompanies(companies.content);
      });
    }

    if (cargoService !== null) {
      cargoService.getCargos().then((cargos: Page<Cargo>) => {
        setCargos(cargos.content);
      });
    }
  }, []);

  const companyOptions = companies ? companies
      .map(company => ({label: company.name, value: company.id})) : [];

  const cargoOptions = cargos ? cargos
      .map(cargo => ({label: cargo.name, value: cargo.id})) : [];

  return (
      <CForm className="row g-3 needs-validation pt-2"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}>
        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="companyId">Company</CFormLabel>
            <Select name="companyId" id="companyId" options={companyOptions} isClearable={true} required
                    onChange={handleCompanyChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: validated ? (companyValid ? '#2eb85c' : 'red') : 'gray',
                      }),
                    }}/>
            <CFormFeedback invalid style={{display: companyValid ? 'none' : 'block'}}>
              Please select a company.
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
            <DateInput id="startDate" controlName="startDate" label="Start Date" requiredField={true}
                       invalidFeedback="Enter start date" dateValue={startDate} setDateValue={setStartDate}/>
          </CCol>
          <CCol>
            <DateInput id="endDate" controlName="endDate" label="End Date" requiredField={true}
                       invalidFeedback="Enter end date" dateValue={endDate} setDateValue={setEndDate}/>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormInput name="from" type="text" id="from" label="From" required
                        feedbackInvalid="Enter where the trip starts from"/>
          </CCol>
          <CCol>
            <CFormInput name="to" type="text" id="to" label="To" required
                        feedbackInvalid="Enter trip destination"/>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormInput name="rent" type="number" id="rent" label="Rent" required
                        feedbackInvalid="Rent amount"/>
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