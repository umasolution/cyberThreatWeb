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
  const [image, setImage] = useState();
  const [avatar, setavatar] = useState();
  const [mydata, setData] = useState();
  

  const onFileChange = async (event, value) => {      
      setSelectedFile(event.target.files[0]); 
      console.log(event.target.files) ;
  };

 /* const onImageChange = (event) => {
     if (event.target.files && event.target.files[0]) {
       setImage(URL.createObjectURL(event.target.files[0]));
       
     }
    } */

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setData({
          ...mydata,
          imagePreview: reader.result,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = form => {
    form.preventDefault();
    const formData = new FormData();
    formData.append('file', mydata.file);
    // for (var pair of formData.entries()) {
    //   console.log(pair[1]);
    // }

    console.log(formData); 
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    Axios
      .post("api/upload/image", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };

  const onFileUpload = async () => { 
     
      // Create an object of formData 
      var formData = new FormData();

      // Update the formData object 
      formData.append( 
        'file', 
        selectedFile
      );

     /* formData.append( 
        'file', 
         fs.createReadStream(selectedFile.name)
      );*/
      /*formData.append( 
        'file', 
        selectedFile, 
        'C:/Users/divya/Downloads/Benedict_Cumberbatch_2011.png' 
      );*/

     
      // Details of the uploaded file 
      console.log(selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 

      Axios.post("api/upload/image", formData).then((res) => {
        console.log(res);
      });

      /*const response = await Axios.post("api/upload/image", formData);
      console.log(response);*/
      
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

        <form onSubmit={form => submitForm(form)}>
              <input
                accept="image/*"
                onChange={onImageChange}
                className={classes.inputImage}
                id="contained-button-file"
                multiple
                name="file"
                type="file"
              />
              <label htmlFor="contained-button-file">
                
              </label>
              <Button
                type="submit"
                variant="outlined"
                className={classes.button}
              >
                Default
              </Button>
            </form>
        <div> 
            <input type="file" name="file" onChange={onFileChange} /> 
            <button onClick={onFileUpload}> 
              Upload! 
            </button> 
        </div>
        <img src={selectedFile}/>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
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
