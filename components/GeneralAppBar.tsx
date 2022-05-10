import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import router from 'next/router';
import { useContext, useState } from 'react';
import { LogoutFetch } from '../lib/api/logout';
import { LoginContext } from '../lib/LoginContext';

const pageLinksx: SxProps = {
  paddingLeft: '2rem',
};

export function GeneralAppBar() {
  const { user, setTokens, credentials } = useContext(LoginContext);

  async function handleLogout() {
    if (credentials) await LogoutFetch(credentials, setTokens);
    handleUserMenuClose();
    setTokens(undefined, undefined);
    // router.push('/');
  }

  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null,
  );

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: 3, height: '48px' }}>
      <Toolbar variant="dense">
        <Typography variant="h6" component="div">
          <Link href={'/'}>PolyCode</Link>
        </Typography>

        <Typography variant="h6" component="span" sx={pageLinksx}>
          <Link href={'/collections'}>Practice</Link>
        </Typography>

        <Typography variant="h6" component="span" sx={pageLinksx}>
          <Link href={'/'}>Certification</Link>
        </Typography>

        <Typography variant="h6" component="span" sx={pageLinksx}>
          <Link href={'/challenges'}>Challenges</Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user === undefined && <div>loading</div>}
        {user ? (
          <Button
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleUserMenu}
            color="inherit"
            sx={{ textTransform: 'none' }}
            endIcon={<ArrowDropDownIcon />}
          >
            {user.username}
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        )}
        <Menu
          id="user-menu"
          anchorEl={userMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          <MenuItem
            onClick={() => {
              setUserMenuAnchor(null);
              if (user) router.push(`/users/${user.id}`);
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              setUserMenuAnchor(null);
              router.push(`/password`);
            }}
          >
            Change password
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
