import { d_allDomain } from "../../../utils/types/dependencyInjection.types";
import makeBackendAuthMain from "./main/foundationAuth.main";

export default function makeFoundationUserEntity(d: d_allDomain) {
  const authMain = makeBackendAuthMain(d)


  return {
    authMain,
  }
}