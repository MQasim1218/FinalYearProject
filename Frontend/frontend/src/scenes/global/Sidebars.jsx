import { useContext } from 'react';
import React from 'react'
import Sidebar from './Sidebar';
import SuperSidebar from './SuperSidebar';
import UserSidebar from './UserSidebar';
import BeneficiarySidebar from './BeneficiarySidebar';
import { AccountTypeContext } from '../../accountTypeContext';

function getSidebar(accountType) {
    console.log("Account type is: ", accountType?.userType)


    switch (accountType?.userType) {
        case 'donor':
            return UserSidebar
        case 'admin':
            return Sidebar
        case 'superadmin':
            return SuperSidebar
        case 'beneficiary':
            return BeneficiarySidebar
        default:
            return null;
    }
}

const Sidebars = () => {

    const accountType = useContext(AccountTypeContext)

    console.log("")

    const SidebarComponent = getSidebar(accountType);

    return SidebarComponent ? <SidebarComponent /> : null;

}

export default Sidebars