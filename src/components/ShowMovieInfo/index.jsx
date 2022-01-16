import { useState } from 'react';
import { Modal, Button, Chip, Icon } from 'react-materialize';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { get } from '../../api';
import './style.scss';

function ShowMovieInfo({id}) {
    const [movie, setMovie] = useState(null);

    async function fetchMovieById(id) {
        const r = await get(`movies/${id}`);
        console.log(r)
        setMovie(r.data)
      }

    return (
        <form>
                <Modal
                    actions={[
                        <Button flat modal="close" node="button" waves="green">CLOSE</Button>
                    ]}
                    bottomSheet={false}
                    fixedFooter={false}
                    header="MOVIE"
                    id="Modal-10"
                    open={false}
                    options={{
                        dismissible: true,
                        endingTop: '10%',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: () => fetchMovieById(id),
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: '4%'
                    }}
                    root={document.body}
                    trigger={
                        <IconButton size="large">
                            <InfoOutlinedIcon/>
                        </IconButton>
                    }>

                    {movie && Object.keys(movie).length > 0 &&
                    <List disablePadding>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <MovieCreationOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={movie.title} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <DateRangeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={movie.year} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <ArticleOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={movie.format} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <StarBorderOutlinedIcon />
                            </ListItemIcon>
                            {movie.actors.map(actor => {
                                return (
                                    <Chip
                                        key={actor.id}
                                        close={false}
                                        closeIcon={<Icon className="close">close</Icon>}
                                        options={null}
                                    >
                                        {actor.name}
                                    </Chip>
                                )
                            })}
                        </ListItem>


                    </List>

                }




                </Modal>
        </form>


    )
}

export {
    ShowMovieInfo
}