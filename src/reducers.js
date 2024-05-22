import { FETCH_GAMES_REQUEST, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE } from './actions';

const initialState = {
    games: [],
    loading: false,
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                games: action.payload,
                error: '',
            };
        case FETCH_GAMES_FAILURE:
            return {
                ...state,
                loading: false,
                games: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
