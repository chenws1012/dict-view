import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ResDto } from './ResDto';
import { PageReqDto } from './pageReqDto';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(
    private http: HttpClient
  ) { }


  // private baseUrl= 'http://localhost:9005';
  private baseUrl= 'http://172.81.206.37:9005';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }


  getDictPage(param: PageReqDto): Observable<ResDto>{
    const url = `${this.baseUrl}/dict/page`

    const reqBody = {
      "dictTypeCd": param['dictTypeCd'],
      "dictTypeName": param['dictTypeName'],
      "pageNo":  param['pageNo'] ,
      "pageSize": param['pageSize'] 
    }

    return this.http.post<ResDto>(url,reqBody,this.httpOptions)
      .pipe(
        retry(3),// retry a failed request up to 3 times
      );
  }

  getDictById(id: string): Observable<ResDto>{
    const url = `${this.baseUrl}/dict/getById?id=${id}`;

    return this.http.get<ResDto>(url,this.httpOptions)
      .pipe(
        retry(3)
      );
  }

  edit(param: any): Observable<ResDto>{
    const url = `${this.baseUrl}/dict/edit`;

    // const reqBody = {
    //   "dictTypeCd": param['dictTypeCd'],
    //   "dictTypeName": param['dictTypeName'],
    //   "dispOrderNo": param['dispOrderNo'],
    //   "enableFlg": param['enableFlg'],
    //   "id": param['id'],
    //   "remark": param['remark']
    // }

    return this.http.post<ResDto>(url,param,this.httpOptions);
  }

  addNew(param: any): Observable<ResDto>{
    const url = `${this.baseUrl}/dict/save`;
    return this.http.post<ResDto>(url,param,this.httpOptions);
  }

  deleteDictType(id: string): Observable<ResDto>{
    const url = `${this.baseUrl}/dict/delete?dictTypeId=${id}`;
    return this.http.get<ResDto>(url);

  }
}
