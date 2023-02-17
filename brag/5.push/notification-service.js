import {
    decodeSingleFrameOfText,
    encodeSingleFrameOfText,
    payload,
} from '../../lib/index.js';

let registrations = [];
export const clearRegistrations = () => (registrations = []);

export const socketDataListener = (socket, data) => {
    registrations.push({
        socket,
        events: JSON.parse(decodeSingleFrameOfText(data)).signup,
    });
};

export const notify = async (incoming, response) => {
    response.writeHead(200);
    response.end();

    const notification = JSON.parse(await payload(incoming));
    registrations
        .filter((r) => r.events.includes(notification.event))
        .forEach((r) =>
            r.socket.write(encodeSingleFrameOfText(notification.message))
        );
};
