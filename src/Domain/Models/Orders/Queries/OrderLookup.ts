import { Attributes, List, LookupBase, NeoModel } from '@singularsystems/neo-core';
import OrderDetail from '../OrderDetail';


@NeoModel
export default class OrderLookup extends LookupBase {

    public orderId: number = 0;

    public customerName: string = "";

    @Attributes.Date()
    public orderedOn: Date = new Date();

    @Attributes.Date()
    @Attributes.Observable()
    public completedOn: Date | null = null;

    @Attributes.Date()
    @Attributes.Observable()
    public cancelledOn: Date | null = null;

    public cancelledReason: string = "";

    public completedBy: string = "";

    public cancelledBy: object | null = null;

    @Attributes.Float()
    public orderTotalExcl: number = 0;

    @Attributes.Float()
    public orderTotal: number = 0;

    public items = new List(OrderDetail);
    
    public get canAction() {
        return !this.completedOn && !this.cancelledOn;
    }

    // Client only properties / methods

    @Attributes.Observable()
    public isExpanded = false;

   
}