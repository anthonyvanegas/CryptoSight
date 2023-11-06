import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asset } from '../asset/asset.model';
import { AvailableSymbol } from '../asset/available-symbol.model';
import { AssetService } from '../asset/asset.service';
import { AvailableSymbolsService } from '../asset/available-symbol.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  searchQuery: string = '';

  constructor(public assetService: AssetService, 
              public availableSymbolsService: AvailableSymbolsService, private router: Router) {}

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
        this.updateAssetsTable(); // Update the assets table when new assets are received
    });
  
  }

  filterAssets(): Asset[] {
    const searchQueryLower = this.searchQuery.toLowerCase();
    return this.assets.filter(asset =>
      asset.symbol.toLowerCase().includes(searchQueryLower) ||
      asset.name.toLowerCase().includes(searchQueryLower)
    );
  }  

  updateAssetsTable() {
    this.assetsDataSource.data = this.filterAssets();
  }
  
  viewAssetDetails(asset: Asset) {
    this.router.navigate(['/asset-view'], { queryParams: { symbol: asset.symbol } });
  }

  ngOnDestroy() {
    this.assetsSub.unsubscribe();
    this.availableSymbolsSub.unsubscribe();
    this.assetService.clearAssets();
  }

}
