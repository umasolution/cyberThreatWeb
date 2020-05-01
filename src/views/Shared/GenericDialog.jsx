import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { withRouter } from "react-router";

// this is a Generic dial where you can pass below properties and it will act based on the passed property or method. 
// Basically you can pass the title, description, and yes/no kind of actions

const GenericDialog = ({
    isOpen, title, description, agreeActionText,
    disagreeActionText, agreeAction, onCloseAction, disagreeAction}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onCloseAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {description && <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>}
                {/* {props.children} */}
            </DialogContent>
            <DialogActions>
                {disagreeAction &&
                    disagreeActionText &&
                    (<Button onClick={disagreeAction} color="primary">
                        {disagreeActionText}
                    </Button>)
                }
                {agreeAction &&
                    agreeActionText &&
                    (<Button onClick={agreeAction} color="primary" autoFocus>
                        {agreeActionText}
                    </Button>)
                }
            </DialogActions>
        </Dialog>
    );
};

export default withRouter(GenericDialog);
