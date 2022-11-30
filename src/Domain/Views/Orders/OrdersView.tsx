import React from 'react';
import { Neo, NeoGrid, Views } from '@singularsystems/neo-react';
import OrdersVM from './OrdersVM';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { viewOrdersRoute } from '../../DomainRoutes';

@observer
export default class OrdersView extends Views.ViewBase<OrdersVM> {

    constructor(props: unknown) {
        super("Orders", OrdersVM, props);
    }

    public render() {
        return (
            <div>
			    <Neo.Card title="Orders">
                    {
                        this.viewModel.newOrder && 
                            <Neo.Form onSubmit={() => this.viewModel.submitOrder()} model={this.viewModel.newOrder} showSummaryModal>
                                {(order, orderMeta) => (
                                    <div>
                                        <Neo.FormGroupInline bind={orderMeta.customerName} />
                                        <NeoGrid.Grid items={order.orderDetails}>
                                            {(orderDetail, orderDetailMeta) => (
                                                <NeoGrid.Row>
                                                    <NeoGrid.Column readOnly bind={orderDetailMeta.productName} />
                                                    <NeoGrid.Column readOnly bind={orderDetailMeta.price} />
                                                    <NeoGrid.Column bind={orderDetailMeta.quantity} />
                                                    <NeoGrid.Column sum readOnly bind={orderDetailMeta.value} />
                                                </NeoGrid.Row>
                                            )}
                                        </NeoGrid.Grid>
                                        <div className="text-right mt-3">
                                            <Neo.Button isSubmit size="lg" icon="coffee">Place Order</Neo.Button>
                                        </div>
                                    </div>
                                    
                                )}
                            </Neo.Form>
                            
                    }
                    {
                    !this.viewModel.newOrder && 
                    <Neo.Alert variant="success" heading="Order submitted" animateInitial className="mt-4">
                        Your order has been submitted, <Link to={viewOrdersRoute.path}>view your orders here</Link>, 
                        or <Neo.Button variant="link" className="btn-link-inline" onClick={() => this.viewModel.setupOrder()}>create another order</Neo.Button>.

                    </Neo.Alert>
                    }
                </Neo.Card>
            </div>
        );
    }
}