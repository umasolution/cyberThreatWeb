import React, { useEffect } from "react";
import Chart from "react-google-charts";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    makeStyles
  } from '@material-ui/core';
import CONSTANTS from "src/Util/Constants";

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


  const CweTreeMap = ({title,cwe}) => {
    const classes = useStyles();
    
    const dataRows=[];

    const getData = () => {
        
           
        if (cwe) {
            
            for (var key in cwe) {
               dataRows.push([key,"CWE",cwe[key]]);
            } ;
        }

        var dataColumn=[["CWEValues","Parent","Value"]];
        var firstRow=[["CWE",null,0]];

        return(dataColumn.concat(firstRow,dataRows));

    };  

    
   /* const data = [
        [
          "CWE",
          "Parent",
          "Number",   
        ],
        ["CWE",null,0],
        ["CWE-1","CWE", 8],
        ["CWE-119","CWE", 4],
        ["CWE-16","CWE", 1],
        ["CWE-189","CWE", 3],
        ["CWE-19", "CWE",1],
        ["CWE-20", "CWE",10],
        ["CWE-200", "CWE",22]
      ];*/
      const options = {
        minColor: "#4287f5",
        midColor: "#ddd",
        maxColor: "#0ff",
        headerHeight: 15,
        fontColor: "black",
        showScale: true,
        generateTooltip: showStaticTooltip

      };

      function showStaticTooltip(row, size, value) {
          if(!(dataRows && dataRows[row-1]))
            return
        return '<div style="background:#64B5F6; padding:10px; border-style:solid">' +
        ((dataRows && dataRows[row-1]) ? dataRows[row-1][0] : "")+':'+dataRows[row-1][2]+'</div>'
      }
 
      return (
          <Card>
              <CardHeader
                  title={title}
              />
              <Divider />
              <CardContent className="chart-data">
                  <Box className={classes.box}>
                      
                      <Chart
                          chartType="TreeMap"
                          width="100%"
                          height="100%"
                          data={getData()}
                          options={options}
                      />
                  </Box>
              </CardContent>
          </Card>
      );
  };
  
  export default CweTreeMap;