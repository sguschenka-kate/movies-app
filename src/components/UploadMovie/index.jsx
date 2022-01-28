import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonBase, Popper, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as TYPES from '../../store/actions';
import { post } from '../../api';
import './style.scss';

const Input = styled('input')({
    display: 'none',
  });

function UploadMovie() {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
  
    async function uploadFile(file) {
        dispatch({
          type: TYPES.SET_LOADING,
          payload: true
        })
        const data = new FormData();
        data.append('movies', file);
        const r = await post('movies/import', data, {
            "Content-Type": 'multipart/form-data'
        });
        
        dispatch({
          type: TYPES.IMPORT_MOVIES,
          payload: r
        })

        setOpen(true);

        dispatch({
          type: TYPES.SET_LOADING,
          payload: false
        })
    }

    useEffect(() => {
      open && setTimeout(() => {
        setOpen(false);
      },4000)
    },[open])

    return (
        <form className="ml-10px height">
          <Popper open={open} anchorEl={anchorEl} placement="bottom" style={{top: '10px', left: '20px', marginRight: '20px'}} transition>
                <Paper>
                  <Typography sx={{ p: 2 }}>✅ The file is successfully uploaded.</Typography>
                </Paper>
          </Popper>
          
            <label htmlFor="contained-button-file">
                <Input accept="text/plain" id="contained-button-file" onChange={(e) => uploadFile(e.target.files[0])} multiple type="file" />
                <Button variant="contained" style={{height: '100%'}} onClick={(e) => setAnchorEl(e.currentTarget)} component="span">Upload</Button>
            </label>
          
        </form>
    )
}

export {
    UploadMovie
}