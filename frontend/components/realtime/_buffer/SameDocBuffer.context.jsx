import { initSocket } from '@/utils/realtime/socket';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState, useCallback } from 'react'

export const SameDocBufferContext = createContext();

function SameDocBuffer({ children }) {
  const route = useRouter()

  //route
  const [lastRouteAsPath, setLastRouteAsPath] = useState()

  // buffers
  const [realTimeTextFieldSelectionBuffer, setRealTimeTextFieldSelectionBuffer] = useState([])
  // const [realTimeTextFieldOrderNumber, setRealTimeTextFieldOrderNumber] = useState(0)

  // clear buffer for each page change.
  useEffect(() => {
    if (route.asPath !== lastRouteAsPath) {
      setRealTimeTextFieldSelectionBuffer([])
    }
    setLastRouteAsPath(route.asPath)

  }, [route.asPath])

  const handleSelectionUpdate = useCallback((data) => {
    setRealTimeTextFieldSelectionBuffer(prevBuffer => [...prevBuffer, data]);
    // console.log('buffer update: selection: ', {data, realTimeTextFieldSelectionBuffer})

  }, [setRealTimeTextFieldSelectionBuffer, realTimeTextFieldSelectionBuffer]);

  //get all buffers for the page duriation.
  useEffect(() => {
    const socket = initSocket();

    socket.on('samedoc-buffer-selection-change', handleSelectionUpdate);

    return () => {
      socket.off('samedoc-buffer-selection-change');
    }

  }, []);
  //   useEffect(() => {
  //     console.log('Updated buffer: ', realTimeTextFieldYdocBuffer, orderNumber);
  // }, [realTimeTextFieldYdocBuffer]);

  const applyTextFieldSelectionBuffer = async ({ entity, name, order, cb }) => {
    let highestOrderNumber = order;
    for (let i = 0; i < realTimeTextFieldSelectionBuffer.length; i++) {
      const selectionBuffer = realTimeTextFieldSelectionBuffer[i];
      if (selectionBuffer.entity === entity && selectionBuffer.name === name && selectionBuffer.order > order) {
        highestOrderNumber = selectionBuffer.order > highestOrderNumber ? selectionBuffer.order : highestOrderNumber;

        if (cb) {
          cb(selectionBuffer)
        }
      }
    }

    return highestOrderNumber;
  }


  return (
    <SameDocBufferContext.Provider value={{
      applyTextFieldSelectionBuffer,
    }}>
      {children}
    </SameDocBufferContext.Provider>
  )
}

export default SameDocBuffer;
