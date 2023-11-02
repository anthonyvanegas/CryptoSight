import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asset } from '../asset.model';
import { AssetService } from '../asset.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy{
  assets: Asset[] = [];
  private assetsSub: Subscription = new Subscription;
  displayedColumns: string[] = ['name', 'price', 'change24h', 'action'];
  assetsDataSource: MatTableDataSource<Asset> = new MatTableDataSource<Asset>;

  constructor(public assetService: AssetService) {}

  ngOnInit() {
    this.assets = this.assetService.getAssets();
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

  logout() {
    console.log('Logout button clicked!');
  }

}
