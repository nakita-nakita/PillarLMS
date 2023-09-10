import checkUuid from "./checkUuid"
import checkEmail from "./checkEmail"
import checkLengh from "./checkLengh"

const stringHelpers = {
  ...checkUuid,
  ...checkEmail,
  ...checkLengh,
}

export default stringHelpers