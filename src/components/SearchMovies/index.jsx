import {useState} from 'react';
import { TextField, Button } from '@mui/material';
import './style.scss';

function SearchMovies({fetchMovies}) {
    const [params, setParams] = useState({});

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

            if (params[key] && params[key].length < 2) {
                alert('VALUE MUST CONTAIN MORE THAN 2 LETTERS')
            }
        }

        fetchMovies(data)
    }
    return (
        <form className="search-form" onSubmit={(e) => prepareData(e)}>

            <TextField id="demo-helper-text-misaligned-no-helper" onChange={(e) => setParams({ ...params, title: e.target.value})} label="By title" />

            <TextField id="demo-helper-text-misaligned-no-helper" onChange={(e) => setParams({ ...params, actor: e.target.value})} label="By actor" />

            <Button node="button" type="submit">SEARCH</Button>
        </form>
    )
}

export {
    SearchMovies
}