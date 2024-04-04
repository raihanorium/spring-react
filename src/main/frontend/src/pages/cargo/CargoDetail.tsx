import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Cargo} from "../../model/Cargo";
import {useCargoService} from "../../service/useService";
import {SpinnerContainer} from "../../utils/SpinnerContainer";

export default function CargoDetail() {
  const {cargoId} = useParams();
  const cargoService = useCargoService();

  const [loading, setLoading] = useState<boolean>(false);
  const [cargo, setCargo] = useState<Cargo | null>(null);

  useEffect(() => {
    if (cargoService !== null && cargoId) {
      setLoading(true);
      cargoService.getCargo(Number(cargoId)).then((cargo: Cargo) => {
        setCargo(cargo);
      }).finally(() => setLoading(false));
    }
  }, [cargoService, cargoId]);

  return (
      <SpinnerContainer loading={loading}>
        {cargo && (
            <>
              <h4>{cargo.name}</h4>
              <p>
                {cargo.proprietor && <><strong>Proprietor:</strong> {cargo.proprietor} </>}
                {cargo.address && <><strong>Address:</strong> {cargo.address} </>}
                {cargo.contactNo && <><strong>Contact No:</strong> {cargo.contactNo} </>}
                {cargo.reference && <><strong>Reference:</strong> {cargo.reference} </>}
              </p>
            </>
        )}
      </SpinnerContainer>
  );
}