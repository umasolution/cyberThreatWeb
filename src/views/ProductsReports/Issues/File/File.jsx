import React from 'react';
import './File.css';

const File = ({ name, file }) => {
  return (
    <div>
      <h5 className="details-header">{name}</h5>
      {
        Object.keys(file).map(obj => {
          return (
            obj !== 'packages' ? (
              <div className="panelMainDiv display-div">
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
            )
              : 
              <div className="">
              {file[obj].map(o => {
                return (
                  <div className="packages panelMainDiv">
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