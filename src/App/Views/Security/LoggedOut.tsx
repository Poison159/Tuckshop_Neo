import React from "react";
import { Views } from '@singularsystems/neo-react';

export default class LoggedOutView extends Views.ViewBase {

    constructor(props: unknown) {
        super("Logged out", Views.EmptyViewModel, props);
    }

    public render() {
        return (
            <div>
                <h2>Logged out</h2>

                <p>You have been logged out of the application.</p>
            </div>
        )
    }
}