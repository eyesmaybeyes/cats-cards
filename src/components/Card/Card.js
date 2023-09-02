import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../reducers/dataActions';
import './Card.scss';

function Card() {

    const dispatch = useDispatch();
    const catData = useSelector(state => state.data.data);
    const error = useSelector(state => state.data.error);
    const loading = useSelector(state => state.data.loading);

    const [liked, setLiked] = useState(Array(catData.length).fill(false));
    const [showLiked, setShowLiked] = useState(false);

    const handleDeleteClick = (index) => {
        const newCatData = [...catData];
        newCatData.splice(index, 1);
        dispatch({ type: "DELETE_CARD", payload: newCatData });

        const newLikeState = [...liked];
        newLikeState.splice(index, 1);
        setLiked(newLikeState);
    };

    const handleLikeClick = (index) => {
        const newLikeState = [...liked];
        newLikeState[index] = !newLikeState[index];
        setLiked(newLikeState);
    };
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    return (
        <>
            <button onClick={() => setShowLiked(!showLiked)}>
                {showLiked ? "Показать все карточки" : "Показать лайкнутые карточки"}
            </button>
            {catData.length > 0 &&
                catData
                    .filter((_, index) => !showLiked || liked[index])
                    .map((cat, index) =>
                        <div className="card" key={index}>
                            <div className="card-top">
                                <button className="card__btn_delete" onClick={() => handleDeleteClick(index)}></button>
                                <img className="card__image" src={cat.imageUrl} alt={cat.name} />
                                <div className="title-flex">
                                    <h3 className="card__title">{cat.name}</h3>
                                    <a href={cat.wikipedia_url} className="user-follow-info">wikipedia</a>
                                </div>
                                <p className="card__temperament">{cat.temperament}</p>
                                <p className="card__description">{cat.description}</p>
                            </div><button className="card__btn_like" onClick={() => handleLikeClick(index)}>
                                {liked[index] ? (<svg width="64" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.0026 5.09266C39.5193 -1.65602 51.1351 -1.43202 58.3765 5.82224C65.6148 13.0797 65.8644 24.6379 59.1317 32.1769L31.9962 59.3508L4.86713 32.1769C-1.86555 24.6379 -1.61275 13.0605 5.62232 5.82224C12.8702 -1.42242 24.4636 -1.66562 32.0026 5.09266ZM46.7702 35.5C41.9703 30.6937 56.2877 26.4881 51.2638 31L3 18L27.7307 9.85737C22.6908 5.33905 48.3127 16.6873 43.5 21.5C38.7321 26.2679 5.14232 22.7499 9.53584 27.793L3 18L54.463 27.7962C58.8597 22.7499 51.5445 40.2839 46.7702 35.5Z" fill="#E5111D" />
                                </svg>
                                ) :
                                    (<svg width="64" height="60" viewBox="0 0 64 64" fill="#E5111D" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M32.0026 8.09264C39.5193 1.34397 51.1351 1.56797 58.3765 8.82223C65.6148 16.0797 65.8644 27.6379 59.1317 35.1769L31.9962 62.3508L4.86713 35.1769C-1.86555 27.6379 -1.61275 16.0605 5.62231 8.82223C12.8702 1.57757 24.4636 1.33437 32.0026 8.09264V8.09264ZM53.8454 13.3437C49.0455 8.53744 41.3016 8.34224 36.2777 12.8542L32.0058 16.6877L27.7307 12.8574C22.6908 8.33904 14.9629 8.53744 10.1502 13.3501C5.38232 18.1181 5.14232 25.7499 9.53584 30.793L31.9994 53.2918L54.463 30.7962C58.8597 25.7499 58.6197 18.1277 53.8454 13.3437V13.3437Z" />
                                    </svg>
                                    )}
                            </button>
                        </div >
                    )}
        </>
    );
}

export { Card };
