import { useState } from 'react';
import { Modal, Button, TextInput, Select, Chip, Icon } from 'react-materialize';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import * as TYPES from '../../store/actions';
import { post } from '../../api';
import './style.scss';

function CreateMovie() {
    const [movie, setMovie] = useState({
        title: '',
        year: null,
        format: '',
        actors: []
    });

    const [format] = useState({
        1: 'VHS',
        2: 'DVD',
        3: 'Blu-Ray',
    });

    const dispatch = useDispatch();

    async function postMovie() {
        const preparedMovie = {
            ...movie,
            year: movie.year.getFullYear(),
            actors: movie.actors.map(el => {
                return el.tag;
            }),
        };

        const r = await post('movies', preparedMovie);
        dispatch({
            type: TYPES.CREATE_MOVIE,
            payload: r
        });

        setMovie({
            title: '',
            year: null,
            format: '',
            actors: []
        });
        alert('Movie is successfully added')
    }

    return (
        <form>
            <Modal
                actions={[
                    <Button node="button" onClick={postMovie} modal="close" waves="green">ADD</Button>,
                    <Button flat modal="close" node="button" waves="green">CLOSE</Button>
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header="ADD MOVIE"
                id="Modal-10"
                open={false}
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                root={document.body}
                trigger={<Button node="button">ADD MOVIE</Button>}
                >
                    <TextInput
                        id="title"
                        required
                        label="Title"
                        value={movie.title}
                        onChange={(e) => setMovie({...movie, title: e.target.value})}
                        validate
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            views={["year"]}
                            label="Year only"
                            required
                            className='datepicker'
                            minDate={new Date("1990-01-01")}
                            maxDate={new Date()}
                            value={movie.year}
                            onChange={(value) => setMovie({...movie, year: value})}
                            animateYearScrolling
                            />
                    </MuiPickersUtilsProvider>

                    <Select
                        id="Select-47"
                        multiple={false}
                        required
                        onChange={(e) => setMovie({...movie, format: format[e.target.value]})}
                        options={{
                            classes: '',
                            dropdownOptions: {
                            alignment: 'left',
                            autoTrigger: true,
                            closeOnClick: true,
                            constrainWidth: true,
                            coverTrigger: true,
                            hover: false,
                            inDuration: 150,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            outDuration: 250
                            }
                        }}
                        value=""
                        >
                        <option value="" disabled>
                            Choose your option
                        </option>
                        <option value="1">
                            VHS
                        </option>
                        <option value="2">
                            DVD
                        </option>
                        <option value="3">
                            Blu-Ray
                        </option>
                    </Select>

                    <Chip
                        close={false}
                        closeIcon={<Icon className="close">close</Icon>}
                        required
                        options={{
                            data: movie.actors,
                            placeholder: 'Enter an actor',
                            secondaryPlaceholder: '+Actor',
                            onChipAdd: (e) => setMovie({...movie, actors: e[0].M_Chips.chipsData})
                        }}
                        />
            </Modal>

        </form>


    )
}

export {
    CreateMovie
}