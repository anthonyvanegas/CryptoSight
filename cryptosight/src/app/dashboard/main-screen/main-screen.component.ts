import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asset } from '../../asset/asset.model';
import { AssetService } from '../../asset/asset.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainscreenComponent implements OnInit, OnDestroy{
  assets: Asset[] = [];
  private assetsSub: Subscription = new Subscription;
  displayedColumns: string[] = ['rank', 'name', 'price', 'change24h', 'action'];
  assetsDataSource: MatTableDataSource<Asset> = new MatTableDataSource<Asset>;

  constructor(public assetService: AssetService) {}

  ngOnInit() {
    this.assetService.getAssets("bitcoin,ethereum,cosmos");
    this.assetService.startPolling;
    this.assetsSub = this.assetService.getAssetsUpdateListener()
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
    });
  }

  ngOnDestroy() {
    this.assetsSub.unsubscribe();
  }

  viewAssetDetails(asset: any) {
    console.log('Asset view clicked!', asset.name);
  }
}