import * as React from "react";
import { AppService, Types } from '../../Services/AppService';

export default class OidcSilentRedirect extends React.Component {

    constructor(props: any) {
        super(props);
        
        AppService.get(Types.Neo.Security.AuthenticationService).endSignInSilent();
    }

    public render() {
        return <div>Signing in...</div>
    }
}