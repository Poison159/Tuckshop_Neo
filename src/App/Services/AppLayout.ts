import { observable, action } from 'mobx';
import { Utils } from '@singularsystems/neo-core';
import { injectable } from 'inversify';

export enum ScreenSize {
    ExtraSmall = 1,
    Small = 2,
    Medium = 3,
    Large = 4,
    ExtraLarge = 5,
    Huge = 6
}

export interface IAppLayout {
    thinSideBar: boolean;
    sideBarExpanded: boolean;
    currentScreenSize: ScreenSize;
    isScrollTop: boolean;
    menuToggle(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    menuHover(enter: boolean): void;
    setup(): void;
    performLayout(): void;
}

/**
 * Contains logic about the layout of the app. E.g. screensize, theme etc.
 * Use AppLayout.current for the singleton instance.
 */
@injectable()
export default class AppLayout implements IAppLayout {

    constructor() {
        this.onWindowResize = this.onWindowResize.bind(this);
        this.menuToggle = this.menuToggle.bind(this);
        this.menuHover = this.menuHover.bind(this);

        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("click", (e) => {

            // Hide the menu on click.
            const anchor = document.getElementById("menu-anchor");
            if (!this.isChildOf(e.target! as Element, anchor!)) {
                this.sideBarExpanded = false;
            }
            
        });
        
        document.addEventListener("scroll", () => {
            // This event is fired a lot, which is why we are using peek().
            if ((window.scrollY === 0) !== Utils.peek(this, "isScrollTop")) {
                this.isScrollTop = window.scrollY === 0;
            }
        });

        this.onWindowResize();
    }

    public get thinSideBar() {
        return this._thinSideBar || this.currentScreenSize <= ScreenSize.ExtraLarge;
    }
    public set thinSideBar(value: boolean) {
        this._thinSideBar = value;
        this.sideBarExpanded = false;
    }

    @observable
    public _thinSideBar = false;

    @observable
    public sideBarExpanded = false;

    @observable.ref
    public currentScreenSize = ScreenSize.Medium;

    @observable.ref
    public isScrollTop = true;

    
    @action
    private onWindowResize() {
        
        if (window.innerWidth <= 576) {
            this.currentScreenSize = ScreenSize.ExtraSmall;
        } else if (window.innerWidth <= 768) {
            this.currentScreenSize = ScreenSize.Small;
        } else if (window.innerWidth <= 992) {
            this.currentScreenSize = ScreenSize.Medium;
        } else if (window.innerWidth <= 1200) {
            this.currentScreenSize = ScreenSize.Large;
        } else if (window.innerWidth <= 1360) {
            this.currentScreenSize = ScreenSize.ExtraLarge;
        } else {
            this.currentScreenSize = ScreenSize.Huge;
        }

        this.performLayout();
    }

    public performLayout() {
        if (this.header) {
            this.leftPanel!.style.paddingTop = this.header.clientHeight + "px";
            this.rightPanel!.style.paddingTop = this.header.clientHeight + "px";
            const footerMargin = parseInt(window.getComputedStyle(this.footer!).marginTop);
            this.contentPanel!.style.minHeight = (window.innerHeight - this.header.clientHeight - this.footer!.clientHeight - footerMargin) + "px";
        }
    }

    private header?: HTMLDivElement;
    private footer?: HTMLDivElement;
    private leftPanel?: HTMLDivElement;
    private rightPanel?: HTMLDivElement;
    private contentPanel?: HTMLDivElement;

    public setup() {
        this.header = document.getElementById("header-panel") as HTMLDivElement;
        this.footer = document.getElementById("footer-panel") as HTMLDivElement;
        this.rightPanel = document.getElementById("right-panel") as HTMLDivElement;
        this.leftPanel = document.getElementById("left-panel") as HTMLDivElement;
        this.contentPanel = document.getElementById("content-panel") as HTMLDivElement;

        setTimeout(this.onWindowResize, 0);
    }

    public menuToggle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.currentScreenSize <= ScreenSize.ExtraLarge) {
            this.sideBarExpanded = !this.sideBarExpanded;
        } else {
            this._thinSideBar = !this._thinSideBar;
            this.tempMenuDisable = true;
            setTimeout(() => this.tempMenuDisable = false, 300);
        }
    }

    private tempMenuDisable = false;

    public menuHover(enter: boolean) {
        if (!this.tempMenuDisable) {
            if (this.thinSideBar) {
                if (enter) {
                    this.sideBarExpanded = true;
                } else {
                    this.sideBarExpanded = false;
                    this.tempMenuDisable = false
                }
            }
        }
    }

    private isChildOf(element : Element, parent : Element) {
        while (true) {
            if (element === parent) {
                return true;
            }
            if (element.parentElement) {
                element = element.parentElement;
            } else {
                return false;
            }
        }
    }
}