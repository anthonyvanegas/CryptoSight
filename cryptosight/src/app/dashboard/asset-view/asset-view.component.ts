import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvailableSymbol } from '../asset/available-symbol.model';
import { Asset } from '../asset/asset.model';
import { AssetService } from '../asset/asset.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-view',
  templateUrl: './asset-view.component.html',
  styleUrls: ['./asset-view.component.css']
})
export class AssetViewComponent implements OnInit, OnDestroy{
  private symbol: AvailableSymbol = {
    id: "1",
    symbol: "BTC"
  };
  asset: Asset[] = [];
  private assetsSub: Subscription = new Subscription;

  constructor(private assetService: AssetService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.assetService.loadAssets([{ id: "1", symbol: this.activatedRoute.snapshot.queryParams['symbol'] }]);
    this.assetsSub = this.assetService.getAssetsUpdateListener()
    .subscribe((assets: Asset[]) => {
      this.asset = assets;
    });
  }

  ngOnDestroy() {
    this.assetsSub.unsubscribe();
  }
}
