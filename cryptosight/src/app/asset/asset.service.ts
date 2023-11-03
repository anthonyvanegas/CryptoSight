import { Asset } from './asset.model';
import { Subject, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AssetService {
    private assets: Asset[] = [];
    private slugs: string = "";
    private assetsUpdated = new Subject<Asset[]>();

    constructor(private http: HttpClient) {}

    getAssets(slugs: string) {
        this.slugs = slugs;
        const params = { slug: this.slugs };
        this.http
            .get<{ message: string; response: any; data: any }>('http://localhost:3000/api/assets', { params })
            .subscribe((response) => {
                for (const assetData of JSON.parse(response.data)) {
                    this.assets.push({ 
                        rank: assetData.cmc_rank,
                        name: assetData.name, 
                        price: assetData.quote.USD.price, 
                        change24h: assetData.quote.USD.percent_change_24h
                    });
                }
                this.assetsUpdated.next([...this.assets]);
                console.log(this.assets)
        });
    }

    startPolling() {
        timer(30000, 30000)
        .subscribe(() => {
            this.getAssets(this.slugs);
        });
    }

    getAssetsUpdateListener() {
        return this.assetsUpdated.asObservable();
    }
}