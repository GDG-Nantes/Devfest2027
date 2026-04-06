import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { MenuIcon, CloseIcon } from '@/components/icons/FlatIcons';

interface MenuItem {
  label: string;
  link: string;
  isActive: boolean;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
  targetPath: string;
  targetLocale: string;
  flagSrc: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems,
  targetPath,
  targetLocale,
  flagSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <>
      <IconButton
        edge='start'
        aria-label='open menu'
        onClick={toggleDrawer(true)}
        sx={{ color: 'white' }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='bottom'
        variant='temporary'
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderTop: '2px solid var(--secondary)',
          },
        }}
      >
        <Box
          role='presentation'
          onKeyDown={toggleDrawer(false)}
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItemButton
              sx={{
                height: '50px',
                justifyContent: 'end',
                marginRight: '20px',
              }}
            >
              <Box
                sx={{
                  alignContent: 'start',
                  width: '100%',
                  marginLeft: '16px',
                }}
              >
                <a href={targetPath} style={{ textAlign: 'center' }}>
                  <img
                    src={flagSrc}
                    alt={targetLocale}
                    width={24}
                    height={18}
                    style={{ objectFit: 'cover', verticalAlign: 'middle' }}
                  />
                </a>
              </Box>
              <IconButton aria-label='close menu' sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </ListItemButton>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.link}
                style={{
                  width: '100%',
                  textDecoration: 'none',
                  color: 'white',
                  borderBottom: item.isActive ? '1px solid white' : 'none',
                }}
              >
                <ListItemButton>
                  <ListItemText sx={{ textAlign: 'center' }}>
                    {item.label}
                  </ListItemText>
                </ListItemButton>
              </a>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
