import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../shared/services/configuration.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string, private configurationService: ConfigurationService) {

    // Configuration Settings:
    if (this.configurationService.isReady)
      this.loadData(httpClient, this.configurationService.serverSettings.webapigatewayUrl);
    else
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.loadData(httpClient, baseUrl);
      });    
  }

  loadData(httpClient: HttpClient, baseUrl: string) {
    httpClient.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
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
