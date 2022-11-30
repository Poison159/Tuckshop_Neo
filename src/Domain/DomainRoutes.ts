import { IAppMenuItem, IAppRoute } from '../App/Services/RouteService';
import OrdersView from './Views/Orders/OrdersView';
import ViewOrdersView from './Views/Orders/ViewOrdersView';
import ProductsView from './Views/ProductsView';

export const viewOrdersRoute = { name: "View orders", path: '/viewOrders', component: ViewOrdersView, icon: "search" };

const MenuRoutes: IAppMenuItem[] = 
    [
       { name: "Products", path: "/products",icon: "landmark", component: ProductsView as any /* TODO: Make this an actual route. */ },
       { name: "Create Order", path: "/order/create",icon: "store", component: OrdersView as any /* TODO: Make this an actual route. */ },
       viewOrdersRoute
    ]

const PureRoutes: IAppRoute[] = [];

export { 
    MenuRoutes, 
    PureRoutes
}