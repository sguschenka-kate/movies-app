const initialState = {
    movies: [],
    moviesCount: null,
    loading: false,
    movie: {
        title: '',
        year: null,
        format: '',
        actors: []
    },
    user: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    }
}

export default initialState;