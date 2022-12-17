import React from 'react';
import Page from 'src/components/Page';
import DragAndDropFiles from './DragAndDropFiles';

const SBOMView = () => {
    return(
        <Page title="SBOM">
           <DragAndDropFiles />
      </Page>
    )
};

export default SBOMView;