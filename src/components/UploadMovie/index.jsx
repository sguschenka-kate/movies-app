import { Button, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { post } from '../../api';
import './style.scss';

const Input = styled('input')({
    display: 'none',
  });

function UploadMovie() {

    const [file, setFile] = useState(null);

    async function uploadFile(file) {
        const data = new FormData();
        data.append('movies', file);
        console.log(file)
        const r = await post('movies/import', data, {
            "Content-Type": 'multipart/form-data'
        })
        console.log(r)
    }
    return (
        <form className="ml-10px">
            <label htmlFor="contained-button-file">
                <Input accept="text/plain" id="contained-button-file" onChange={(e) => setFile(e.target.files[0])} multiple type="file" />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            {file && <ButtonBase onClick={() => uploadFile(file)} className="ml-10px">Save</ButtonBase>}
        </form>
    )
}

export {
    UploadMovie
}