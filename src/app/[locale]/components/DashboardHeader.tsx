'use client';

import { useEffect, useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/close';
import MenuIcon from '@mui/icons-material/menu';

import LangButton from '@/components/LangButton';

const pages = ['aboutUs'];

const DashboardHeader = () => {
  const [menuWidth, setMenuWidth] = useState<string | number>('auto');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      // Set the menu width based on the screen width
      const screenWidth = window.innerWidth;
      setMenuWidth(screenWidth);
      // setMenuWidth(screenWidth > 600 ? 600 : 'auto');
    };

    // Initial setup
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const StyledMenu = styled(Menu)({
    '& .MuiPaper-root': {
      borderRadius: '0px 0px 15px 15px',
      boxShadow: 'none',
      width: menuWidth,
      // width: '100%',
      // minWidth: '95%',
      padding: 10,
      height: '425px',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    },
    // '& .MuiMenu-paper': {},
  });

  return (
    <AppBar component='nav' color='inherit' position='fixed'>
      <Toolbar
        // disableGutters
        sx={{
          // ml: {
          //   xs: 0,
          //   // md: '50px',
          // },
          width: '100%',
          border: 'none',
          // mb: 1,
        }}
      >
        {/* ------------------------------- Mobail --------------------------------------------------------------------------- */}
        <Box
          display={{ xs: 'flex', md: 'none' }}
          justifyContent='space-between'
          alignItems='center'
          flexGrow={1}
        >
          <Typography>Logo</Typography>
          <Box display='flex' gap={1}>
            <LangButton />
            <IconButton
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <StyledMenu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleClose} sx={{ p: 3 }}>
                  <Typography
                    textAlign='center'
                    fontWeight={500}
                    fontSize='18px'
                    fontFamily='Gotham Medium'
                  >
                    {t(`toolbar.${page}`)}
                  </Typography>
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>
        </Box>
        {/* ----------------------------------------------------------------------------------------------------------------- */}

        {/* ------------------------------- Desktop -------------------------------------------------------------------------- */}
        <Box
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
          justifyContent='space-between'
          alignItems='center'
          flexGrow={1}
          // mt={1}
        >
          {/* <Box
            component='img'
            display={{ xs: 'none', md: 'flex' }}
            alignItems='center'
            justifyContent='flex-start'
            src='uca_logo_01.png'
            sx={{ width: '260px', height: 'auto', mt: -2, mb: -2 }}
            // sx={{width: '180px', height: '52px'}}
          /> */}
          <Typography>Logo</Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {pages.map((page, index) => (
              <Box
                key={page}
                display={{ xs: 'none', md: 'flex' }}
                gap={1}
                alignItems='center'
                justifyContent='space-evenly'
              >
                <Button
                  sx={{
                    my: 2,
                    color: 'black',
                    // display: 'block',
                    mx: 1,
                    textTransform: 'none',
                    height: '40px',
                    fontSize: '14px',
                    // fontWeight: 400,
                  }}
                >
                  {t(`toolbar.${page}`)}
                </Button>

                <Box
                  // Divider Line
                  display={index === pages.length - 1 ? 'none' : 'block'}
                  sx={{
                    alignItems: 'center',
                    left: 'calc(50% - 2px)',
                    top: 'calc(50% - 40px)',
                    width: '2px',
                    height: '20px',
                    background: 'black',
                  }}
                />
              </Box>
            ))}
            <LangButton />
          </Box>
        </Box>
        {/* -------------------------------------------------------------------------------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
