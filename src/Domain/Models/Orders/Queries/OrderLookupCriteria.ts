import { Attributes, Misc, NeoModel, Validation, ValueObject } from '@singularsystems/neo-core';
import { OrderStatus } from '../OrderStatus';

@NeoModel
export default class OrderLookupCriteria extends ValueObject {

    public orderStatus: OrderStatus | null = null;

    @Attributes.Date(Misc.TimeZoneFormat.None)
    public startDate: Date | null = null;

    @Attributes.Date(Misc.TimeZoneFormat.None)
    public endDate: Date | null = null;

    // Client only properties / methods

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);
    }

    public toString(): string {
        return "Order Lookup Criteria";
    }
}