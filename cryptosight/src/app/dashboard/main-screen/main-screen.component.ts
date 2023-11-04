import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asset } from '../asset/asset.model';
import { AvailableSymbol } from '../asset/available-symbol.model';
import { AssetService } from '../asset/asset.service';
import { AvailableSymbolsService } from '../asset/available-symbol.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainscreenComponent implements OnInit, OnDestroy{
  assets: Asset[] = [];
  symbols: AvailableSymbol[] = [];
  private assetsSub: Subscription = new Subscription;
  private availableSymbolsSub: Subscription = new Subscription;
  displayedColumns: string[] = ['rank', 'symbol', 'name', 'price', 'change24h', 'action'];
  assetsDataSource: MatTableDataSource<Asset> = new MatTableDataSource<Asset>;

  constructor(public assetService: AssetService, public availableSymbolsService: AvailableSymbolsService) {}

  ngOnInit() {
    this.availableSymbolsService.loadAvailableSymbols();

    this.availableSymbolsSub = this.availableSymbolsService.getAvailableSymbolesUpdateListener()
      .subscribe((symbols: AvailableSymbol[]) => {
        this.symbols = symbols;
        this.assetService.loadAssets(this.symbols);
    });

    this.assetsSub = this.assetService.getAssetsUpdateListener()
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
    });
  }

  ngOnDestroy() {
    this.assetsSub.unsubscribe();
    this.availableSymbolsSub.unsubscribe();
  }

  viewAssetDetails(asset: any) {
    console.log('Asset view clicked!', asset.name);
  }
}
