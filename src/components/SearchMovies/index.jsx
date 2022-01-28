import { useEffect, useState } from 'react';
import { TextField, Button, Popper, Typography, Paper } from '@mui/material';
import './style.scss';

function SearchMovies({fetchMovies}) {
    const [params, setParams] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    async function prepareData(e) {
        e.preventDefault()
        let data = {};
        for (let key in params) {
            if (params[key] && params[key].length > 2) {
                data = {
                    ...data,
                    [key]: params[key]
                }
            }

            if (params[key] && params[key].length <= 2) {
              setShowMessage(true)
            } else {
              setShowMessage(false)
            }
        }

        fetchMovies(data)
    }

    useEffect(() => {
      showMessage && setTimeout(() => {
        setShowMessage(false)
      }, 1500)
    }, [showMessage])

    return (
        <form className="search-form" onSubmit={(e) => prepareData(e)}>

            <TextField id="demo-helper-text-misaligned-no-helper" onChange={(e) => setParams({ ...params, title: e.target.value})} label="By title" />

            <TextField id="demo-helper-text-misaligned-no-helper" onChange={(e) => setParams({ ...params, actor: e.target.value})} label="By actor" />

            <Button node="button" type="submit" onClick={(e)=>setAnchorEl(e.currentTarget)}>SEARCH</Button>
            <Popper open={showMessage} anchorEl={anchorEl} placement="bottom" style={{top: '10px', left: '20px', marginRight: '20px'}} transition>
                <Paper>
                  <Typography sx={{ p: 2 }}>⚠️ VALUE MUST CONTAIN MORE THAN 2 LETTERS</Typography>
                </Paper>
          </Popper>

        </form>
    )
}

export {
    SearchMovies
}