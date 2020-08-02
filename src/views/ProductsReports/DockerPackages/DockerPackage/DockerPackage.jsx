import React from 'react';
import { Paper } from '@material-ui/core';

const DockerPackage = ({file}) => {
  return (
    <div className="">
              {file.map(o => {
                return (
                  <Paper>
                  <div>
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
  );
};

export default DockerPackage;