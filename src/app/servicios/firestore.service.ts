import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit} from '@angular/core'
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';


const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "colbeta-82979.firebaseapp.com",
  projectId: "colbeta-82979",
  storageBucket: "colbeta-82979.firebasestorage.app",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig): getApp();



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
apiUrl = "https://firebasestorage.googleapis.com/v0/b/colbeta-82979.firebasestorage.app/o"
storage = getStorage();
fileUrl: string = '';

  constructor(private http: HttpClient) { 

}


obtenerDownloadURL(fileName: string): Promise<string>{
  const fileRef = ref(this.storage, fileName);
  return getDownloadURL(fileRef);
}



guardarFirma(firmaFile: File){
  const formData = new FormData();
  formData.append('file', firmaFile);
  const fileNameEncode = encodeURIComponent(firmaFile.name);
  const headers = new HttpHeaders({
    'Content-Type': firmaFile.type
  })


return this.http.post(`${this.apiUrl}?name=${fileNameEncode}`, firmaFile, {headers})
}

}
