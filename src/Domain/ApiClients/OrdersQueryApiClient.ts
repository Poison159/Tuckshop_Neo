import { Data, Model, Utils } from '@singularsystems/neo-core';
import { AxiosPromise } from 'axios';
import { injectable } from 'inversify';
import { AppService, Types } from '../DomainTypes';
import OrderLookupCriteria from '../Models/Orders/Queries/OrderLookupCriteria';
import OrderLookup from '../Models/Orders/Queries/OrderLookup';

export interface IOrdersQueryApiClient {

    getOrderLookup(criteria: Model.PartialPlainNonTrackedObject<OrderLookupCriteria>): AxiosPromise<Array<Model.PlainObject<OrderLookup>>>;

    // Client only properties / methods
}

@injectable()
export default class OrdersQueryApiClient extends Data.ApiClientBase implements IOrdersQueryApiClient {

    constructor (config = AppService.get(Types.App.Config)) {
        super(`${config.apiPath}/OrdersQuery`);
    }

    public getOrderLookup(criteria: Model.PartialPlainNonTrackedObject<OrderLookupCriteria>): AxiosPromise<Array<Model.PlainObject<OrderLookup>>> {
        return this.axios.get(`${this.apiPath}/Lookup?${Utils.getQueryString(criteria)}`);
    }

    // Client only properties / methods
}