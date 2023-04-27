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
    new Promise((resolve, reject) => {
        payload(incoming)
            .then((data) => {
                const notification = JSON.parse(data);
                if (!notification.event || !notification.message) {
                    throw 'bad request';
                }
                return notification;
            })
            .then((notification) => {
                response.writeHead(200);
                response.end();
                resolve(notification);
            })
            .catch(reject);
    })
        .then((notification) => {
            registrations
                .filter((r) => r.events.includes(notification.event))
                .forEach((r) =>
                    r.socket.write(
                        encodeSingleFrameOfText(notification.message)
                    )
                );
        })
        .catch(() => {
            response.writeHead(400);
            response.end();
        });
};
