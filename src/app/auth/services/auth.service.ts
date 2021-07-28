import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthResponse, Login, Usuario, Registro } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private http: HttpClient) { }

  get usuario() {
    return { ...this._usuario }
  }

  registro( body: Registro ) {

    const url: string = `${this.baseUrl}/auth/new`;

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {          

          if(resp.ok){

            console.log(resp);
            
            
            localStorage.setItem('token', resp.token!);
            
            this._usuario = {
              uid: resp.uid!,
              username: resp.username!,
              name: resp.name!,
              lastName: resp.lastName!,
              email: resp.email!, 
            }
            
            console.log(this._usuario);

  
          }
          
        }),
        map(resp => resp.ok),
        catchError( err => of(err.error.msg)),
      );
  }

  login(email: string, password: string) {

    const url: string = `${this.baseUrl}/auth`;
    const body: Login = { email, password };
    
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {

        if(resp.ok){

          localStorage.setItem('token', resp.token!);

          this._usuario = {
            uid: resp.uid!,
            username: resp.username!,
            name: resp.name!,
            lastName: resp.lastName!,
            email: resp.email!, 
          }

        }
        
      }),
      map(resp => resp.ok),
      catchError( err => of(err.error.msg)),
    );
  }

  validarToken(): Observable<boolean> {

    const url: string = `${this.baseUrl}/auth/renew`;
    const token: string = localStorage.getItem('token') || "";
    const headers = new HttpHeaders()
      .set('token', token);

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {

          localStorage.setItem('token', resp.token!);

          this._usuario = {
            uid: resp.uid!,
            username: resp.username!,
            name: resp.name!,
            lastName: resp.lastName!,
            email: resp.email!, 
          }

          return resp.ok!;
        }),
        catchError( err => of(false) )
      );
  }

  logout(): void {
    
    localStorage.clear();

  }

}
