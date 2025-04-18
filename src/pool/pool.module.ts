import { Module } from '@nestjs/common';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from 'src/contract/entity/contract.entity';
import { Network } from 'src/network/entity/network.entity';
import { Asset } from 'src/asset/entity/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Network, Asset])],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
