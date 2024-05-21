export const sutHtml = (html) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <script src="/yop.js"></script>
            <script src="/sut.js"></script>
        </head>

        <body>
            ${html}
        </body>
    </html>
    `;
};
