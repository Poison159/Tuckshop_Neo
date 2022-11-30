import { NeoModel } from "@singularsystems/neo-core";
import { ReportingServiceBase } from "@singularsystems/neo-reporting";
import { injectable } from "inversify";
import ExampleReport from "../Reports/Example/ExampleReport";

@injectable()
@NeoModel
export default class ReportingService extends ReportingServiceBase {

  protected getReports() {
    return [
        ExampleReport
    ];
  }
}