import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";

@Injectable()
export class HasUserId implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.headers['user-id'] || !isValidObjectId(req.headers['user-id'])) {
           throw new BadRequestException("Invalid or missing user ID in headers. Please provide a valid user ID.");
            
        }
        return true;
    }
}