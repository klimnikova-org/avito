import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OffersService } from '../offers.service';

@Injectable()
export class OfferGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private offersService: OffersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const accessToken = req.headers['authorization']
            ?.replace('Bearer', '')
            .trim();
        const { sub: userId } = this.jwtService.decode(accessToken) as any;

        const offer = await this.offersService.findOne(req.query.id);
        console.log(offer?.user.id === userId);
        if (offer?.user.id === userId) {
            return true;
        }
    }
}
