import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfUrl: SafeResourceUrl = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  async getPDF(): Promise<Blob> {
    const url = this.pdfUrl as string;
    return await lastValueFrom(this.http.get(url, { responseType: 'blob' }));
  }
}
