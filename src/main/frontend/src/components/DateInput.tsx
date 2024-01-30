import * as React from 'react';
import {createElement} from 'react';
import {CFormFeedback, CFormLabel, CInputGroup, CInputGroupText} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilCalendar} from "@coreui/icons";
import DatePicker from "react-datepicker";

const DATE_FORMAT: string = "dd-MMM-yyyy";

interface DateInputProps {
  id: string,
  controlName: string,
  label: string,
  dateValue: any,
  setDateValue: React.Dispatch<React.SetStateAction<any>>,
  dateFormat?: string,
  requiredField?: boolean,
  invalidFeedback?: string
}

export function DateInput(props: DateInputProps) {
  const CustomInput = (htmlProps: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
        <>
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilCalendar}/>
            </CInputGroupText>
            <input type="text" {...htmlProps} className="form-control rounded-end" required={props.requiredField}
                   autoComplete="off"/>

            {props.invalidFeedback && <CFormFeedback invalid>{props.invalidFeedback}</CFormFeedback>}
          </CInputGroup>
        </>
    );
  };

  return (
      <>
        {props.label && <CFormLabel htmlFor={props.id}>{props.label}</CFormLabel>}

        <DatePicker id={props.id} selected={props.dateValue} name={props.controlName}
                    wrapperClassName="form-control" onChange={(date: any) => props.setDateValue(date)}
                    dateFormat={props.dateFormat ? props.dateFormat : DATE_FORMAT}
                    customInput={createElement(React.forwardRef(CustomInput))}/>
      </>
  );
}