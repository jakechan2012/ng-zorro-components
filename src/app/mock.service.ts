import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class MockService {
  private base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  constructor(private httpclient: HttpClient) {}

  get(name: string, delayTime = 600): Observable<any> {
    return this.httpclient.get(`/mocks/${name}.json`).pipe(
      map(n => {
        let str = JSON.stringify(n);
        while (/{random}/.test(str)) {
          str = str.replace('{random}', this.randomStr());
        }
        return JSON.parse(str);
      }),
      delay(delayTime)
    );
  }

  private randomStr() {
    let str = '';
    for (let i = 0; i < 8; i++) {
      str += this.base[Math.floor(Math.random() * 62)];
    }
    return str;
  }
}
