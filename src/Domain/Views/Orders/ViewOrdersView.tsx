import React from 'react';
import { Neo, NeoGrid, Views } from '@singularsystems/neo-react';
import ViewOrdersVM from './ViewOrdersVM';
import { observer } from 'mobx-react';
import { Data, Misc, ModalUtils } from '@singularsystems/neo-core';
import { OrderStatus } from '../../Models/Orders/OrderStatus';
import OrderLookup from '../../Models/Orders/Queries/OrderLookup';
import CancelOrder from '../../Models/Orders/Commands/CancelOrder';




@observer
export default class ViewOrdersView extends Views.ViewBase<ViewOrdersVM> {

    constructor(props: unknown) {
        super("View Orders", ViewOrdersVM, props);
    }

    private completeOrder(order: OrderLookup) {
        ModalUtils.showYesNo("Complete order", "Are you sure you want to complete this order?", 
                () => this.viewModel.completeOrder(order));
    }
    
    private async cancelOrder(order: OrderLookup) {
        const cancelInfo = new CancelOrder();
    
        if ((await ModalUtils.showOkCancel(
            "Cancel order",
            <Neo.FormGroup bind={cancelInfo.meta.reason} label="Please enter a reason:" />, 
            cancelInfo)) === Misc.ModalResult.Yes) {
    
            this.viewModel.cancelOrder(order, cancelInfo.reason);
        }
    }

    public showInvoice(){

    }
    
    public render() {
        return (
            <div>
			<Neo.Card title="Criteria">
                <Neo.Form model={this.viewModel.criteria} onSubmit={() => this.viewModel.findOrders()}>
                    {(crit, critMeta) => (
                        <Neo.GridLayout md={2} lg={4}>
                            <Neo.FormGroup bind={critMeta.orderStatus} select={{itemSource: Data.StaticDataSource.fromEnum(OrderStatus)}} />
                            <Neo.FormGroup bind={critMeta.startDate} />
                            <Neo.FormGroup bind={critMeta.endDate} />
                            <Neo.Button icon="search" className="form-btn" isSubmit>Search</Neo.Button>
                        </Neo.GridLayout>
                    )}
                </Neo.Form>

                </Neo.Card><Neo.Card title="View Orders">
        
            </Neo.Card>
            <Neo.Card title="Orders">
                <NeoGrid.Grid items={this.viewModel.foundOrders}>
                    {(order, orderMeta) => (
                        <NeoGrid.RowGroup  expandProperty={orderMeta.isExpanded}>
                            <NeoGrid.Row>
                                <NeoGrid.Column display={orderMeta.customerName} />
                                <NeoGrid.Column display={orderMeta.orderedOn} dateProps={{formatString: "dd MMM - HH:mm"}} />
                                <NeoGrid.Column display={orderMeta.orderTotal} numProps={{format: Misc.NumberFormat.CurrencyDecimals}} />
                                <NeoGrid.ButtonColumn>
                                    {
                                        order.canAction &&
                                        <>
                                            <Neo.Button variant="danger" icon="times" onClick={() => this.cancelOrder(order)}>Cancel</Neo.Button>
                                            <Neo.Button variant="success" icon="check" onClick={() => this.completeOrder(order)}>Complete</Neo.Button>
                                        </>
                                    }
                                </NeoGrid.ButtonColumn>
                            </NeoGrid.Row>
                            <NeoGrid.ChildRow >
                                <NeoGrid.Grid items={order.items}>
                                {(orderDetail, orderDetailMeta) => (
                                    <NeoGrid.Row>
                                        <NeoGrid.Column display={orderDetailMeta?.product} />
                                        <NeoGrid.Column display={orderDetailMeta?.vat} />
                                        <NeoGrid.Column display={orderDetailMeta?.value} />
                                    </NeoGrid.Row>
                                )} 
                                </NeoGrid.Grid>
                            </NeoGrid.ChildRow>
                            
                        </NeoGrid.RowGroup>
                    )}
                    
                </NeoGrid.Grid>
                {
                    this.viewModel.foundOrders.length > 0 &&
                     <Neo.Button variant="success" icon="list" onClick={() => this.showInvoice()}>Show Invoice</Neo.Button>
                }
                
            </Neo.Card>
            </div>
        );
    }
}