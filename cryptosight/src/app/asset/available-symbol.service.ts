import { Injectable } from '@angular/core';
import { AvailableSymbol } from './available-symbol.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class AvailableSymbolsService {
  private availableSymbols: AvailableSymbol[] = [];
  private availableSymbolsUpdated = new Subject<AvailableSymbol[]>();
  
  constructor(private http: HttpClient) {}

  loadAvailableSymbols() {
    this.http
    .get<{message: string, symbols: any}>('http://localhost:3000/api/symbols')
    .pipe(map((symbolData) => {
      return symbolData.symbols.map((availableSymbol: {_id: any; symbol: any;}) => {
        return {
          id: availableSymbol._id,
          symbol: availableSymbol.symbol
        };
      });
    }))
    .subscribe((transformedSymbols) => {
      this.availableSymbols = transformedSymbols;
      this.availableSymbolsUpdated.next([...this.availableSymbols]);
    });
  }

  getAvailableSymbolesUpdateListener() {
    return this.availableSymbolsUpdated.asObservable();
  }
}
