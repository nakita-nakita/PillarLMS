import glob from "glob"
import { d_allDomain } from "./schema/utils/types/dependencyInjection.types"

type input = {
    socket: any,
    d: d_allDomain
}

const socketInitScript = async ({ socket, d}: input) => {

  //////////////////////////////////////
  // Load sockets
  // ===================================
  let resolvers = [
    ...glob.sync("app/schema/subDomain/*/*/*.socket.ts"),
    ...glob.sync("app/schema/subDomain/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/subDomain/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/subDomain/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/subDomain/*/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/subDomain/*/*/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*/*.socket.ts"),
  ];
  
  for (const resolver of resolvers) {
    require("../" + resolver).default({socket, d});
  } 
}

export default socketInitScript