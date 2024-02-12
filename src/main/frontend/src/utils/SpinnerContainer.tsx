import * as React from 'react';
import {CSpinner} from "@coreui/react";
import './SpinnerContainer.scss';

type Props = {
  loading: boolean;
  children: React.ReactNode;
};

export function SpinnerContainer(props: Props) {
  return (
      <div className="spinner-container">
        {props.loading && (
            <div className="d-flex justify-content-center overlay">
              <CSpinner color="primary"/>
            </div>
        )}
        {props.children}
      </div>
  );
};