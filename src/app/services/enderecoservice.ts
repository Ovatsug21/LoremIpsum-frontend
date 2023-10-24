import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../models/enderecomodel';

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {
    private apiUrl = 'https://localhost:44391/endereco';

    constructor(private http: HttpClient) { }

    getEnderecos(): Observable<Endereco[]> {
        return this.http.get<Endereco[]>(this.apiUrl);
    }

    // getEnderecoId(id: number): Observable<Endereco> {
    //     const url = `${this.apiUrl}/${id}`;
    //     return this.http.get<Endereco>(url);
    // }

    getEnderecosCliente(clienteId: number): Observable<Endereco[]> {
        return this.http.get<Endereco[]>(`${this.apiUrl}/${clienteId}`);
    }

    postEndereco(idCliente: number, endereco: Endereco): Observable<Endereco> {
        const url = `${this.apiUrl}/${idCliente}`;
        return this.http.post<Endereco>(url, endereco);
    }

    updateEndereco(endereco: Endereco): Observable<void> {
        const url = `${this.apiUrl}/${endereco.id}`;
        return this.http.put<void>(url, endereco);
    }

    deleteEndereco(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}