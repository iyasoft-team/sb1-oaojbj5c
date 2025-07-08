import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AyahEval } from '../models/session.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AyahEvalService {
  private baseUrl = environment.apiUrl+'/AyahEvals';

  constructor(private http: HttpClient) {}

  // Post a single AyahEval
  postSingle(evalItem: AyahEval): Observable<AyahEval> {
    return this.http.post<AyahEval>(this.baseUrl, evalItem);
  }

  // Post a list of AyahEvals
  postMultiple(evals: AyahEval[]): Observable<AyahEval[]> {
    return this.http.post<AyahEval[]>(this.baseUrl, evals);
  }

  // Optionally: Get all evaluations
  getAll(): Observable<AyahEval[]> {
    return this.http.get<AyahEval[]>(this.baseUrl);
  }
}
