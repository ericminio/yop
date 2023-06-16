import { serveAsset } from './assets/serve-asset.js';

export class RouteAssetEqual {
    constructor(url, assetProvider) {
        this.url = url;
        this.assetProvider = assetProvider;
    }

    matches(incoming) {
        return incoming.url === this.url;
    }

    go(request, response) {
        serveAsset(this.assetProvider)(request, response);
    }
}
