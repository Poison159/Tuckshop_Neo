import { Data, Model, Utils } from '@singularsystems/neo-core';
import { AxiosPromise } from 'axios';
import { injectable } from 'inversify';
import { AppService, Types } from '../../IdentityTypes';
import PerformUserActionCommand from '../../Models/UserManagement/PerformUserActionCommand';
import UserLookupCriteria from '../../Models/UserManagement/Queries/UserLookupCriteria';
import UserLookup from '../../Models/UserManagement/Queries/UserLookup';
import UserManagementActionLogLookupCriteria from '../../Models/UserManagement/Queries/UserManagementActionLogLookupCriteria';
import UserManagementActionLogLookup from '../../Models/UserManagement/Queries/UserManagementActionLogLookup';

export interface IUserManagementApiClient {

    findUsers(request: Model.PartialPlainObject<Data.PageRequest<UserLookupCriteria>>): AxiosPromise<Data.PageResult<Model.PlainObject<UserLookup>>>;

    performAction(command: Model.PartialPlainObject<PerformUserActionCommand>): AxiosPromise;

    logHistory(request: Model.PartialPlainNonTrackedObject<Data.PageRequest<UserManagementActionLogLookupCriteria>>): AxiosPromise<Data.PageResult<Model.PlainObject<UserManagementActionLogLookup>>>;

    // Client only properties / methods
}

@injectable()
export default class UserManagementApiClient extends Data.ApiClientBase implements IUserManagementApiClient {

    constructor (config = AppService.get(Types.App.Config)) {
        super(`${config.identityConfig.identityApiPath}/user-management`);
    }

    public findUsers(request: Model.PartialPlainObject<Data.PageRequest<UserLookupCriteria>>): AxiosPromise<Data.PageResult<Model.PlainObject<UserLookup>>> {
        return this.axios.post(`${this.apiPath}/find`, request);
    }

    public performAction(command: Model.PartialPlainObject<PerformUserActionCommand>): AxiosPromise {
        return this.axios.post(`${this.apiPath}/perform-action`, command);
    }

    public logHistory(request: Model.PartialPlainNonTrackedObject<Data.PageRequest<UserManagementActionLogLookupCriteria>>): AxiosPromise<Data.PageResult<Model.PlainObject<UserManagementActionLogLookup>>> {
        return this.axios.get(`${this.apiPath}/log-history?${Utils.getQueryString(request)}`);
    }

    // Client only properties / methods
}