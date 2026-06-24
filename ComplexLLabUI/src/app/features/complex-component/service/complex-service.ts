import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplexNumber, ComplexRequestDTO } from '../models/complex-number.model';
import { Observable } from 'rxjs';


@Injectable(
    {
        providedIn: 'root'
    }
)
    
export class ComplexService {

    constructor(private httpClient : HttpClient){ }

    private apiUrl = 'https://localhost:7244/api/Complex'

    sum(request : ComplexRequestDTO) : Observable<ComplexNumber>
    {
        return this.httpClient.post<ComplexNumber>(`${this.apiUrl}/add`, request);
    }

    substract(request : ComplexRequestDTO) : Observable<ComplexNumber>
    {
        return this.httpClient.post<ComplexNumber>(`${this.apiUrl}/substract`, request);
    }

    divide(request : ComplexRequestDTO) : Observable<ComplexNumber>
    {
        return this.httpClient.post<ComplexNumber>(`${this.apiUrl}/divide`, request);
    }

    multiply(request : ComplexRequestDTO) : Observable<ComplexNumber>
    {
        return this.httpClient.post<ComplexNumber>(`${this.apiUrl}/multiply`, request);
    }

}
