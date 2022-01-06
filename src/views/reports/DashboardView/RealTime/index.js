import { Box, Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography,Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,Divider } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import { useHistory } from 'react-router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Copy from "../../../../Util/Copy";
import './index.css';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  },
  link : {
    cursor : 'pointer'
  }
}));



function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RealTime({ className, lib_details,headtitle, selData,...rest }) {


  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  let originalLibDetails = useRef(lib_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(lib_details));
  const [searchInput, setSearchInput] = useState();

  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  useEffect(()=>{
    originalLibDetails = lib_details;
    setSearchedLibDetails(lib_details);

  },[lib_details]);


  const pages = [
    {
      pathname: '/app/projects',
      views: '24'
    },
    {
      pathname: '/app/chat',
      views: '21'
    },
    {
      pathname: '/cart',
      views: '15'
    },
    {
      pathname: '/cart/checkout',
      views: '8'
    }
  ];

  const height = 420;
  const rowHeight = 52;
  const width = 398;
  

  const rowRenderer = (details) => {
    return searchedLibDetails && (
        <div className="odd-even-background" style={{display:'flex', 
                                                   
                                                    color:'#551A8B',
                                                    paddingTop:'12px',
                                                    paddingTop:'12px',
                                                    paddingLeft:'10px',
                                                    paddingRight:'10px',
                                                    fontWeight:'700',
                                                    cursor:'pointer',
                                                    height:rowHeight}}>
          <div style={{width: '90%',fontWeight:'700px',color:'#551A8B !important'}}>
             <Link onClick={()=>onProductClick(details,selData)} >{details.name}</Link>
       </div>
          <div style={{width: '10%',fontWeight:'700px',color:'#444444'}}>
            {details.value}
         </div>
        </div>
    )
      ;
  };

  const handleChangeSearch = (event) => {
    const filteredResult = originalLibDetails.current.filter(details => details.name.toLowerCase().includes(event.target.value));
    setSearchedLibDetails(filteredResult);
    setSearchInput(event.target.value);
  }

  const onProductClick = (product,selData) => {
   /* history.push( '/app/dashboard/productDetailVul',
                  product,selData);*/
      history.push({pathname:"/app/dashboard/productDetailVul",state: {name: product.name, selData: selData, product : product}}) ;           
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
    { openSearch ? null : <CardHeader
        title={headtitle}
        action={
          <IconButton aria-label="settings">
            <SearchIcon onClick={handleSearchOpen} />
          </IconButton>
        }
      /> }
      { openSearch ? <TextField
        required
        value={searchInput}
        onChange={handleChangeSearch}
        className="secondary"
        labelClassName="secondary"
        style={{
          marginLeft: '15px',
        }}
        id="search"
        placeholder="Search"
      /> : null }
      { openSearch ? <IconButton aria-label="settings">
            <CloseIcon onClick={handleSearchClose} />
          </IconButton> : null }
      
      <Divider />
     
        <div style={{width:'100%',height:'370px', overflowY:'auto'}}>
          {
            searchedLibDetails.map((details)=>rowRenderer(details))
          }
     
       </div>
     
    </Card>
  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
