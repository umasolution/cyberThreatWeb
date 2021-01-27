import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import fs from 'fs'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

function ProfileDetails({ user, className, ...rest }) {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  
  const [avatar, setAvatar] = useState();
  const [mydata, setData] = useState();

  const [image, setImage] = useState({ preview: "", raw: "" });

  useEffect(() => {    
    fetchImage();
  }, [])

  const fetchImage = async () => {
    var aValue = localStorage.getItem("loginuserid");
    var aValues = sessionStorage.getItem("loginuserid");
    var linki = 'http://cyberthreatinfo.ca/api/image/'
    if(aValue!='undefined'){
        var linkmain = linki+aValue+'.png?'+Math.random(); 
        setAvatar(linkmain);

    } 
    if(aValues!='undefined'){
        var linkmain2 = linki+aValues+'.png?'+Math.random();
        setAvatar(linkmain2);
    }
  }
  
  const onFileChange = async (event, value) => {      
      setSelectedFile(event.target.files[0]); 
      
  };

    const onFileUpload = async () => { 
     
      // Create an object of formData 
      var formData = new FormData();

      // Update the formData object 
      formData.append( 
        'file', 
        selectedFile
      );
      try {      
        Axios.post("/upload/image", formData).then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
       
      } catch (error) {
        console.error(error);
      }

      
    }; 

    const handleChange = e => {
      if (e.target.files.length) {
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        });
      }
    };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.raw);

    await fetch("/upload/image", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >{/*
        <div>
          <label htmlFor="upload-button">
            {image.preview ? (<>
              <img src={image.preview} alt="dummy" width="300" height="300" />
              <button onClick={handleUpload}>Upload</button>
            </>) : (
              <>
                <Avatar
                  className={classes.avatar}
                  src="http://cyberthreatinfo.ca/api/image/d1851c52-3204-11eb-b1b2-080027d7b49a.png"
                />
              </>
            )}
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          
        </div>
*/}
        <Avatar
            className={classes.avatar}
            src={avatar}
          />
          
        <div> 
            <input type="file" name="file" onChange={onFileChange} /> 
            <button onClick={onFileUpload}> 
              Upload! 
            </button> 
        </div>
        
          
          <Typography
            className={classes.name}
            gutterBottom
            variant="h3"
            color="textPrimary"
          >
            {`${user.firstname} ${user.lastname}`}
            {/* {`${user}`} */}
          </Typography>
         <Typography
            color="textPrimary"
            variant="body1"
          >
            {`${user.state}, ${user.country}`}
          </Typography> 
         {/*  <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
