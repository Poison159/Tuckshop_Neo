import { AppServices } from '@singularsystems/neo-core';
import ProductsApiClient from './ApiClients/ProductsApiClient';
import OrdersCommandApiClient from './ApiClients/OrdersCommandApiClient';
import { DomainTypes } from './DomainTypes';
import { DomainDataCache } from './Services/DomainDataCache';
import OrdersQueryApiClient from './ApiClients/OrdersQueryApiClient';

export const DomainAppModule = new AppServices.Module("Domain", container => {

    // Api Clients
    // container.bind(DomainTypes.ApiClients.ApiClient).to(ApiClient).inSingletonScope();
    // Services
    container.bind(DomainTypes.Services.DataCache).to(DomainDataCache).inSingletonScope();
    container.bind(DomainTypes.ApiClients.ProductsApiClient).to(ProductsApiClient).inSingletonScope();
    container.bind(DomainTypes.ApiClients.OrdersCommandApiClient).to(OrdersCommandApiClient).inSingletonScope();
    container.bind(DomainTypes.ApiClients.OrdersQueryApiClient).to(OrdersQueryApiClient).inSingletonScope();
});

export const DomainTestModule = new AppServices.Module("Domain", container => {
    // bind test types
});