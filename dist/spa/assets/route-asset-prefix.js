import { serveAsset } from './serve-asset.js';

export class RouteAssetPrefix {
    constructor(prefix, assetProvider) {
        this.prefix = prefix;
        this.assetProvider = assetProvider;
    }

    matches(incoming) {
        return incoming.url.indexOf(this.prefix) === 0;
    }

    go(request, response) {
        serveAsset(this.assetProvider)(request, response);
    }
}
