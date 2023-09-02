import axios from 'axios';

export const fetchDataRequest = () => ({
    type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = (data) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataFailure = (error) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function getImageForBreed(breed_id) {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${breed_id}`);
    return response.data[0].url;
}

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/breeds/');

            let allBreeds = response.data;
            shuffleArray(allBreeds);
            const randomBreeds = allBreeds.slice(0, 8);

            const randomBreedsWithImage = await Promise.all(randomBreeds.map(async (breed) => {
                const imageUrl = await getImageForBreed(breed.id);
                return { ...breed, imageUrl };
            }));

            dispatch(fetchDataSuccess(randomBreedsWithImage));
        } catch (error) {
            dispatch(fetchDataFailure(error.message));
        }
    };
};