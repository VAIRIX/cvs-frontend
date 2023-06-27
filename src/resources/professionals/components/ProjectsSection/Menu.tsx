import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC } from 'react';

type PositionedMenuProps = {
  setSortingOption: any;
};

const PositionedMenu: FC<PositionedMenuProps> = ({ setSortingOption }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (data: React.MouseEvent<HTMLElement>) => {
    console.log(data.currentTarget.id);
    setSortingOption(data.currentTarget.id);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sort
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem id="DATE_ASCENDING" onClick={handleClose}>
          By Date Ascending
        </MenuItem>
        <MenuItem id="DATE_DESCENDING" onClick={handleClose}>
          By Date Descending
        </MenuItem>
        <MenuItem id="MANUAL" onClick={handleClose}>
          Select Order
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PositionedMenu;
