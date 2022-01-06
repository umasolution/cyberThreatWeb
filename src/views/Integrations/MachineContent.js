import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    makeStyles,
    Grid,
    Button,
    TextField,
    Paper
} from '@material-ui/core';
import Axios from 'axios';
import Label from '@material-ui/icons/Label';
import { useDispatch, useSelector } from 'react-redux';
import Integrations from '.';
import { setMachineList } from 'src/actions/integrationActions';

const useStyles = makeStyles(theme=>({
    txt : {
        width : '100%',
        margin: '5px'
    },
    add : {
        margin : '10px'
    },

    addCreds : {
        display : 'flex'
    },

    or : {
        padding:'25px'
    },
    machine : {
        width:'90%',
        height : '35px',
        margin: '5px',
        padding:'10px'
    },
    list : {
        height:'350px',
       overflowY : 'auto',
       margin:'10px'
    },
    listWrap:{
        display : 'flex'
    }
}));

const MachineContent = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const machineList = useSelector(state=>state.integrations.machineList);

    const [addedInfo, setAddedInfo] = useState({application:'machines',type:'machines',name:'', description:'', ip_address:'', method:'', username:'', password:'',['ssh-key']:''});

    const onChangeTxtField = (e,attr) => {
        let addedInfoClone = {...addedInfo};

        addedInfoClone[attr] = e.target.value;

        setAddedInfo(addedInfoClone);
    }

    const getLayoutForAdd = () => {
        return (
            <Grid item xs={12} className={styles.add}>
               <Grid item xs={12} >
                    <TextField className={styles.txt} 
                                                label='Name'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'name')}
                                                value = {addedInfo['name']} />
               </Grid>
               <Grid item xs={12} >
                <TextField className={styles.txt} 
                                                label='Description'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'description')}
                                                value = {addedInfo['description']} />
               </Grid>
               <Grid item xs={12} >
                <TextField className={styles.txt} 
                                                label='Ip Address'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'ip_address')}
                                                value = {addedInfo['ip_address']} />
               </Grid>
               <Grid item xs={12} >
                <TextField className={styles.txt} 
                                                label='Method'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'method')}
                                                value = {addedInfo['method']} />
               </Grid>
               <Grid item xs={12} className={styles.addCreds}>
                <TextField className={styles.txt} 
                                                label='User Name'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'username')}
                                                value = {addedInfo['username']} />
              
                <TextField className={styles.txt} 
                                                label='Password'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'password')}
                                                value = {addedInfo['password']} />
                <div className={styles.or}>OR</div>
              
                <TextField className={styles.txt} 
                                                label='SSH Key'
                                                variant="outlined"
                                                onChange = {(e)=>onChangeTxtField(e,'ssh-key')}
                                                value = {addedInfo['ssh-key']} />
               </Grid>
               <Grid item xs={12} >
                   <Button onClick= {onAddInstance} style={{ backgroundColor : 'rgb(25, 118, 210)',color:'rgb(255, 255, 255)',color:'rgb(255, 255, 255)',marginRight:'10px'}}>Add Instance</Button>
                </Grid>
            </Grid>
        )
    }

    const onAddInstance = async () => {
        console.log(addedInfo);
        const url = `/machine/add`;
        const response = await Axios.post(url,addedInfo);
        setAddedInfo({application:'machines',type:'machines',name:'', description:'', ip_address:'', method:'', username:'', password:'',['ssh-key']:''});
        onLoadMachineList();
        selectAdd(false);
    }

                                       
    const getLayoutForList = () => {
        return (
            <Grid item xs={12} className={styles.list}>
                {
                    machineList.map(machine=>{
                        return (
                            <div className={styles.listWrap}>
                                <Paper className={styles.machine}>{machine.name}</Paper>
                                <Button  onClick={()=>onDeleteMachine(machine.name)} style={{ backgroundColor : 'rgb(220,20,60)',color:'rgb(255, 255, 255)',margin:'5px',height:'35px'}}>Delete</Button>
                            </div>
                            
                        )
                    })
                }
            </Grid>
        )
    }

    const [addSelected, selectAdd] = useState(true);

    const onBtnClick = (action) => {
        if(action == 'add'){
            selectAdd(true);
        }else{
            selectAdd(false);
            onLoadMachineList();
        }
    }


    const onLoadMachineList = async () => {
        const url = `/instance/lists`;
        const response = await Axios.post(url,{application:'machines', type:'machines'});

        dispatch(setMachineList(response.data));
    }

    const onDeleteMachine = async (name) => {
        const url = `/machine/delete`;
        const response = await Axios.post(url,{application:'machines', type:'machines', name});

        onLoadMachineList();
    }
    return (
        <Grid container>
            <Grid item xs={12} style={{display:'flex'}}>
                <Button onClick={()=>onBtnClick('add')} style={{ backgroundColor : 'rgb(25, 118, 210)',color:'rgb(255, 255, 255)',color:'rgb(255, 255, 255)',marginRight:'10px'}}>Add</Button>
                <Button onClick={()=>onBtnClick('list')} style={{ backgroundColor : 'rgb(25, 118, 210)',color:'rgb(255, 255, 255)',color:'rgb(255, 255, 255)'}}>List</Button>
            </Grid>
           
           {addSelected ? getLayoutForAdd() : getLayoutForList()}
        </Grid>
    )
}

export default MachineContent;