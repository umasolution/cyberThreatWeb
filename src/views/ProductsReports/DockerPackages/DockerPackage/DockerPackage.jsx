import React from 'react';

const DockerPackage = ({file}) => {
  return (
    <div className="">
              {file.map(o => {
                return (
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
                )
              }
              )}
              </div>
  );
};

export default DockerPackage;