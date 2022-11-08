export const redirect = (location) => {
    return (incoming, response) => {
        response.writeHead(302, { 'location': location });
        response.end();
    }
};
