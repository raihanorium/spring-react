import React, {Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CSpinner} from '@coreui/react'
import routes from '../routes'
import {Home} from "../pages/Home";
import {CompanyForm, CompanyLayout, CompanyList} from "../pages/company";
import {CargoDetail, CargoForm, CargoLayout, CargoList} from "../pages/cargo";
import {TripForm, TripLayout, TripList} from "../pages/trip";
import {VoucherForm, VoucherLayout, VoucherList} from "../pages/voucher";
import DataManagementPage from "../pages/data-management/DataManagementPage";

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
            <Route path="detail/:cargoId" element={<CargoDetail/>}/>
          </Route>
          <Route path="/trip" element={<TripLayout/>}>
            <Route index element={<TripList/>}/>
            <Route path="new" element={<TripForm/>}/>
            <Route path="edit/:tripId" element={<TripForm/>}/>
          </Route>
          <Route path="/voucher" element={<VoucherLayout/>}>
            <Route index element={<VoucherList/>}/>
            <Route path="new" element={<VoucherForm/>}/>
            <Route path="edit/:voucherId" element={<VoucherForm/>}/>
          </Route>
          <Route path="/data-management" element={<DataManagementPage/>}/>
        </Routes>
      </Suspense>
  )
}

export default React.memo(AppContent)
