import { UserService } from 'src/app/service/user.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Response> {
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<Response> {
    return this.userService.getUser(route.paramMap.get('uuid')!);
  }
}
