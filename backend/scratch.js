require("dotenv").config();
let db = require("./app/models");
const makePermissionLogic = require("./app/schema/user/permission/permission.logic")
const permissionLogic = makePermissionLogic(db); 


const test = async() => {
    const permission = await permissionLogic.addMany({
        permissionNamesArray: [
            {
                name: "permission1"
            },
            {
                name: "permission2"
            }            
        ]
    })
    console.log(permission)
}

test();