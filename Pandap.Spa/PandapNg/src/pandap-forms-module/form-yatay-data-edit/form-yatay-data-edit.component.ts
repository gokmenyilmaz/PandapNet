import { Component, OnInit } from '@angular/core';
import { FormYatayData } from '../models/formYatayData';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { FormTanim } from '../models/formTanim';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FormSoru } from '../models/formSoru';
import { ActivatedRoute, Router } from '@angular/router';
import SoruCevapExtra from '../models/SoruCevapExtra';

@Component({
  selector: 'app-form-yatay-data-edit',
  templateUrl: './form-yatay-data-edit.component.html',
})
export class FormYatayDataEditComponent implements OnInit {
  public FormYatayData: FormYatayData;
  public FormTanim: FormTanim;
  public FormSorular: FormSoru[];

  public baseUrl: string = environment.baseUrl;
  FormAd: string;
  FormGunlukId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.FormAd = this.route.snapshot.paramMap.get('formAd');
    this.FormGunlukId = this.route.snapshot.paramMap.get('formGunlukId');

    console.log(this.FormGunlukId);
  }

  async ngOnInit(): Promise<void> {
    this.FormSorular = await this.http
      .get<FormSoru[]>(
        this.baseUrl + `FormSoru/FormSorulariGetir?formAd=${this.FormAd}`
      )
      .toPromise();

    this.FormYatayData = await this.http
      .get<FormYatayData>(
        this.baseUrl +
          `FormYatayData/FormYatayDataGetirFromId?formGunlukId=${this.FormGunlukId}&formAd=${this.FormAd}`
      )
      .toPromise();

    this.FormYatayData.CevapEktraObj = JSON.parse(this.FormYatayData.CevapJson);

    let extraObj = this.FormYatayData.CevapEktraObj;

    for (var i = 1; i < 100; i++) {
      let propName = 'S' + i.toString().padStart(2, '0');

      if (extraObj[propName] == null) {
        extraObj[propName] = { Aciklama: '', Dosyalar: [] };
      }
    }
  }
  async kaydet() {
    this.FormYatayData.CevapJson = JSON.stringify(
      this.FormYatayData.CevapEktraObj
    );

    console.log(this.FormYatayData);

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let yol = this.baseUrl + `FormYatayData/Kaydet`;

    let sonuc = await this.http
      .post(yol, this.FormYatayData, { ...options, responseType: 'text' })
      .toPromise();

    alert('Kayıt işlemi tamalandı');
  }

  modelChangeNumber($event: number, soruKod: string) {

    this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';

    if ($event == null) return $event;

    this.FormYatayData[soruKod] = $event.toString();
    var soru = this.FormSorular.find((c) => c.SoruKod == soruKod);

    var min = parseFloat(soru.MinMax.split('-')[0].replace(',','.'));
    var max = parseFloat(soru.MinMax.split('-')[1].replace(',','.'));
    var deger = parseFloat($event.toString());


    console.log(min,max,deger);

    if (deger < min || deger > max) {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari = 'Aralık Dışı';
    } else {
      this.FormYatayData.CevapEktraObj[soruKod].Uyari = '';
     
    }
    console.log(deger,this.FormYatayData.CevapEktraObj[soruKod]);
  }
}
