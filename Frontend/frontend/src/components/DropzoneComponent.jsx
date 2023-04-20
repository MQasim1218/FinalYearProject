import React, { useCallback, useState } from "react";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import { useDropzone } from "react-dropzone";



const DropzoneComponent = ({ setFieldValue }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
    const onDrop = useCallback(async (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles[0]);
      // eslint-disable-next-line no-use-before-define
      // const uploadedImage = await uploadToCloudinary(acceptedFiles[0]);
      const preset = 'm9lzn6nw';
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('preset', 'm9lzn6nw');
      const results = await axios.post('https://api.cloudinary.com/v1_1/daz0bajhs/image/upload', formData, {
        params: {
          upload_preset: 'm9lzn6nw',
        },
      });

      console.log(results);
      console.log(results.data.secure_url);
      setProfileImage(results.data.secure_url);

      setFieldValue('file', acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [setFieldValue]);

    console.log(fileUrl, profileImage)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()} sx={{ gridColumn: 'span 1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input {...getInputProps()} />
        <Avatar sx={{ width: '100px', height: '100px', justifyContent: 'center', alignItems: 'center', borderWidth: '1px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3em', marginBottom: '-2em', cursor: 'pointer' }}>
          {fileUrl ? <img style={{maxwidth:'80%', height:'auto'}} src={profileImage} alt="file preview" /> : isDragActive ? <CloudUploadIcon color="primary" sx={{ fontSize: '3rem' }} />
            : (
              <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <PersonIcon sx={{ fontSize: '3rem' }} />
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Upload Here
                </Typography>
              </div>
            )}
        </Avatar>
      </div>
    );
  };

  export default DropzoneComponent;