import React from 'react';
import './Remediation.css';

const Remediation = ({data}) => {
  return (
    <div>
      {
        Object.keys(data).map(key => {
          return (
            <div className="panelMainDiv">
              <div className="panelMainDiv display-div">
              {
                Object.keys(data[key]).map(dataKey => {
                  return (
                    <div className="">
                     <h6 className="details-header">{dataKey}  </h6> 
                      <span className="details-text">
                      {Array.isArray(data[key][dataKey]) ? data[key][dataKey].join(',') : data[key][dataKey] }
                      </span>
                      </div>
                  )
                })
              }
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Remediation;