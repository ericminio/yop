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

    payload(incoming)
        .then((data) => JSON.parse(data))
        .then((notification) => {
            registrations
                .filter((r) => r.events.includes(notification.event))
                .forEach((r) =>
                    r.socket.write(
                        encodeSingleFrameOfText(notification.message)
                    )
                );
        });
};
