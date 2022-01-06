import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    makeStyles
} from '@material-ui/core';
import './Integrations.css';
import TransitionsModal from './IntegrationModal';
import MachineModal from './MachineModal';


const useStyles = makeStyles(theme => ({
    center: {

        textAlign : 'center'

    }
}))

const Integration = ({ data, group, index }) => {

    const styles = useStyles();
    const [open,setOpen] = useState(false);
    const [machineOpen,setMachineOpen] = useState(false);

    const onOpen = () => {
        console.log(data);
        console.log(group);
        console.log(index);
        if(data.application == 'machines'){
            setMachineOpen(true);
        }else{
            setOpen(true);
        }
        
    }

    const onClose = () => {
        setOpen(false);
    }

    const onMachineClose = () => {
        setMachineOpen(false);
    }



    return (
        <Card className="card" >
            <CardContent className="card-content">
                <div onClick = {onOpen}>
                    <div>
                        <img src={"/static/integrations/"+data?.name+".png"} onError = {(e)=> e.target.src = "/static/integrations/GitLab.png"}/>
                        
                    </div>
                    <div className={styles.center}>
                        {data?.name}
                    </div>
                </div>
                <TransitionsModal openModal = {open} data={data} onClose = {onClose} group={group} index={index}/>
                <MachineModal openModal = {machineOpen} data={data} onClose = {onMachineClose} group={group} index={index}/>
            </CardContent>
        </Card>
    )
};

export default Integration;