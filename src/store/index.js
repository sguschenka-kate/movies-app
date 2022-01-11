// Код файла store.js
import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore( reducer, {
    movies: []
})


export {
    store
}