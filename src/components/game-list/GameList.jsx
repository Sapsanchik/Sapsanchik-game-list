import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import LazyLoad from 'react-lazyload';

const GameList = ({ games }) => {
    const [modalActive, setModalActive] = useState(false);
    const [clickedImage, setClickedImage] = useState(null);

    const handleImageClick = (image) => {
        setModalActive(true);
        setClickedImage(image);
    };
    return (
        <ul className="flex w-full h-full flex-wrap gap-2 justify-center items-center">
            {games.map((game) => (
                <div
                    key={game.id}
                    className=" border-2 border-zinc-700 rounded hover:border-zinc-950 hover:bg-slate-600"
                >
                    <div className="flex flex-col w-[400px] h-[600px] items-center justify-around bg-gradient-to-r from-white to-black hover:from-blue-500 hover:to-yellow-500">
                        <LazyLoad height={200}>
                            <img
                                src={game.background_image}
                                alt=""
                                className="md:h-[280px] w-[380px] object-cover rounded-xl"
                            />
                        </LazyLoad>
                        <p className="pr-1">{game.name}</p>

                        <p>
                            Рейтинг - {game.rating} Metacritic - {game.metacritic}
                        </p>

                        <div className="text-center text-sm">
                            Платформы:{' '}
                            {game.platforms
                                .map((platName) => {
                                    return platName.platform.name;
                                })
                                .join(', ')}
                        </div>

                        <li className="flex flex-wrap gap-2 justify-center items-center">
                            {game.short_screenshots
                                .map((screen) => {
                                    return (
                                        <LazyLoad height={100}>
                                            <img
                                                key={screen.id}
                                                src={screen.image}
                                                alt=""
                                                className="h-[100px] w-[120px] object-cover rounded-xl"
                                                onClick={() =>
                                                    handleImageClick(screen.image)
                                                }
                                            />
                                        </LazyLoad>
                                    );
                                })
                                .slice(1)}
                        </li>
                        {modalActive && (
                            <Modal active={modalActive} setActive={setModalActive}>
                                <img
                                    src={clickedImage}
                                    alt=""
                                    className="h-72 w-96 object-cover rounded-lg"
                                    onClick={() => setModalActive(true)}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            ))}
        </ul>
    );
};

export default GameList;
