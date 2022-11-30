import { Attributes, Misc, ModelBase, NeoModel, Rules, Validation } from '@singularsystems/neo-core';
import Product from '../Product';

@NeoModel
export default class OrderDetail extends ModelBase {

    public orderDetailId: number = 0;

    @Rules.Required()
    @Attributes.Serialisation(Misc.SerialiseType.NotNull)
    public productId: number | null = null;

    @Attributes.ChildObject(Product)
    public product: Product | null = null;

    @Attributes.Integer()
    public quantity: number = 0;

    @Attributes.Float()
    public value: number = 0;

    @Attributes.Float()
    public vat: number = 0;

    // Client only properties / methods

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
    }

    protected canSerialise(shouldSerialise: boolean) {
        return this.quantity > 0;
    }

    public toString(): string {
        if (this.isNew) {
            return "New order detail";
        } else {
            return "Order Detail";
        }
    }
}