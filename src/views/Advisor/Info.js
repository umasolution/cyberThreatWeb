import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Chip } from '@material-ui/core';
import { capitalizeFirstLetter, splitAndSpaceStr } from './advisorUtil';
import ShowMoreText from "react-show-more-text";

const Info = () => {
    const infos = useSelector(state=>state.advisor.advisoryResults.analysis.info);
    const searchTerm = useSelector(state=>state.advisor.searchTerm);

    const showMoreComponents = ['description'];

    const boxComponents = ['classifiers','requires_dist'];

           return (<Grid container style={{overflowY:'auto', height:'500px'}}>
                    <Grid item xs={12} >
                        {
                            Object.entries(infos).map(([key, value]) => {
                                if(searchTerm  && (typeof value == 'string') && value.indexOf(searchTerm) == -1){
                                    return;
                                }
                                if(showMoreComponents.indexOf(key) != -1){
                                    return (
                                        <div style={{display:'flex'}}>
                                            <div style={{fontWeight:'600'}}>{splitAndSpaceStr(key)}</div>
                                            <ShowMoreText  lines={1}
                                                        more="Show more"
                                                        less="Show less"
                                                        className="content-css"
                                                        anchorClass="my-anchor-css-class"
                                                     
                                                        expanded={false}
                                                        width={280}
                                                        truncatedEndingComponent={"... "}>
                                                            {value}
                                                        </ShowMoreText>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div style={{display:'flex'}}>
                                            <div style={{fontWeight:'600'}}>{splitAndSpaceStr(key)}</div> :   {typeof value == 'string' ? value : ''}
                                        </div>
                                    )
                                }
                                
                            }       
                            )}
                    </Grid>
                    <Grid item xs={1} style={{overflowY:'auto', fontWeight:'600'}}>Classfiers :</Grid>
                    <Grid item xs={11} style={{overflowY:'auto'}}>
                        {
                            Object.entries(infos).map(([key, value]) => {
                                if(boxComponents.indexOf(key) != -1){
                                    return value.map(
                                        val=>{
                                            if(searchTerm  && (typeof val == 'string') && val.indexOf(searchTerm) == -1){
                                                return;
                                            }
                                            return (<Chip label={val} color="primary"  style={{marginRight:'5px',marginBottom:'5px'}} />)
                                        }
                                    )
                                     
                                }
                        })}
                    </Grid>
                    <Grid item xs={1} style={{overflowY:'auto' , fontWeight:'600'}}>Required Dist :</Grid>
                    <Grid item xs={11} style={{overflowY:'auto'}}>
                        {
                            Object.entries(infos).map(([key, value]) => {
                                if(key == 'requires_dist'){
                                    return value.map(
                                        val=>{
                                            if(searchTerm  && (typeof val == 'string') && val.indexOf(searchTerm) == -1){
                                                return;
                                            }
                                            return (<Chip label={val} color="success" style={{marginRight:'5px',
                                                                    marginBottom:'5px',backgroundColor:'#1976D2', color:'rgb(255, 255, 255)'}}/>)
                                        }
                                    )
                                     
                                }
                        })}
                    </Grid>
                    <Grid item xs={1} style={{overflowY:'auto' , fontWeight:'600'}}>Depended For :</Grid>
                    <Grid item xs={11} style={{overflowY:'auto'}}>
                        {
                            Object.entries(infos).map(([key, value]) => {
                                if(key == 'depended_for'){
                                    return value.map(
                                        val=>{
                                            if(searchTerm  && (typeof val == 'string') && val.indexOf(searchTerm) == -1){
                                                return;
                                            }
                                            return (<Chip label={val} color="success" style={{marginRight:'5px',
                                                                    marginBottom:'5px',backgroundColor:'#9C82E5', color:'rgb(255, 255, 255)'}}/>)
                                        }
                                    )
                                     
                                }
                        })}
                    </Grid>
                </Grid>
              )
      
}

export default Info;



