import axios from 'axios';
import { API_URL } from './api';

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE';

export const fetchGamesRequest = () => ({
    type: FETCH_GAMES_REQUEST,
});

export const fetchGamesSuccess = (games) => ({
    type: FETCH_GAMES_SUCCESS,
    payload: games,
});

export const fetchGamesFailure = (error) => ({
    type: FETCH_GAMES_FAILURE,
    payload: error,
});

export const fetchGames = (
    page,
    sortBy,
    platformFilter,
    multiplayerFilter,
    coopFilter,
    localCoopFilter
) => {
    return async (dispatch) => {
        dispatch(fetchGamesRequest());
        try {
            const response = await axios.get(API_URL, {
                params: {
                    page: page,
                    page_size: 32,
                },
            });
            const sortedGames = response.data.results.sort(
                (a, b) => b[sortBy] - a[sortBy]
            );
            const filteredGames = sortedGames.filter((game) => {
                let passesFilters = true;
                if (platformFilter !== 'all') {
                    passesFilters = game.platforms.some(
                        (platform) => platform.platform.name === platformFilter
                    );
                }
                if (
                    multiplayerFilter &&
                    !game.tags.some((tag) => tag.name === 'Multiplayer')
                ) {
                    passesFilters = false;
                }
                if (
                    coopFilter &&
                    !game.tags.some(
                        (tag) => tag.name === 'Co-op' || tag.name === 'Online Co-Op'
                    )
                ) {
                    passesFilters = false;
                }
                if (
                    localCoopFilter &&
                    !game.tags.some((tag) => tag.name === 'Local Co-Op')
                ) {
                    passesFilters = false;
                }
                return passesFilters;
            });
            console.log(filteredGames);
            dispatch(fetchGamesSuccess(filteredGames));
        } catch (error) {
            dispatch(fetchGamesFailure(error.message));
        }
    };
};
