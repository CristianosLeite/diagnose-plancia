import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfUrl: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://dl.dropboxusercontent.com/scl/fi/adsjqeuaqjyd1pv3r32ds/Orgulho-e-Preconceito-autor-Jane-Austen.pdf?rlkey=y08d9atr5qv2q2mzbk3sp5ul7&dl=0'); // Replace with your PDF URL
  }

  async getPDF(): Promise<Blob> {
    const url = this.pdfUrl as string;
    return await lastValueFrom(this.http.get(url, { responseType: 'blob' }));
  }
}
