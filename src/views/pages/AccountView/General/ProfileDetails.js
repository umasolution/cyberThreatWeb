import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import fs from 'fs'
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
  Tooltip
} from '@material-ui/core';

import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 200,
    width: 200
  },
   uploadbtn: {
    margin: theme.spacing(1),
    
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

    /*await fetch("/upload/image", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });*/
    try {      
        Axios.post("/upload/image", formData).then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
       
      } catch (error) {
        console.error(error);
      }
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
        >
        <div className="account-image-block">
        <label htmlFor="upload-button">
          <div className="camera-icon">
            <Typography
              color="textPrimary"
              alignItems="center"
            >
            <Tooltip title="Image Upload">
            <CameraAltIcon  />
            </Tooltip>
            </Typography>
            </div>
            <div className="upload-image">            
              {image.preview ? (<>
                <Avatar
                    className={classes.avatar}
                    src={image.preview}
                 />
                {/*<img src={image.preview} alt="dummy" width="300" height="300" />*/}
                <Button className={classes.uploadbtn} onClick={handleUpload} variant="contained" color="primary" component="span">Upload</Button>
                
              </>) : (
                <>
                  <Avatar
                    className={classes.avatar}

                    src={avatar}
                  />
                </>
              )}
            
            
          </div>
          </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleChange}
            />
        </div>

        {/*<Avatar
            className={classes.avatar}
            src={avatar}
          />
          
        <div> 
            <input type="file" name="file" onChange={onFileChange} /> 
            <button onClick={onFileUpload}> 
              Upload! 
            </button> 
        </div>*/}
        
          
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
