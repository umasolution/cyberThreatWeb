import React from 'react';

const parseDataToComponent = (data) => {

}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

const splitAndSpaceStr = (str) => {
    return str.split('_').length > 1 ? capitalizeFirstLetter(str.split('_')[0])+' '+capitalizeFirstLetter(str.split('_')[1]) : capitalizeFirstLetter(str);
}




export {parseDataToComponent,capitalizeFirstLetter,splitAndSpaceStr};