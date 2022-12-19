import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Button } from '@material-ui/core';
import './DragAndDropFiles.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    Select,
    TextField,
    FormControl,
    MenuItem,
} from '@material-ui/core';
import { setSBOMFileDetails, setSBOMFileType } from 'src/actions/generateSBOMAction';
import Axios from 'axios';

const DragAndDropFiles = () => {
    const dispatch = useDispatch();
    const [fileContent, setFileContent] = useState();
    const fileUploadList = useSelector(state => state.generateSBOM);
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        showUploadList: { showRemoveIcon: true },
        accept: ".xml, .json, .txt",
        onChange(info) {
            const allowedFileTypes = info.fileList.filter(files => files.type == "text/plain" || files.type == "application/json"
                || files.type == "text/xml");
            let reader = new FileReader();
            reader.onload = (e) => {
                console.log(e.target.result);
            }
            //reader.readAsText(info.file);
            setFileContent(info.file)
            if (allowedFileTypes.length <= 1) {
                dispatch(setSBOMFileType(allowedFileTypes[0].name))
                dispatch(setSBOMFileDetails(allowedFileTypes[0]))
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload: (file) => {
            if (file.type != "text/plain" || file.type != "application/json" || file.type != "text/xml") {
                message.error('You can only upload XML or JSON or TXT files!');
                return false;
            } else {
                return false;
            }
        }
    };
    const uploadFiles = async () => {
        if (Object.keys(fileUploadList.fileDetails).length > 0) {
            const url = `sbom/upload?language=${fileUploadList.fileType}&name=${fileUploadList.fileDetails.name}&tag=latest&project=${fileUploadList.fileDetails.name}`;
            const formData = new FormData();
            formData.append('file',fileContent);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const response = await Axios.post(url, formData, config);
            console.log(response)
        }
    };
    return (
        <div className='dragger-container'>
            <h1 className='title'>Niah SBOM Generation</h1>
            <Dragger className='dragger' {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text"> Drag files here or Click to upload.</p>
                <p className="ant-upload-hint">
                    (Only *.xml, *.json and *.txt files will be accepted)
                </p>
            </Dragger>
            {Object.keys(fileUploadList.fileDetails).length > 0 ? (
                <div className='file-info-container'>
                    <h3 className='file-name'>file: {fileUploadList.fileDetails.name}</h3>
                    <div className='file-info'>
                        <FormControl fullWidth variant="outlined" className='file-details'>
                            <Select
                                value={fileUploadList.fileType}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={fileUploadList.fileType}>{fileUploadList.fileType}</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            className='file-details'
                            name="name"
                            inputProps={{ readOnly: true }}
                            type="text"
                            value={fileUploadList.fileDetails.name}
                            variant="outlined"
                        />
                    </div>
                    <div className='file-info'>
                        <TextField
                            fullWidth
                            label="Tag"
                            margin="normal"
                            inputProps={{ readOnly: true }}
                            className='file-details'
                            name="tag"
                            type="text"
                            value={'latest'}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Project"
                            margin="normal"
                            inputProps={{ readOnly: true }}
                            className='file-details'
                            name="project"
                            type="text"
                            value={fileUploadList.fileDetails.name}
                            variant="outlined"
                        />
                    </div>
                </div>
            ) : <></>}
            <Button variant="contained" className='generate-btn' onClick={() => uploadFiles()}>Generate</Button>
        </div>
    )
};
export default DragAndDropFiles;