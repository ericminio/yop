import { JSDOM } from 'jsdom';

const open = (url, done) => {
    return new Promise((resolve, reject) => {
        JSDOM.fromURL(url, { 
            runScripts: "dangerously", 
            resources: "usable" 
        }).then(dom => {   
            joe.window = dom.window;             
            joe.document = dom.window.document;
            if (joe.document.readyState === 'loading') {
                joe.document.addEventListener('DOMContentLoaded', () => {                    
                    resolve();
                });                
            }
            else {
                resolve();
            }
        }).catch(reject);
    });   
};

const close = (done) => {
    done();
};

const clicks = (text) => {
    find({ tag:'button', text }).click();
};

const enters = (prompt) => {
    let label = find({ tag:'label', text:prompt });
    return element(`#${label.htmlFor}`);
};

const amazement = () => {
    return element('body').textContent;
};

export const joe = { open, close, amazement, enters, clicks };

const find = (options) => {
    let candidates = Array.from(joe.document
        .querySelectorAll(options.tag))
        .filter(element => element.textContent == options.text);
    if (candidates.length === 0) {
        throw new Error(`${options.tag} with text '${options.text}' not found`);
    }
    return candidates[0];
};

const element = (selector) => {
    return joe.document.querySelector(selector);
};
