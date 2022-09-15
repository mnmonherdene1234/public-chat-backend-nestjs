import { CanActivate, ExecutionContext } from "@nestjs/common"
import { Request } from "express";
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        if (request.body.key == "api")
            return true;
        else
            return false;
    }
}