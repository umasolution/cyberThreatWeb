import React, { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  Bell as BellIcon,
  Package as PackageIcon,
  MessageCircle as MessageIcon,
  Truck as TruckIcon,
} from "react-feather";
import { getNotifications } from "src/actions/notificationsActions";
import Badge from '@material-ui/core/Badge';
import { THEMES } from 'src/constants';
const iconsMap = {
  order_placed: PackageIcon,
  new_message: MessageIcon,
  item_shipped: TruckIcon,
};

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320,
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  iconcolor : {
    ...(theme.name === THEMES.NEWLIGHT
      ? {
          color: theme.palette.background.main,
        }
      : {
        color: 'inherit',
      }),
  }
}));

function Alerts({alertsResponse}) {
  const classes = useStyles();
  /* const notifications = useSelector(
    (state) => state.notifications.notifications
  ); */
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <>
      <Tooltip title="Alerts">
        <IconButton className={classes.iconcolor} ref={ref} onClick={handleOpen}>
        <Badge badgeContent={alertsResponse ? alertsResponse.length : 0  }  color="secondary">
          <SvgIcon>
            <BellIcon />
          </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography variant="h5" color="textPrimary">
            Alerts
          </Typography>
        </Box>
        {alertsResponse?.length === 0 ? (
          <Box p={2}>
            <Typography variant="h6" color="textPrimary">
              There are no alerts
            </Typography>
          </Box>
        ) : (
          <>
            <List className={classes.list} disablePadding>
              {alertsResponse?.map((notification) => {
                // const Icon = iconsMap[notification.type];

                return (
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    key={notification.id}
                    to="/app/management/Alerts"
                  >

                    {/* <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <Icon />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={notification.message}
                      primaryTypographyProps={{
                        variant: "subtitle2",
                        color: "textPrimary",
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
            {/* <Box p={1} display="flex" justifyContent="center">
              <Button component={RouterLink} size="small" to="#">
                Mark all as read
              </Button>
            </Box> */}
          </>
        )}
      </Popover>
    </>
  );
}

export default Alerts;
