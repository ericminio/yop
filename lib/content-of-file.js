import fs from 'fs';

export const contentOfFile = (file) => fs.readFileSync(file).toString();

export const fileExists = (file) => fs.existsSync(file);
