import React from 'react';
import {
    Container,
    makeStyles,
    Grid,
    Typography,
    Card,
    CardContent,
    Paper,
    Link,
    LinearProgress
} from '@material-ui/core';
import ReportCount from '../ProductsReports/ReportCount/ReportCount';


const ProductDetailHeaders = ({header}) => {
    return <Grid
                container
                    style={{ marginTop: 10,marginBottom: 10 }}
                    spacing={2}
                    className="report-dashboardData"
                >

                    {
                        Object.keys(header).map((key, index) =>
                                <ReportCount header={key} value={header[key]} index={index%4} />
                        )
                    }
                        
       

            </Grid>  
}

export default ProductDetailHeaders;