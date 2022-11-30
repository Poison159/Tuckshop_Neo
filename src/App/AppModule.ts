import { AppServices } from '@singularsystems/neo-core';
import Types from './AppTypes';
import Axios from 'axios';
import { AuthorisationTypes } from '@singularsystems/neo-authorisation';
import { ReportingTypes } from '@singularsystems/neo-reporting';
import { NotificationServiceTypes } from '@singularsystems/neo-notifications';
import { AppConfig } from './Models/AppConfig';
import { OidcAuthService } from './Services/AuthenticationService';
import { RouteService } from './Services/RouteService';
import { RouteSecurityService } from './Services/RouteSecurityService';
import AppLayout from './Services/AppLayout';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SketchPicker } from 'react-color';
import AsyncSelect from 'react-select/async'
import Select from 'react-select';

const AppModule = new AppServices.Module("App", container => {

    // Config
    container.bind(Types.App.Config).to(AppConfig).inSingletonScope();
    container.bindConfig(AuthorisationTypes.ConfigModel, (c: AppConfig) => c.authorisationConfig);
    container.bindConfig(NotificationServiceTypes.ConfigModel, (c: AppConfig) => c.notificationServerConfig);
    container.bindConfig(ReportingTypes.ConfigModel, (c: AppConfig) => c.reportingConfig);

    // Security
    container.bind(Types.Neo.Security.AuthenticationService).to(OidcAuthService).inSingletonScope();

    // Api clients
    container.bind(Types.Neo.Axios).toConstantValue(Axios);

    // Services
    container.bind(Types.App.Services.AppLayout).to(AppLayout).inSingletonScope();
    container.bind(Types.App.Services.RouteService).to(RouteService).inSingletonScope();
    container.bind(Types.Neo.Routing.RouteSecurityService).to(RouteSecurityService).inSingletonScope();

    // Components
    container.bind(Types.Neo.Components.Slider).toConstantValue(Slider);
    container.bind(Types.Neo.Components.Range).toConstantValue(Range);
    container.bind(Types.Neo.Components.SketchPicker).toConstantValue(SketchPicker);
    container.bind(Types.Neo.Components.AsyncSelect).toConstantValue(AsyncSelect);
    container.bind(Types.Neo.Components.ReactSelect).toConstantValue(Select);
});

const AppTestModule = new AppServices.Module("App", container => {

});

export { AppModule, AppTestModule };