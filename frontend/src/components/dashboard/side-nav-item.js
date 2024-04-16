import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Button } from 'theme-ui';
import Cookies from 'js-cookie';

const themeObject = {
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
    },
    colors: {
        grey: {
            400: "#bdbdbd",
            500: "#9e9e9e"
        },
        primary: {
            main: '#6366F1'
        },
        common: {
            white: "#fff"
        }
    },
    space: [0, 0, '16px']
};

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const handleLogout = () => {
    Cookies.remove('jwtToken');

    window.location.href = '/login';
  };

  const content = (
    <Button
      onClick={title === 'Logout' ? handleLogout : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%',
        padding: 2,
        color: themeObject.colors.grey[400],
        backgroundColor: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: themeObject.space[2],
            color: active ? themeObject.colors.primary.main : themeObject.colors.grey[400],
          }}
        >
         {icon}
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1,
          fontSize: 2,
          fontWeight: 'bold',
          lineHeight: 'body',
          whiteSpace: 'nowrap',
          color: active ? themeObject.colors.common.white : disabled ? themeObject.colors.grey[500] : themeObject.colors.grey[400],
        }}
      >
        {title}
      </Box>
    </Button>
  );

  if (path) {
    return (
      <li>
        {external ? (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <NextLink href={path} passHref>
            {content}
          </NextLink>
        )}
      </li>
    );
  }

  if (title === 'Logout') {
    return (
      <li>
        <a href="#" onClick={handleLogout}>
          {content}
        </a>
      </li>
    );
  }

  return <li>{content}</li>;
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
