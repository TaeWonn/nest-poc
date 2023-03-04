import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionManagerService {
  constructor(private dataSource: DataSource) {}

  async execute<T>(run: (runner: QueryRunner) => T) {
    const runner = this.dataSource.createQueryRunner();
    try {
      await runner.connect();
      await runner.startTransaction();
      const result = run(runner);
      await runner.commitTransaction();

      return result;
    } catch (e) {
      await runner.rollbackTransaction();
      throw e;
    } finally {
      await runner.release();
    }
  }
}
