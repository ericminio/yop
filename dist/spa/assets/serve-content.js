const binaryContentTypes = ['image/jpeg', 'image/png'];

export const serveContent = (contentProvider) => {
    return (request, response) => {
        const { content, contentType } = contentProvider(request);
        response.setHeader('Content-Length', content.length);
        response.setHeader('Content-Type', contentType);
        binaryContentTypes.includes(contentType)
            ? response.end(content, 'binary')
            : response.end(content);
    };
};
