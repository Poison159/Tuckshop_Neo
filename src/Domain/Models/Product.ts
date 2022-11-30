import { Attributes, ModelBase, NeoModel, Rules, Validation } from '@singularsystems/neo-core';

@NeoModel
export default class Product extends ModelBase {

    public productId: number = 0;

    @Rules.Required()
    @Rules.StringLength(100)
    public productName: string = "";

    @Attributes.Float()
    public price: number = 0;

    // Client only properties / methods

    addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
    
        rules.failWhen(c => c.price <= 0, "Price must be above zero.");
    }

    public toString(): string {
        if (this.isNew || !this.productName) {
            return "New product";
        } else {
            return this.productName;
        }
    }
}