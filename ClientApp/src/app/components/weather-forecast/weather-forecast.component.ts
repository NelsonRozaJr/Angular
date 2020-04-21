import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WeatherForecast } from '../../models/WeatherForecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html'
})

export class WeatherForecastComponent implements OnInit {
  private tokenHeader: HttpHeaders;
  public forecasts: WeatherForecast[];

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private toastr: ToastrService) {
      this.tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });  
  }
  
  ngOnInit(): void {
    this.getWeatherForecasts();
  }

  getWeatherForecasts() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast', { headers: this.tokenHeader }).subscribe(
      result => {
        this.forecasts = result;
      }, error => this.toastr.error(error.message));
  }
}
