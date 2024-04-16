import React from 'react';
import withAuth from '../../hocs/withAuth';
import UnPaidUser from './un-paid-user';

function Settings() {

    const isPaidUser = false;

    if (!isPaidUser){
        return (
            <UnPaidUser>
            </UnPaidUser>
            );
    }}

export default withAuth(Settings);
