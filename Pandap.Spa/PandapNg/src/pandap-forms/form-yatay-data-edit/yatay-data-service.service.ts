import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormSoru } from '../models/formSoru';

@Injectable({
  providedIn: 'root',
})
export class YatayDataServiceService {
  constructor(private http: HttpClient) {}

  async formSorulariGetir() {
    let data = await this.http
      .get<FormSoru[]>(
       environment.apiUrl + `FormSoru/FormSorulariGetir?formAd=SH-Gunluk1`
      )
      .toPromise();
    return data;
  }
}