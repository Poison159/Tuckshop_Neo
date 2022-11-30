import { Routing as NeoRouting } from '@singularsystems/neo-core';
import { Routing } from '@singularsystems/neo-react';
import { injectable } from 'inversify';
import { AppService, Types } from './AppService';
import Home from '../Views/Home';
import NotFound from '../Components/404NotFound';
import LoggedOut from '../Views/Security/LoggedOut';
import OidcLoginRedirect from '../Views/Security/OidcLoginRedirect';
import OidcSilentLoginRedirect from '../Views/Security/SilentSignInRedirect';
import { SecurityRoute } from '@singularsystems/neo-authorisation';
import { TemplateLayoutsView, TemplatesView, NotificationSettingsView, NotificationsView } from '@singularsystems/neo-notifications';

import * as DomainRoutes from '../../Domain/DomainRoutes';
import * as IdentityRoutes from '../../Identity/IdentityRoutes';
import * as ReportingRoutes from '../../Reporting/ReportingRoutes';

interface ICommonAppRouteProps {
    /** TODO: Add any custom route props here, like userType. */
}

export interface IAppRoute extends NeoRouting.IRoute, ICommonAppRouteProps {

}

export interface IAppMenuItem extends NeoRouting.IMenuRoute, ICommonAppRouteProps {

}

@injectable()
export class RouteService {

    private routeProvider: Routing.RouteProvider;

    constructor(private config = AppService.get(Types.App.Config)) {
        
        this.routeProvider = new Routing.RouteProvider(
            this.getMenuRoutes(),
            this.getPureRoutes(),
            NotFound,
        )
    }

    /**
     * Gets the routes provider
     */
    public get routes(): Routing.RouteProvider {
        return this.routeProvider;
    }

    private getMenuRoutes(): IAppMenuItem[] {
        return [
            {
                name: "Home", path: '/', component: Home, icon: "home", exact: true, allowAnonymous: true
            },
			...DomainRoutes.MenuRoutes,
            ...ReportingRoutes.MenuRoutes,
            { name: "Notifications", children: [
                { name: "Template layouts", path: "/templateLayouts", component: TemplateLayoutsView },
                { name: "Templates", path: "/templates", component: TemplatesView },
                { name: "Notification settings", path: "/notification-settings", component: NotificationSettingsView },
                { name: "View notifications", path: "/notifications", component: NotificationsView },
            ]},
            this.getAdministrationRoute(),
        ]
    }

    private getAdministrationRoute() {
        var adminRoute = { name: "Administration", children: [
                SecurityRoute,
            ...IdentityRoutes.IdentityMenuRoutes,
        ]};

        if (this.config.isDevelopment) {
            adminRoute.children.push(IdentityRoutes.SecurityConfigRoute);
        }
        return adminRoute;
    }


    private getPureRoutes(): IAppRoute[] {
        const pureRoutes = [
            {
                path: "/OidcLoginRedirect", component: OidcLoginRedirect, allowAnonymous: true
            },
            {
                path: "/OidcSilentLoginRedirect", component: OidcSilentLoginRedirect, allowAnonymous: true
            },
            {
                path: "/loggedout", component: LoggedOut, allowAnonymous: true
            },
			...DomainRoutes.PureRoutes,
            ...ReportingRoutes.PureRoutes,
        ];

        if (!this.config.isDevelopment) {
            pureRoutes.push(IdentityRoutes.SecurityConfigRoute);
        }

        return pureRoutes;
    }
}