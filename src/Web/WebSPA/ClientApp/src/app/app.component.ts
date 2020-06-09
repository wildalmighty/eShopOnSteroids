import { Component } from '@angular/core';
import { ConfigurationService } from './shared/services/configuration.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ConfigurationService, StorageService]
})

export class AppComponent {
  title = 'app';

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {

    //Get configuration from server environment variables:
    console.log('configuration');
    this.configurationService.load();
  }
}
