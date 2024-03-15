import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {CButton, CCol, CForm, CFormInput, CRow, CSpinner} from "@coreui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function CargoForm() {
    const cargoService = useCargoService();
    const [validated, setValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const {cargoId} = useParams();
    const [cargo, setCargo] = useState<Cargo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        setValidated(true)
        if (form.checkValidity()) {
            setSubmitting(true);
            const formData = new FormData(form);
            const cargo = Cargo.from(formData);

            if (cargoService !== null) {
                cargoService.saveCargo(cargo).then(() => {
                    navigate("/cargo");
                }).catch(reason => {
                    alert(reason);
                    setSubmitting(false)
                });
                return;
            }
        }
    }

    useEffect(() => {
        if (cargoId && cargoService) {
            setLoading(true);
            cargoService.getCargo(Number(cargoId)).then(c => {
                if (c) {
                    setCargo(c);
                }
            }).finally(() => setLoading(false));
        } else {
            setCargo(null);
        }
    }, [cargoId]);

    return (
        <SpinnerContainer loading={loading}>
            <CForm className="row g-3 needs-validation pt-2"
                   noValidate
                   validated={validated}
                   onSubmit={handleSubmit}>
                <CRow className="mb-3">
                    <CCol>
                        {cargoId && <CFormInput name="id" type="hidden" id="id" value={cargoId}/>}

                        <CFormInput name="name" type="text" id="nme" label="Cargo Name" required
                                    feedbackInvalid="Put a cargo name" defaultValue={cargo?.name ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput name="proprietor" type="text" id="proprietor" label="Proprietor"
                                    defaultValue={cargo?.proprietor ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput type="text" name="contactNo" id="contactNo" label="Contact Number"
                                    defaultValue={cargo?.contactNo ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput type="text" name="address" id="address" label="Address"
                                    defaultValue={cargo?.address ?? undefined}/>
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol>
                        <CFormInput type="text" name="reference" id="reference" label="Reference"
                                    defaultValue={cargo?.reference ?? undefined}/>
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