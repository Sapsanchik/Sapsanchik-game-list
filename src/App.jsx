import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from './actions';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import GameList from './components/game-list/GameList';
import './index.css';
import Button from './components/buttons/Button';

const App = () => {
    const dispatch = useDispatch();
    const { games, loading, error } = useSelector((state) => state);

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('rating');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [multiplayerFilter, setMultiplayerFilter] = useState(false);
    const [coopFilter, setCoopFilter] = useState(false);
    const [localCoopFilter, setLocalCoopFilter] = useState(false);

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePlatformFilterChange = (event) => {
        setPlatformFilter(event.target.value);
    };

    const handleMultiplayerFilterChange = (event) => {
        setMultiplayerFilter(event.target.checked);
    };

    const handleCoopFilterChange = (event) => {
        setCoopFilter(event.target.checked);
    };
    const handleLocalCoopFilterChange = (event) => {
        setLocalCoopFilter(event.target.checked);
    };

    useEffect(() => {
        dispatch(
            fetchGames(
                page,
                sortBy,
                platformFilter,
                multiplayerFilter,
                coopFilter,
                localCoopFilter
            )
        );
    }, [
        dispatch,
        page,
        sortBy,
        platformFilter,
        multiplayerFilter,
        coopFilter,
        localCoopFilter,
    ]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <Header />
            <div className="flex justify-center gap-3 pt-4 bg-slate-400">
                <label htmlFor="sort">Сортировать по:</label>
                <select
                    className="rounded bg-blue-500"
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="metacritic">Metacritic</option>
                    <option value="rating">Rating</option>
                </select>

                <label htmlFor="platformFilter">Выберите платформу:</label>
                <select
                    className="rounded bg-yellow-500"
                    id="platformFilter"
                    value={platformFilter}
                    onChange={handlePlatformFilterChange}
                >
                    <option value="all">All</option>
                    <option value="PC">PC</option>
                    <option value="Linux">Linux</option>
                    <option value="macOS">macOS</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="PlayStation 4">PlayStation 4</option>
                    <option value="Xbox Series S/X">Xbox Series S/X</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                </select>

                <label htmlFor="multiplayerFilter">Мультиплеер:</label>
                <input
                    type="checkbox"
                    id="multiplayerFilter"
                    checked={multiplayerFilter}
                    onChange={handleMultiplayerFilterChange}
                />

                <label htmlFor="coopFilter">Кооператив:</label>
                <input
                    type="checkbox"
                    id="coopFilter"
                    checked={coopFilter}
                    onChange={handleCoopFilterChange}
                />

                <label htmlFor="localCoopFilter">Локальный кооператив:</label>
                <input
                    type="checkbox"
                    id="localCoopFilter"
                    checked={localCoopFilter}
                    onChange={handleLocalCoopFilterChange}
                />
            </div>
            <div className="bg-slate-400">
                {games.length > 0 ? <GameList games={games} /> : <p>Loading...</p>}
                <Button
                    page={page}
                    setPage={setPage}
                    handlePageChange={handlePageChange}
                />
            </div>

            <Footer />
        </div>
    );
};

export default App;
