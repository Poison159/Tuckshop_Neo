import * as React from "react";
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";
import { AppService, Types } from '../../Services/AppService';

class OidcLoginRedirect extends React.Component<RouteComponentProps> {

    public async componentDidMount() {

        const result = await AppService.get(Types.Neo.Security.AuthenticationService).tryCompleteSignIn();
        if (result.success) {
            
            if (result.redirectPath) {
                this.props.history.push(result.redirectPath);
            } else {
                this.props.history.push("/");
            }
        }
    }

    public render() {
        return <div>Signing in...</div>
    }
}

export default withRouter(OidcLoginRedirect);