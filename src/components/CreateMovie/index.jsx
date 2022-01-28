import { useEffect, useState } from 'react';
import { Modal, Button, TextInput, Select, Chip, Icon } from 'react-materialize';

import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { DatePicker, MuiPickersUtilsProvider, validate } from '@material-ui/pickers';
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

    const [showTitleError, setShowTitleError] = useState({
      error: false, message: 'Please, enter the title of movie'
    });
    const [showYearError, setShowYearError] = useState({
      error: false, message: 'Please, enter the year of movie release'
    });
    const [showFormatError, setShowFormatError] = useState({
      error: false, message: 'Please, enter valid format'
    });

    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch();

    async function postMovie() {
      function validateMovie() {
        if (!movie.title) {
          setShowTitleError({...showTitleError, error: true})
        }
        if (!movie.year) {
          setShowYearError({...showYearError, error: true})
        }

        if (!movie.format) {
          setShowFormatError({...showFormatError, error: true})
        }
        
        if (!showTitleError.error && !showYearError.error && !showFormatError.error) {
          setIsValid(true)
        }
      };

      validateMovie();

      if (isValid) {
        const preparedMovie = {
          title: movie.title,
          year: movie.year.getFullYear(),
          format: movie.format,
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
    }


    useEffect(() => {
      movie.title && setShowTitleError({...showTitleError, error: false});
      movie.format && setShowFormatError({...showFormatError, error: false});
      movie.year && setShowYearError({...showYearError, error: false});
    }, [movie])

    return (
      <form>
            <Modal
                actions={[
                    <Button node="button" onClick={postMovie} modal={isValid ? 'close' : 'confirm'} waves="green">ADD</Button>,
                    <Button flat modal="close" onClick={()=> setMovie({title: '', year: null, format: '', actors: []})} node="button" waves="green">CLOSE</Button>
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
                trigger={<Button style={{maxWidth: 'fit-content', minWidth: 'max-content'}} node="button">ADD MOVIE</Button>}
                >


                    <TextInput
                        id="title"
                        required={true}
                        label="Title"
                        name="title"
                        value={movie.title}
                        onChange={(e) => setMovie({...movie, title: e.target.value})}
                        validate={true}
                    />
                    {showTitleError.error && <p className='error-text'>{showTitleError.message}</p>}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            views={["year"]}
                            label="Year only"
                            required
                            className={`datepicker`}
                            minDate={new Date("1990-01-01")}
                            maxDate={new Date()}
                            value={movie.year}
                            onChange={(value) => setMovie({...movie, year: value})}
                            animateYearScrolling
                            />
                    </MuiPickersUtilsProvider>
                    {showYearError.error && <p className='error-text'>{showYearError.message}</p>}


                    <Select
                        id="Select-47"
                        multiple={false}
                        required
                        name="format"
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
                        >
                        <option value="">
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
                    {showFormatError.error && <p className='error-text'>{showFormatError.message}</p>}

                    <Chip
                        close={false}
                        closeIcon={<Icon className="close">close</Icon>}
                        required
                        name="actors"
                        options={{
                            data: movie.actors,
                            placeholder: 'Enter an actor',
                            secondaryPlaceholder: '+Actor',
                            onChipAdd: (e) => setMovie({...movie, actors: e[0].M_Chips.chipsData}),
                            onChipDelete: (e) => setMovie({...movie, actors: e[0].M_Chips.chipsData}),
                        }}
                        />
                    
            </Modal>
          </form> 



    )
}

export {
    CreateMovie
}