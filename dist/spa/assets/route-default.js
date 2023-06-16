import { serveAsset } from './serve-asset.js';

export class RouteDefault {
    constructor(assetProvider) {
        this.assetProvider = assetProvider;
    }

    matches() {
        return true;
    }

    go(request, response) {
        serveAsset(this.assetProvider)(request, response);
    }
}
