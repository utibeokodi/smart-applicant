import React from 'react';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon'
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@material-ui/core';

function createIcon(IconComponent) {
  return <SvgIcon component={IconComponent} viewBox="0 0 24 24" />;
}

export const items = [
  {
    title: 'Create New Apply Board',
    path: '/dashboard/create-new-apply-board',
    icon: createIcon(PlusCircleIcon),
  },
  {
    title: 'View Apply Boards',
    path: '/dashboard/view-apply-boards',
    icon: createIcon(EyeIcon),
  },
  {
    title: 'Profile',
    path: '/dashboard/your-profile',
    icon: createIcon(UsersIcon),
  },
  {
    title: 'Personalised Feedback',
    path: '/dashboard/personalised-feedback',
    icon: createIcon(UserCircleIcon),
  },
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: createIcon(QuestionMarkCircleIcon),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: createIcon(CogIcon),
  },
  {
    title: 'Upgrade your account',
    path: '/dashboard/upgrade-your-account',
    icon: createIcon(CurrencyDollarIcon),
  },
  {
    title: 'Logout',
    path: '',
    icon: createIcon(XCircleIcon),
  },
];
