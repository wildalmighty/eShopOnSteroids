import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../shared/services/configuration.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(private httpClient: HttpClient, private configurationService: ConfigurationService, private storageService: StorageService) {    
  }

  ngOnInit() {
    // Configuration Settings:
    if (this.configurationService.isReady) {
      this.loadData();
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.loadData();
      });
    }
  }

  loadData() {    
    this.httpClient.get<WeatherForecast[]>(this.configurationService.serverSettings.webApiGatewayUrl + '/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
