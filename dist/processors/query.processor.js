"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProcessor = void 0;
class QueryProcessor {
    constructor(collection) {
        this.collection = collection;
    }
    async process(queryConfig) {
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
    async processFindQuery(queryConfig) {
        const { filters = {}, sort, limit, skip, projection } = queryConfig;
        let query = this.collection.find(filters);
        if (sort)
            query = query.sort(sort);
        if (skip)
            query = query.skip(skip);
        if (limit)
            query = query.limit(limit);
        if (projection)
            query = query.project(projection);
        return query.toArray();
    }
    async processAggregateQuery(queryConfig) {
        const { pipeline = [] } = queryConfig;
        return this.collection.aggregate(pipeline).toArray();
    }
    async processLookupQuery(queryConfig) {
        const { filters = {}, pipeline = [] } = queryConfig;
        const lookupPipeline = [
            { $match: filters },
            ...pipeline
        ];
        return this.collection.aggregate(lookupPipeline).toArray();
    }
}
exports.QueryProcessor = QueryProcessor;
