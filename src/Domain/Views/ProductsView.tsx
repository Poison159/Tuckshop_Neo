import React from 'react';
import { Neo, NeoGrid, Views } from '@singularsystems/neo-react';
import ProductsVM from './ProductsVM';
import { observer } from 'mobx-react';
import { Misc } from '@singularsystems/neo-core';

@observer
export default class ProductsView extends Views.ViewBase<ProductsVM> {

    constructor(props: unknown) {
        super("Products", ProductsVM, props);
    }

    public render() {
        return (
            <div>
			    <Neo.Card title="Products">
                    <Neo.Form model={this.viewModel.products} onSubmit={() => this.viewModel.saveProducts()} showSummaryModal>
                        <div className="mb-3">
                            <Neo.Button isSubmit variant="success" icon="check">Save</Neo.Button>
                        </div>
                        <NeoGrid.Grid showAddButton items={this.viewModel.products}>
                            {(product, productMeta) => (
                                <NeoGrid.Row>
                                    <NeoGrid.Column display={productMeta.productId} />
                                    <NeoGrid.Column bind={productMeta.productName} />
                                    <NeoGrid.Column bind={productMeta.price} numProps={{format: Misc.NumberFormat.CurrencyDecimals}}  />
                                    <NeoGrid.ButtonColumn showDelete />
                                </NeoGrid.Row>
                            )}
                        </NeoGrid.Grid>
                    </Neo.Form>
                </Neo.Card>
            </div>
        );
    }
}