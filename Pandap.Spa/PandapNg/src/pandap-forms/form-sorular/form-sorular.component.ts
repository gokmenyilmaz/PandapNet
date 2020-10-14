import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormSoru } from '../models/formSoru';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sorular',
  templateUrl: './form-sorular.component.html',
})
export class FormSorularComponent implements OnInit {
  public FormSorular: FormSoru[];

 

  constructor(private http: HttpClient,private router: Router) {
   
  }

  async ngOnInit(): Promise<void> {

    
    var userToken=JSON.parse(localStorage.getItem("currentUser")).Token;

    let options = {
      headers: {
        'Authorization':'Bearer ' + userToken
      },
    };

    this.FormSorular = await this.http
    .get<FormSoru[]>(
      environment.apiUrl + '/FormSoru/FormSorulariGetir?formAd=SH-Gunluk',options
    )
    .toPromise();
  }
    
}

