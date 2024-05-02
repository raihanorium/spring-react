// @flow
import * as React from 'react';

type Props = {
  number: number | null
};

export function FormattedCurrency(props: Props) {
  function format(number: number) {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: "code"
    })
        .format(number)
        .replace('BDT', "")
        .trim();
  }

  return (
      props.number !== null ? <span style={props.number < 0 ? {color: 'red'} : undefined}>{format(props.number)}</span> : null
  );
}