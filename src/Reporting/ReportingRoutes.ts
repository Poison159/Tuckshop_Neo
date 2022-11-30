import { ReportingView, ReportView } from '@singularsystems/neo-reporting';
import { IAppMenuItem, IAppRoute } from '../App/Services/RouteService';

import * as Roles from './Models/Security/Roles';

const MenuRoutes: IAppMenuItem[] = 
    [
        { name: "Reporting", path: "/reporting", component: ReportingView, role: Roles.General.View }
    ];
    
const PureRoutes: IAppRoute[] = 
    [
        { name: "Report", path: "/report", component: ReportView, role: Roles.General.View } 
    ];

export { 
    MenuRoutes,
    PureRoutes
} 