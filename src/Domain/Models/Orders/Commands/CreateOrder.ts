import { Attributes, List, ModelBase, NeoModel, Rules, Validation } from '@singularsystems/neo-core';

@NeoModel
export class CreateOrder extends ModelBase {

    @Rules.Required()
    public customerName: string = "";

    public orderDetails = new List(NewOrderDetail);

    // Client only properties / methods

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
        rules.failWhen(c => !c.orderDetails.find(od => od.quantity > 0), "You must order at least one item.");
    }

    public toString(): string {
        if (this.isNew || !this.customerName) {
            return "New create order";
        } else {
            return this.customerName;
        }
    }

   
}

@NeoModel
export class NewOrderDetail extends ModelBase {

    public productId: number = 0;

    @Attributes.Integer()
    public quantity: number = 0;

    // Client only properties / methods

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
    }

    public toString(): string {
        if (this.isNew) {
            return "New new order detail";
        } else {
            return "New Order Detail";
        }
    }

    @Attributes.NoTracking()
    public productName: string = "";

    @Attributes.Float()
    @Attributes.NoTracking()
    public price: number = 0;

    @Attributes.Float()
    public get value() {
        return this.quantity * this.price;
    }
}