import { Db, Collection } from 'mongodb';

interface QueryConfig {
  operation: 'find' | 'aggregate' | 'lookup';
  filters?: Record<string, any>;
  pipeline?: Record<string, any>[];
  sort?: Record<string, number>;
  limit?: number;
  skip?: number;
  projection?: Record<string, number>;
}

export class QueryProcessor {
  constructor(private readonly collection: Collection) {}

  async process(queryConfig: QueryConfig): Promise<any[]> {
    switch (queryConfig.operation) {
      case 'find':
        return this.processFindQuery(queryConfig);
      case 'aggregate':
        return this.processAggregateQuery(queryConfig);
      case 'lookup':
        return this.processLookupQuery(queryConfig);
      default:
        throw new Error('Unsupported operation');
    }
  }

  private async processFindQuery(queryConfig: QueryConfig): Promise<any[]> {
    const { filters = {}, sort, limit, skip, projection } = queryConfig;
    let query = this.collection.find(filters);

    if (sort) query = query.sort(sort);
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    if (projection) query = query.project(projection);

    return query.toArray();
  }

  private async processAggregateQuery(queryConfig: QueryConfig): Promise<any[]> {
    const { pipeline = [] } = queryConfig;
    return this.collection.aggregate(pipeline).toArray();
  }

  private async processLookupQuery(queryConfig: QueryConfig): Promise<any[]> {
    const { filters = {}, pipeline = [] } = queryConfig;
    const lookupPipeline = [
      { $match: filters },
      ...pipeline
    ];
    return this.collection.aggregate(lookupPipeline).toArray();
  }
}