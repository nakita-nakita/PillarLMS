import { Model } from "sequelize";
import path from "path";
import fs from 'fs-extra'
import util from 'util';
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../../models/subDomain/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  favicon?: string
  tab?: string
  isReady: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const sql = makeBackendSettingSiteSql(d);


    let favicon = args.favicon
    const regex = /\/backend\/api\/v1\/setting\/site\/preview\/file\/(\d{4})\/(\d{2})\/([^.\/]+)\.([a-zA-Z0-9]+)/;
    const match = favicon.match(regex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const filename = match[3];
      const fileExtension = match[4]

      const currentLocation = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "backendSettingSite", "favicon", `${filename}.${fileExtension}`);

      const newLocation = path.join(process.cwd(), 'uploads', 'system', "backendSettingSite", "favicon");

      fs.mkdirsSync(newLocation);
      // Copy the file to the new location
      try {
        const copyFile = util.promisify(fs.copyFile);

        await copyFile(currentLocation, path.join(newLocation, `${filename}.${fileExtension}`));
        // Optional: You might also want to delete the file from the old location after copying
        // fs.unsiteSync(currentLocation);

        favicon = `/backend/api/v1/setting/site/file/${filename}.${fileExtension}`

      } catch (error) {
        // console.error("Error copying file:", error);
        return {
          success: false,
          humanMessage: "Error with transferring file."
        }
      }
    }

    const response = await sql.upsertOne({
      id: args.id || undefined,
      isReady: args.isReady,
      favicon,
      tab: args.tab,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}