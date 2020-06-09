import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { IConfiguration } from '../models/configuration.model';
import { StorageService } from './storage.service';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class ConfigurationService {
  serverSettings: IConfiguration;
  // observable that is fired when settings are loaded from server
  private settingsLoadedSource = new Subject();
  private baseUrl: string;
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady: boolean = false;

  constructor(private http: HttpClient, private storageService: StorageService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  load() {
    let url = `${this.baseUrl}Home/Configuration`;
    console.log(this.baseUrl);
    this.http.get(url).subscribe((response) => {
      console.log('server settings loaded');
      this.serverSettings = response as IConfiguration;
      console.log(this.serverSettings);
      this.storageService.store('identityUrl', this.serverSettings.identityUrl);
      this.storageService.store('webapigatewayUrl', this.serverSettings.webapigatewayUrl);
      this.isReady = true;
      this.settingsLoadedSource.next();
    });
  }
}
