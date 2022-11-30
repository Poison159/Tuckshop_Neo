/* tslint:disable:max-classes-per-file */
import React from 'react';
import { Routing, Utils } from '@singularsystems/neo-core';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Scrollbar from 'react-custom-scrollbars';
import { AppService, Types } from '../Services/AppService';
import { IAppLayout, ScreenSize } from '../Services/AppLayout';
import sidebarBackground from '../assets/img/Placeholder-logo.jpg';

interface ISidebarProps {
    /**
     * If set to true, will make sub-menu items the same size as parent items.
     */
    fixedItemSize?: boolean;
}

@observer
class Sidebar extends React.Component<ISidebarProps> {

    private routeService = AppService.get(Types.App.Services.RouteService);
    private appLayout = AppService.get(Types.App.Services.AppLayout);

    private menuContainer: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);

        this.menuContainer = React.createRef<HTMLDivElement>();
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    private mouseEnter() {
        this.appLayout.menuHover(true);
    }
    private mouseLeave() {
        this.appLayout.menuHover(false);
    }

    public render() {
        const layout = this.appLayout;

        const menuItemProvider = AppService.get(Types.Neo.Routing.MenuItemProvider);
        const menuItems = menuItemProvider.processRoutes(this.routeService.routes.menuRoutes, { collapseSingle: true, hideWhenEmpty: true });

        return (
            <div>
                <div className="menu-overlay"></div>
                <div ref={this.menuContainer}
                    id="left-panel"
                    className="app-left-panel"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}>

                    <div className={"sidebar" + (this.props.fixedItemSize ? " sidebar-fixed-item-size" : "")}>
                        <div className="sidebar-header">
                            <img src={sidebarBackground} alt="" />
                        </div>

                        <div className="sidebar-content">
                            {/* Full screen menu */}
                            {layout.currentScreenSize > ScreenSize.Small &&
                                <Scrollbar height="100%" hideTracksWhenNotNeeded>
                                    <Menu items={menuItems} level={1} appLayout={this.appLayout} />
                                </Scrollbar>}

                            {/* Small screen menu */}
                            {layout.currentScreenSize <= ScreenSize.Small &&
                                <Menu items={menuItems} level={1} appLayout={this.appLayout} />}

                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

interface IMenuProps {
    appLayout: IAppLayout;
    items: Routing.IMenuRoute[];
    level: number;
}

@observer
class Menu extends React.Component<IMenuProps> {

    public render() {

        return (
            <ul className={"menu-level-" + this.props.level}>
                {this.props.items.map(item => <MenuItem key={item.path || item.name} item={item} level={this.props.level} appLayout={this.props.appLayout} />)}
            </ul>
        )
    }
}

interface IMenuItemProps {
    appLayout: IAppLayout;
    item: Routing.IMenuRoute;
    level: number;
}

@observer
class MenuItem extends React.Component<IMenuItemProps> {

    @observable.ref
    public isExpanded = false;

    private settingsKey: string;

    constructor(props: IMenuItemProps) {
        super(props);

        this.settingsKey = `menu-expand:${props.level}:${props.item.name}`;

        if (props.item.children) {
            const settingValue = localStorage.getItem(this.settingsKey);

            if (settingValue === "1" || props.item.expanded) {
                this.isExpanded = true;
            }
        }

        this.onExpanderClick = this.onExpanderClick.bind(this);
    }

    private onExpanderClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (this.props.item.children) {
            e.stopPropagation();
            e.preventDefault();

            this.isExpanded = !this.isExpanded;

            localStorage.setItem(this.settingsKey, this.isExpanded ? "1": "0");
        }
    }

    public render() {
        const item = this.props.item;
        const hasChildren = !!item.children;

        let fakeIconText = "";
        if (!item.icon) {
            let matches = item.name.match(/\b(\w)/g);
            let acronym = matches?.join('');
            if (acronym) {
                fakeIconText = acronym.substr(0, 2).toUpperCase();
            }
        }

        let icon = item.icon ? <i className={"sidebar-icon fa-fw " + Utils.getFontAwesomeClass(item.icon)} /> : <span className="sidebar-icon fake-icon">{fakeIconText}</span>;
        let text = <span className="menu-item-text">{item.name}</span>;
        let itemContent = <>
            <div className="sidebar-icon-container" onClick={this.onExpanderClick}>
                {icon}
                {hasChildren && <div className="sidebar-mini-expander">
                    <i className={"fa fa-" + (this.isExpanded ? "caret-down" : "caret-right")} />
                </div>}
            </div> {text}
        </> 

        return (
            <li>
                <div className={"menu-item" + (hasChildren ? " has-children" : "") + (this.isExpanded ? " is-expanded" : "")}>

                    {item.path ?
                        <NavLink exact={item.exact || this.isExpanded} to={item.path}>
                            {itemContent}
                        </NavLink> :
                        <span className="sidebar-icon-container static-item" onClick={this.onExpanderClick}>
                            {itemContent}
                        </span>
                    }

                    {hasChildren &&
                        <div className={"menu-expander " + (this.isExpanded ? "expanded" : "collapsed")} onClick={this.onExpanderClick}>
                            <i className={"fa fa-" + (this.isExpanded ? "caret-down" : "caret-right")} />
                        </div>
                    }
                </div>

                {this.isExpanded && item.children && <Menu items={item.children} level={this.props.level + 1} appLayout={this.props.appLayout} />}
            </li>)
    }
}

export default Sidebar;