import { initSocket } from '@/utils/realtime/socket';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState, useCallback } from 'react'

export const SameDocEntityContext = createContext();

function SameDocEntity({ children }) {

  const [lastEntity, setLastEntity] = useState()

  const PageEntityGroup = ["backendPage", "backendPagePanel"]

  const shouldWeUnsubOldEntityFunc = ({entity}) => {
    let result = true

    //if both are the same
    if(entity === lastEntity) {
      result = false
    }

    //if the last entity and current entity are both in the list, we don't update.
    if (PageEntityGroup.includes(entity) && PageEntityGroup.includes(lastEntity)) {
      result = false
    }


    setLastEntity(entity)

    return result;   
  }

  // public into Admin layout.
  const updateEntity = ({ entity }) => {
    const socket = initSocket();

    if (!entity) {
      socket.emit('server-samedoc-unsub-entity', { entity })
      setLastEntity(null)
      return;
    }

    if(!lastEntity) {
      setLastEntity(entity)
      return;
    }

    const shouldWeUnsubOldEntity = shouldWeUnsubOldEntityFunc({entity})

    if (shouldWeUpdateEntity) {
      socket.emit('server-samedoc-unsub-entity', { entity })
    }

  }



  return (
    <SameDocEntityContext.Provider value={{
      updateEntity,
    }}>
      {children}
    </SameDocEntityContext.Provider>
  )
}

export default SameDocEntity;
