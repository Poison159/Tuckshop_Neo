import { Attributes, List, Model, ModelBase, NeoModel, Rules, Validation } from '@singularsystems/neo-core';
import OrderDetail from './OrderDetail';

@NeoModel
export default class Order extends ModelBase {

    public orderId: number = 0;

    @Rules.Required()
    @Attributes.Date()
    public orderedOn: Date | null = null;

    public completed: Model.UserEvent = Model.UserEvent.None();

    public cancelled: Model.ReasonedUserEvent = Model.ReasonedUserEvent.None();

    public customerName: string = "";

    public orderDetails = new List(OrderDetail);

    // Client only properties / methods

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
    }

    public toString(): string {
        if (this.isNew || !this.customerName) {
            return "New order";
        } else {
            return this.customerName;
        }
    }
}