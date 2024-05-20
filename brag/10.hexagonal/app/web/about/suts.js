export const sutHtml = (tag) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <script src="/yop.js"></script>
            <script src="/sut.js"></script>
        </head>

        <body>
            <${tag}></${tag}>
        </body>
    </html>
    `;
};
