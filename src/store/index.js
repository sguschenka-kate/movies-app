// Код файла store.js
import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore( reducer, {
    movies: [
        {
            title: "Blazing Saddles",
            year: 1974,
            format: "VHS",
            actors: [
              "Mel Brooks",
              "Clevon Little",
              "Harvey Korman",
              "Gene Wilder",
              "Slim Pickens",
              "Madeline Kahn"
            ]
          }, {
            title: "Blazing Saddles",
            year: 1974,
            format: "VHS",
            actors: [
              "Mel Brooks",
              "Clevon Little",
              "Harvey Korman",
              "Gene Wilder",
              "Slim Pickens",
              "Madeline Kahn"
            ]
        }
    ]
})


export {
    store
}