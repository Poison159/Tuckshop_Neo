import React from 'react';
import { Routing } from '@singularsystems/neo-react';
import { withRouter, Switch, Route } from 'react-router';
import { AppService, Types } from '../Services/AppService';

class RouteView extends Routing.RouteView {

    private routeService = AppService.get(Types.App.Services.RouteService);

    constructor(props: any) {
        super(props);

        this.routes = this.routeService.routes;
        this.switchComponent = Switch;
        this.routeComponent = Route;

        this.getForbiddenComponent = (route) => <h2>Forbidden</h2>;
        this.getSigningInComponent = (route) => <div>Signing in...</div>;
    }
}

export default withRouter(RouteView);