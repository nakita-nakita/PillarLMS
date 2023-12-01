import broadcast from "./scripts/SameDoc/broadcast.script";
import doesEntityExist from "./scripts/SameDoc/doesEntityExist.script";
import getByEntity from "./scripts/SameDoc/getByEntity.script";
import getByPropertyName from "./scripts/SameDoc/getByPropertyName.script";
import set from "./scripts/SameDoc/set.script";
import userDisconnectsFromEntity from "./scripts/SameDoc/userDisconnectsFromEntity.script";
import socketDisconnect_removeFromEntities from "./scripts/SameDoc/socketDisconnect_removeFromEntities.script";
import userConnectsToEntity from "./scripts/SameDoc/userConnectsToEntity.script";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import adaptersFromMenuAndAnswers from "./scripts/SameDoc/adaptersFromMenuAndAnswers.script";

export default function makeCollaborateSameDoc(d: dependencies) {
  return {
    doesEntityExist: doesEntityExist(d),
    getByEntity: getByEntity(d),
    getByPropertyName: getByPropertyName(d),
    set: set(d),
    broadcast: broadcast(d),

    // used for connecting on socket user to an entity
    userConnectsToEntity: userConnectsToEntity(d),
    // used for disconnecting one socket user from an entity
    userDisconnectsFromEntity: userDisconnectsFromEntity(d),

    // used for socket dropped and fire disconnect event
    socketDisconnect_removeFromEntities: socketDisconnect_removeFromEntities(d),

    // create variables for set from database jsons
    adaptersFromMenuAndAnswers: adaptersFromMenuAndAnswers(d),
  }
}