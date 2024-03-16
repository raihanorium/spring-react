import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CSpinner} from "@coreui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Trip} from "../../model/Trip";
import "react-datepicker/dist/react-datepicker.css";
import {DateInput} from "../../components/DateInput";
import {Company} from "../../model/Company";
import Select from "react-select";
import {Cargo} from "../../model/Cargo";
import {useCargoService, useCompanyService, useTripService} from "../../service/useService";
import {Page} from "../../model/Page";
import {SpinnerContainer} from "../../utils/SpinnerContainer";


export default function TripForm() {

  type CompanyOption = { label: string, value: string };
  type CargoOption = { label: string, value: string };

  const tripService = useTripService();
  const companyService = useCompanyService();
  const cargoService = useCargoService();

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>();
  const [cargoOptions, setCargoOptions] = useState<CargoOption[]>();

  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [selectedCompanyOption, setSelectedCompanyOption] = useState<CompanyOption | null>(null);
  const [companyValid, setCompanyValid] = useState(true);

  const [selectedCargoOption, setSelectedCargoOption] = useState<CargoOption | null>(null);
  const [cargoValid, setCargoValid] = useState(true);

  const navigate = useNavigate();

  const {tripId} = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompanyChange = (selectedOption: any) => {
    setSelectedCompanyOption(selectedOption);
    setCompanyValid(!!selectedOption);
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
    setCompanyValid(!!selectedCompanyOption);
    setCargoValid(!!selectedCargoOption);
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
        setCompanyOptions(companies.content.map(company => ({
          label: company.name,
          value: company.id
        } as CompanyOption)));
      });
    }

    if (cargoService !== null) {
      cargoService.getCargos().then((cargos: Page<Cargo>) => {
        setCargoOptions(cargos.content.map(cargo => ({label: cargo.name, value: cargo.id} as CargoOption)));
      });
    }
  }, [companyService, cargoService]);

  useEffect(() => {
    if (tripId && tripService && companyOptions && cargoOptions) {
      setLoading(true);
      tripService.getTrip(Number(tripId)).then(t => {
        if (t) {
          setTrip(t);
          setSelectedCompanyOption(companyOptions.filter(option => option.value === t.companyId)[0]);
          setSelectedCargoOption(cargoOptions.filter(option => option.value === t.cargoId)[0]);
          setStartDate(t.startDate);
          setEndDate(t.endDate);
        }
      }).finally(() => setLoading(false));
    } else {
      setTrip(null);
    }
  }, [tripId, companyOptions, cargoOptions, tripService]);

  return (
      <SpinnerContainer loading={loading}>
        <CForm className="row g-3 needs-validation pt-2"
               noValidate
               validated={validated}
               onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol>
              {tripId && <CFormInput name="id" type="hidden" id="id" value={tripId}/>}

              <CFormLabel htmlFor="companyId">Company</CFormLabel>
              <Select name="companyId" id="companyId" options={companyOptions} isClearable={true} required
                      onChange={handleCompanyChange}
                      value={selectedCompanyOption}
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
                          feedbackInvalid="Enter where the trip starts from" defaultValue={trip?.from ?? undefined}/>
            </CCol>
            <CCol>
              <CFormInput name="to" type="text" id="to" label="To" required
                          feedbackInvalid="Enter trip destination" defaultValue={trip?.to ?? undefined}/>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput name="rent" type="number" id="rent" label="Rent" required
                          feedbackInvalid="Rent amount" defaultValue={trip?.rent ?? undefined}/>
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