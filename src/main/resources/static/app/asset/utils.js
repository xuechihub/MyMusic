const service = (url, options) => {
    return fetch(`${__site__}${url}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    }).catch((error) => {
        Promise.reject(error);
    }).then((response) => {
        return response.json();
    });
};

module.exports = {
    service
};