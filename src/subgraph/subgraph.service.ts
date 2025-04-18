import { Injectable, Logger, HttpException, Inject } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SubgraphService {
  private readonly logger = new Logger(SubgraphService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async querySubgraph(query: string, variables: string) {
    try {
      const key = `querySubgraph_${JSON.stringify(query)}_${JSON.stringify(variables)}`;
      const cacheData = await this.cacheManager.get(key);
      if (cacheData) {
        this.logger.log(`\n:return:cache:${key}`);
        return cacheData;
      }

      const config = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

      const response = await axios(config);
      const data = response.data;

      this.cacheManager.store.set(key, data, ConfigService.Cache.ttl);

      return data;
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  async getHistory(address: string, offset: number, limit: number) {
    try {
      let history = [];
      const allData = [];

      const key = `getHistory_${address}`;
      const cacheData = await this.cacheManager.get(key);
      if (cacheData) {
        this.logger.log(`\n:return:cache:${key}`);
        history = (cacheData as Array<any>).slice(offset, offset + limit);
        return {
          offset,
          limit,
          total: (cacheData as Array<any>).length,
          history,
        };
      }

      const configAddSupply = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query addSupplies (
              $address: Bytes!
          ) {
              addSupplies (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      lender: $address
                  }
              ) {
                  lender
                  poolAddress
                  stableCoin
                  amount
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configWithdrawSupply = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query withdrawSupplies (
              $address: Bytes!
          ) {
              withdrawSupplies (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      lender: $address
                  }
              ) {
                  lender
                  poolAddress
                  stableCoin
                  amount
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configCreateLoan = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query createLoans (
              $address: Bytes!
          ) {
              createLoans (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      borrower: $address
                  }
              ) {
                  borrower
                  loanAddress
                  loanInfo_loanId
                  loanInfo_amount
                  loanInfo_stableCoin
                  collateralAmount
                  collateral
                  isYieldGenerating
                  isETH
                  loanInfo_isFiat
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configAddCollateral = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query addCollaterals (
              $address: Bytes!
          ) {
              addCollaterals (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      borrower: $address
                  }
              ) {
                  borrower
                  loanInfo_loanId
                  loanInfo_amount
                  loanInfo_stableCoin
                  collateralAmount
                  collateral
                  isETH
                  loanInfo_isFiat
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configRepayLoan = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query repayLoans (
              $address: Bytes!
          ) {
              repayLoans (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      borrower: $address
                  }
              ) {
                  borrower
                  loanInfo_loanId
                  loanInfo_amount
                  loanInfo_stableCoin
                  repayAmount
                  debtRemain
                  loanInfo_isFiat
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configWithdrawAllCollateral = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query withdrawAllCollaterals (
              $address: Bytes!
          ) {
              withdrawAllCollaterals (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      borrower: $address
                  }
              ) {
                  borrower
                  loanInfo_loanId
                  loanInfo_amount
                  loanInfo_stableCoin
                  collateralAmount
                  collateral
                  isETH
                  loanInfo_isFiat
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const configLiquidate = {
        method: 'POST',
        url: ConfigService.Subgraph.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          query: `query liquidates (
              $address: Bytes!
          ) {
              liquidates (
                  orderBy: blockTimestamp
                  orderDirection: desc
                  where: {
                      borrower: $address
                  }
              ) {
                  borrower
                  loanInfo_loanId
                  loanInfo_amount
                  loanInfo_stableCoin
                  collateralAmount
                  collateral
                  loanInfo_isFiat
                  blockNumber
                  blockTimestamp
                  transactionHash
              }
          }`,
          variables: { address: address },
        }),
      };

      const [
        dataAddSupply,
        dataWithdrawSupply,
        dataCreateLoan,
        dataAddCollateral,
        dataRepayLoan,
        dataWithdrawAllCollateral,
        dataLiquidate,
      ] = await Promise.all([
        axios(configAddSupply),
        axios(configWithdrawSupply),
        axios(configCreateLoan),
        axios(configAddCollateral),
        axios(configRepayLoan),
        axios(configWithdrawAllCollateral),
        axios(configLiquidate),
      ]);

      for (const item of dataAddSupply.data.data.addSupplies) {
        allData.push({
          type: 'add_supply',
          ...item,
        });
      }

      for (const item of dataWithdrawSupply.data.data.withdrawSupplies) {
        allData.push({
          type: 'withdraw_supply',
          ...item,
        });
      }

      for (const item of dataCreateLoan.data.data.createLoans) {
        allData.push({
          type: 'create_loan',
          ...item,
        });
      }

      for (const item of dataAddCollateral.data.data.addCollaterals) {
        allData.push({
          type: 'add_collateral',
          ...item,
        });
      }

      for (const item of dataRepayLoan.data.data.repayLoans) {
        allData.push({
          type: 'repay_loan',
          ...item,
        });
      }

      for (const item of dataWithdrawAllCollateral.data.data
        .withdrawAllCollaterals) {
        allData.push({
          type: 'withdraw_all_collateral',
          ...item,
        });
      }

      for (const item of dataLiquidate.data.data.liquidates) {
        allData.push({
          type: 'liquidate',
          ...item,
        });
      }

      allData.sort((a, b) => b.blockTimestamp - a.blockTimestamp);
      this.cacheManager.store.set(key, allData, ConfigService.Cache.ttl);

      history = allData.slice(offset, offset + limit);

      return {
        offset,
        limit,
        total: allData.length,
        history,
      };
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }
}
