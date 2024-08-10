import { Logger, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Companies, CompaniesSchema } from '../schemas/companies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, Logger],
})
export class CompaniesModule {}
