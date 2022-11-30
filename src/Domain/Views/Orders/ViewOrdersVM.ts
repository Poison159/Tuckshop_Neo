import { List, NeoModel } from '@singularsystems/neo-core';
import { Views } from '@singularsystems/neo-react';
import { AppService, DomainTypes, Types } from '../../DomainTypes';
import OrderLookup from '../../Models/Orders/Queries/OrderLookup';
import OrderLookupCriteria from '../../Models/Orders/Queries/OrderLookupCriteria';

@NeoModel
export default class ViewOrdersVM extends Views.ViewModelBase {
    public criteria = new OrderLookupCriteria();
    public foundOrders = new List(OrderLookup);
    
    constructor(
        taskRunner = AppService.get(Types.Neo.TaskRunner),
        private notifications = AppService.get(Types.Neo.UI.GlobalNotifications),
        private ordersQueryApiClient = AppService.get(DomainTypes.ApiClients.OrdersQueryApiClient),
        private ordersCommandApiClient = AppService.get(DomainTypes.ApiClients.OrdersCommandApiClient)) {
    
        super(taskRunner);
    }

    public async initialise() {

    }

    public async findOrders() {
        const response = await this.taskRunner.waitFor(this.ordersQueryApiClient.getOrderLookup(this.criteria.toQueryObject()));
        this.foundOrders.set(response.data);
    }

    
    public completeOrder(order: OrderLookup) {
        this.taskRunner.run(async () => {
            await this.ordersCommandApiClient.completeOrder({ orderId: order.orderId });
            order.completedOn = new Date();
        })
    }

    
    
    public cancelOrder(order: OrderLookup, reason: string) {
        this.taskRunner.run(async () => {
            await this.ordersCommandApiClient.cancelOrder({ orderId: order.orderId, reason });
            order.cancelledOn = new Date();
            order.cancelledReason = reason;
        });
    }


    public showInvoice(){

    }


}