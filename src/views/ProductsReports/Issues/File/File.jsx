import React from 'react';
import './File.css';
import { Paper } from '@material-ui/core';

const File = ({ name, file }) => {
  return (
    <div>
      <h5 className="details-header">{name}</h5>
      {
        Object.keys(file).map(obj => {
          return (
            obj !== 'packages' ? (
              <Paper className="paper">
              <div className="display-div">
                {Object.keys(file[obj]).map(o => {
                  return (
                    <p className="details">
                      {o !== 'depend' ? (
                        <>
                          <h6 className="details-header">
                            {o}
                          </h6>
                          {file[obj][o]}
                        </>
                      )
                        : (o === 'depend' && file[obj][o].length > 0) ? (
                          <div>
                            <h6 className="details-header">
                              {o}
                            </h6>
                            {file[obj][o].join(',')}
                          </div>
                        )
                          : ''}
                    </p>
                  )
                })}
              </div>
              </Paper>
            )
              : 
              <div className="">
              {file[obj].map(o => {
                return (
                  <Paper className="paper">
                  <div className="packages">
                    {Object.keys(o).map(oo => {
                      return (
                        <p className="details">
                          <div>
                            <h6 className="details-header">
                              {oo}
                            </h6>
                            {o[oo]}
                          </div>
                        </p>
                      )
                    })}
                  </div>
                  </Paper>
                )
              }
              )}
              </div>
          )
        })
      }
    </div>
  );
};

export default File;