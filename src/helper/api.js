export const HttpGet = async (Url = '') => {
    const RESPONSE = await fetch(process.env.REACT_APP_API_URL + Url, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then((response) => response.json());

    const RESULT = await RESPONSE;
    return RESULT;
};
