import { useContext } from 'react';
import React from 'react'
import Sidebar from './Sidebar';
import SuperSidebar from './SuperSidebar';
import UserSidebar from './UserSidebar';
import { AccountTypeContext } from '../../accountTypeContext';

function getSidebar(accountType) {
    console.log("Account type is: ", accountType?.userType)


    switch (accountType) {
        case 'donor':
            return UserSidebar
        case 'admin':
            return Sidebar
        case 'superadmin':
            return SuperSidebar
        default:
            return null;
    }
}

const Sidebars = () => {

    const accountType = useContext(AccountTypeContext)

    const SidebarComponent = getSidebar(accountType);

    return SidebarComponent ? <SidebarComponent /> : null;

}

export default Sidebars