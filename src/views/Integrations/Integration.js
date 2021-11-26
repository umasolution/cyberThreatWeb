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

const Integration = ({ name, desc }) => {

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
                        <img src={"/static/integrations/"+name+".png"} onError = {(e)=> e.target.src = "/static/integrations/GitLab.png"}/>
                        
                    </div>
                    <div className={styles.center}>
                        {name}
                    </div>
                </div>
                <TransitionsModal openModal = {open} name = {name} onClose = {onClose}/>
            </CardContent>
        </Card>
    )
};

export default Integration;