import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsAuthGuard implements CanActivate {
    constructor(
    private  jwtservice: JwtService, // Import JwtService to verify tokens
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeaders(req.headers);
    if (!token) {
      return false;
    }
    try {
        const payload = this.jwtservice.verify(token, { secret: process.env.JWT_SECRET });
        req.userId=payload.id
        
    } catch (e) {
        throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  getTokenFromHeaders(headers) {
    const authorization = headers['authorization'];

    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
