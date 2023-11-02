import { Asset } from './asset.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AssetService {
    private assets: Asset[] = [];
    private assetsUpdated = new Subject<Asset[]>();

    getAssets() {
        this.assets = [ 
            { name: 'Bitcoin', price: 20000, change24h: 2 },
            { name: 'Ethereum', price: 1500, change24h: 1 },
            { name: 'Litecoin', price: 100, change24h: 0.5 },
        ];
        this.assetsUpdated.next([...this.assets]);
        return this.assets;
    }

    getAssetsUpdateListener() {
        return this.assetsUpdated.asObservable();
    }
}