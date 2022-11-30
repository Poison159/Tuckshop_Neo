// tslint:disable: max-classes-per-file
import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Routing, Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../Services/AppService';

interface IBreadCrumbProps {
    rootItem: Routing.BreadCrumbItem;
}

class BreadCrumbUIItem {
    
    public label: string;

    constructor (public breadCrumb: Routing.BreadCrumbItem, public isLast?: boolean) {
        this.label = breadCrumb.label instanceof Function ? breadCrumb.label() : breadCrumb.label;
    }
}

@observer
export default class BreadCrumb extends React.Component<IBreadCrumbProps> {
   
    componentDidUpdate() {
        AppService.get(Types.App.Services.AppLayout).performLayout();
    }

    public render () {

        let items : BreadCrumbUIItem[] = [];
        if (Views.ViewBase.currentView) {

            items = Views.ViewBase.currentView.getBreadCrumbList().map(b => new BreadCrumbUIItem(b));

            if (items.length) {
                items[items.length - 1].isLast = true;
            }
        }

        return (
            <div className="bread-crumb">

                <BreadCrumbItem item={new BreadCrumbUIItem(this.props.rootItem, items.length === 0)} />
                
                {items.filter(b => b.label).map((item, index) => (
                    <div key={index} className="bread-crumb-level">
                        <span className="bread-crumb-seperator">/</span>
                        <BreadCrumbItem item={item} />
                    </div>
                ))}

            </div>
        )
    }
}

class BreadCrumbItem extends React.Component<{ item: BreadCrumbUIItem }>{
    public render() {
        const item = this.props.item;
        const breadCrumb = this.props.item.breadCrumb;

        return (
            !item.isLast && breadCrumb.link ? <Link to={breadCrumb.link}>{item.label}</Link> :
            !item.isLast && breadCrumb.onClick ? <a href="/" onClick={breadCrumb.onClick}>{item.label}</a> :
            <span>{item.label}</span>
        )
    }
}