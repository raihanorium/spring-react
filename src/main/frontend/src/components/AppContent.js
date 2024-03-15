import React, {Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CSpinner} from '@coreui/react'
import routes from '../routes'
import {Home} from "../pages/Home";
import {CompanyForm, CompanyLayout, CompanyList} from "../pages/company";
import {CargoForm, CargoLayout, CargoList} from "../pages/cargo";
import {TripForm, TripLayout, TripList} from "../pages/trip";
import {VoucherForm, VoucherLayout, VoucherList} from "../pages/voucher";

const AppContent = () => {
  return (
      <Suspense fallback={<CSpinner color="primary"/>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
                route.element && (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element/>}
                    />
                )
            )
          })}
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Navigate to="dashboard" replace/>}/>
          <Route path="/company" element={<CompanyLayout/>}>
            <Route index element={<CompanyList/>}/>
            <Route path="new" element={<CompanyForm/>}/>
            <Route path="edit/:companyId" element={<CompanyForm/>}/>
          </Route>
          <Route path="/cargo" element={<CargoLayout/>}>
            <Route index element={<CargoList/>}/>
            <Route path="new" element={<CargoForm/>}/>
            <Route path="edit/:cargoId" element={<CargoForm/>}/>
          </Route>
          <Route path="/trip" element={<TripLayout/>}>
            <Route index element={<TripList/>}/>
            <Route path="new" element={<TripForm/>}/>
          </Route>
          <Route path="/voucher" element={<VoucherLayout/>}>
            <Route index element={<VoucherList/>}/>
            <Route path="new" element={<VoucherForm/>}/>
          </Route>
        </Routes>
      </Suspense>
  )
}

export default React.memo(AppContent)
