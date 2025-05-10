import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  loadJsonFiles(): Observable<any[]> {
    const fileNames = ['a.json', 'b.json', 'c.json'];
    const requests = fileNames.map(name =>
      this.http.get<any>(`assets/data/${name}`)
    );
    return forkJoin(requests); 
  }
}
