import Axios from 'axios';

export const setAlert = async (productName,productType) => {
    try {
        const url = `/setalert`;
        const response = await Axios.post(url, {
            
            "alert_name": productName,
            "alert_mode": "all",
            "alert_type": productType
        });
        
    }
    catch(error)
    {
        console.log(error);
    }
};

export const delAlert = async (productName,productType) => {
    try {
        const url = `/delalert`;
        const response = await Axios.post(url, {
            
            "alert_name": productName,
            "alert_mode": "all",
            "alert_type": productType
        });
      
    }
    catch(error)
    {
        console.log(error);
    }
};
