import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import BreadCrumb from './BreadCrumb';
import UserStatus from './UserStatus';
import { observer } from 'mobx-react';
import { AppService, Types } from '../Services/AppService';

@observer
export default class HeaderPanel extends React.Component {

    private appLayout = AppService.get(Types.App.Services.AppLayout);

    public render() {

        const layout = this.appLayout;
        const globalTask = Views.ViewBase.currentView ? Views.ViewBase.currentView.taskRunner : undefined;

        let headerClassName = "app-header-panel";

        if (!layout.isScrollTop) {
            headerClassName += " scrolled";
        }

        return (
            <div className={headerClassName} id="header-panel">

                {globalTask && globalTask.isBusy &&
                    <Neo.ProgressBar className="page-progress" progressState={globalTask.progressState} variant={globalTask.options.variant} type="animated" />}

                <div className="app-header">

                    <div id="menu-anchor" className="app-hamburger-container" onClick={layout.menuToggle}>
                        <div className="app-hamburger">
                            <i className="fa fa-bars" />
                        </div>
                    </div>
                    <div className="app-breadcrumb">
                        <BreadCrumb rootItem={{ label: "Tuckshop", link: "/" }} /> {" "}
                    </div>

                    <UserStatus />
                </div>
            </div>
        )
    }
}