
export const userService = { hitApi };
const basePath = 'http://localhost:3000/';
function hitApi(data: any, apiUrl: string, method: string) {
    let requestOptions: any = {
        method: method,
        headers: { 'Content-Type': 'application/json' },

    };
    if (Object.keys(data).length > 0) {
       requestOptions.body = JSON.stringify(data);
    }
    return fetch(`${basePath}${apiUrl}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 404) {
                response.statusText = 'not found';
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}