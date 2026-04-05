'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
} from '@mui/material';
import { MyLink } from '@/components/commun/link';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import Image from 'next/image';
import './navbar.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoDevfest from '@/images/logo-blanc.png';
import { Flag } from '@/components/commun/flags';
import { DesktopOnlySx, MobileOnlySx } from '@/helpers/responsive';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToggleDrawerType = (openTarget: boolean) => (event: any) => void;

export const MenuNavbar: React.FC<
  React.PropsWithChildren<{ locale: string }>
> = ({ children, locale }) => {
  const [isOpen, setDrawerOpen] = React.useState(false);
  const pathname = usePathname().replace(/^\/en\/?/, '/');

  const toggleDrawer: ToggleDrawerType = (openTarget) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(openTarget);
  };

  React.useEffect(() => {
    document.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.remove('active-link');
      if (pathname.replace(/^\/en\//, '/') === item.getAttribute('href')) {
        item.classList.add('active-link');
      }
    });
  }, [pathname]);

  return (
    <>
      <Topbar toggleDrawer={toggleDrawer} locale={locale}>
        {children}
      </Topbar>

      <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} locale={locale}>
        {children}
      </DrawerMenu>
    </>
  );
};

const Topbar: React.FC<
  React.PropsWithChildren<{
    toggleDrawer: ToggleDrawerType;
    locale: string;
  }>
> = ({ children, toggleDrawer, locale }) => {
  return (
    <AppBar position='fixed'>
      <Toolbar className='toolbar'>
        <Box className='top-bar-left'>
          <MyLink href='/'>
            <Image
              className='logo-top-bar'
              src={LogoDevfest}
              alt='Logo Devfest'
              style={{ width: '100px', height: 'auto' }}
            />
          </MyLink>
        </Box>

        <Box sx={DesktopOnlySx} className='top-bar-right menu-desktop'>
          <List>
            {children}
            <ListItemButton style={{ width: '100%' }}>
              <ToggleLanguage locale={locale} />
            </ListItemButton>
          </List>
        </Box>
        <Box sx={MobileOnlySx} className='top-bar-right'>
          <IconButton
            edge='start'
            aria-label='open menu'
            onClick={toggleDrawer(true)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const DrawerMenu: React.FC<
  React.PropsWithChildren<{
    toggleDrawer: ToggleDrawerType;
    isOpen: boolean;
    locale: string;
  }>
> = ({ children, isOpen, toggleDrawer, locale }) => (
  <Drawer
    sx={MobileOnlySx}
    anchor='bottom'
    variant='temporary'
    open={isOpen}
    onClose={toggleDrawer(false)}
  >
    <Box
      role='presentation'
      onKeyDown={toggleDrawer(true)}
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton
          style={{
            height: '50px',
            justifyContent: 'end',
            marginRight: '20px',
          }}
        >
          <Box
            alignContent='start'
            width='100%'
            marginLeft='calc( 2*var(--mui-spacing))'
          >
            <ToggleLanguage locale={locale} />
          </Box>
          <IconButton aria-label='close menu'>
            <CloseRounded />
          </IconButton>
        </ListItemButton>
        <Divider />
        {children}
      </List>
    </Box>
  </Drawer>
);

export const ToggleLanguage: React.FC<{ locale: string }> = ({ locale }) => {
  const targetLocale = locale == 'en' ? 'fr' : 'en';
  const pathname = usePathname();

  // Build the target URL by swapping the locale prefix
  const segments = pathname.split('/');
  // segments[0] is '', segments[1] is the locale ('en' or 'fr')
  segments[1] = targetLocale;
  const targetPath = segments.join('/');

  return (
    <Link href={targetPath} style={{ width: '100%', textAlign: 'center' }}>
      <Flag lang={targetLocale} />
    </Link>
  );
};
