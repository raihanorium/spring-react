import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBoatAlt,
    cilBuilding,
    cilDescription,
    cilFlightTakeoff,
    cilHome,
    cilSpeedometer,
    cilStorage
} from '@coreui/icons'
import {CNavItem} from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'Home',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon"/>
    },
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavItem,
        name: 'Company',
        to: '/company',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon"/>
    },
    {
        component: CNavItem,
        name: 'Cargo',
        to: '/cargo',
        icon: <CIcon icon={cilBoatAlt} customClassName="nav-icon"/>
    },
    {
        component: CNavItem,
        name: 'Trip',
        to: '/trip',
        icon: <CIcon icon={cilFlightTakeoff} customClassName="nav-icon"/>
    },
    {
        component: CNavItem,
        name: 'Voucher',
        to: '/voucher',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon"/>
    },
    {
        component: CNavItem,
        name: 'Data Management',
        to: '/data-management',
        icon: <CIcon icon={cilStorage} customClassName="nav-icon"/>
    },
]

export default _nav
