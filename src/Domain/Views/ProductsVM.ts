import { List, NeoModel } from '@singularsystems/neo-core';
import { Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../DomainTypes';
import Product from '../Models/Product';

@NeoModel
export default class ProductsVM extends Views.ViewModelBase {

    public products = new List(Product);
    constructor(
    taskRunner                  = AppService.get(Types.Neo.TaskRunner),
    private notifications       = AppService.get(Types.Neo.UI.GlobalNotifications),
    private productsApiClient   = AppService.get(Types.Domain.ApiClients.ProductsApiClient),
    private dataCache = AppService.get(Types.Domain.Services.DataCache)) 
    {
        super(taskRunner);
    }

    public async initialise() {
        const response = await this.taskRunner.waitFor(this.productsApiClient.get());
        this.products.set(response.data);
    }

    public async saveProducts(){
        this.taskRunner.run(async () => {
            const response = await this.productsApiClient.saveList(this.products.toJSArray());
            this.dataCache.products.expire();
            this.products.update(response.data);
            this.notifications.addSuccess("Products saved", "Products saved successfully", 4);
        });
    }
}