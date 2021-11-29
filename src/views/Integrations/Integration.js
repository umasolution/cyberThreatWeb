import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    makeStyles
} from '@material-ui/core';
import './Integrations.css';
import TransitionsModal from './IntegrationModal';


const useStyles = makeStyles(theme => ({
    center: {

        textAlign : 'center'

    }
}))

const Integration = ({ data, group, index }) => {

    const styles = useStyles();
    const [open,setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
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
            </CardContent>
        </Card>
    )
};

export default Integration;