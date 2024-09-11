import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
  message: string;
  fileName: string;
  filePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = 'http://localhost:4000/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<UploadResponse>(this.uploadUrl, formData);
  }
}
