import { Asset } from './asset.model';
import { AvailableSymbol } from './available-symbol.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AssetService {
    private assets: Asset[] = [];
    private assetsUpdated = new Subject<Asset[]>();

    constructor(private http: HttpClient) {}

    loadAssets(symbols: AvailableSymbol[]){
        let symbolList = []
        for (const availableSymbol of symbols) {
            symbolList.push(availableSymbol.symbol);
        }
        this.updateAssets(symbolList);
    }

    addAssetToWatchlist(symbol: AvailableSymbol){
        this.updateAssets([symbol.symbol]);
    }

    private updateAssets(symbols: string[]) {
        let params = null;
        if (symbols.length === 0) {
            return;
        } else if(symbols.length === 1) {
            params = { symbolQuery: symbols[0] + ","};
        } else {
            params = { symbolQuery: symbols.join(",") };
        }
        this.http
            .get<{ message: string; response: any; }>('http://localhost:3000/api/assets', { params })
            .subscribe((returnedData) => {
                for (const assetSymbol of symbols) {
                    const assetData = returnedData.response.data[assetSymbol][0]
                    this.assets.push({ 
                    symbol: assetData.symbol,
                    rank: assetData.cmc_rank,
                    name: assetData.name,
                    price: assetData.quote.USD.price, 
                    change24h: assetData.quote.USD.percent_change_24h,
                    marketCap: assetData.quote.USD.market_cap,
                    volume24h: assetData.quote.USD.volume_24h
                });
            }
            this.assetsUpdated.next([...this.assets]);
        });
    }

    getAssetsUpdateListener() {
        return this.assetsUpdated.asObservable();
    }

    clearAssets() {
        this.assets = [];
    }
}