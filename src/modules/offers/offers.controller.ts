import { OfferGuard } from './guards/offer.guard';
import {
    Body,
    Controller,
    Get,
    Delete,
    Patch,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';

import { AccessGuard } from '../auth/guards/access.guard';

import { OffersService } from './offers.service';
import { OfferDto } from './dto/offer.dto';

@Controller('offers')
export class OffersController {
    constructor(private offersService: OffersService) {}

    @UseGuards(AccessGuard)
    @Get()
    async findAll(@Request() req) {
        return this.offersService.findAllByUser(req.user);
    }

    @UseGuards(AccessGuard)
    @Get()
    async findOne(@Param('id') id: number) {
        return this.offersService.findOne(id);
    }

    @UseGuards(AccessGuard)
    @Post()
    async create(@Body() createOfferDto: OfferDto, @Request() req) {
        return this.offersService.create(createOfferDto, req.user);
    }

    @UseGuards(AccessGuard)
    @UseGuards(OfferGuard)
    @Patch()
    async update(@Param('id') id: number, @Body() updateUserDto: OfferDto) {
        console.log(id);
        return this.offersService.update(id, updateUserDto);
    }

    @UseGuards(AccessGuard)
    @Delete()
    async remove(@Param('id') id: number) {
        return this.offersService.remove(id);
    }
}
