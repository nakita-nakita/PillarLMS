'use client';

import React, { useRef, useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ListItem } from '@mui/material';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { initSocket } from '@/utils/realtime/socket';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

// Register the quill-cursors module
Quill.register('modules/cursors', QuillCursors);


function RealTimeTextField({ onTextUpdate, ...props }) {
  const quillRef = useRef(null);
  const { idChip, applyTextFieldSelectionBuffer } = useContext(AdminLayoutContext)

  const [orderNumber, setOrderNumber] = useState(0)

  const quillModules = {
    cursors: true,
    toolbar: false,
    // keyboard: {
    //   bindings: {
    //     shift_enter: {
    //       key: 13,
    //       shiftKey: true,
    //       handler: (range, ctx) => {
    //         console.log(range, ctx); // if you want to see the output of the binding
    //         this.editor.insertText(range.index, '\n');
    //       }
    //     },
    //     enter: {
    //       key: 13,
    //       handler: () => { // submit form }
    //       }
    //     }
    //   }
    // }
  }

  const applyOrder = ({ order }) => {
    if (order > orderNumber) {
      setOrderNumber(order)
    }
  }

  useEffect(() => {
    if (!idChip.id) {
      return;
    }

    // Initialize Yjs document
    const ydoc = new Y.Doc();
    let binding;

    // Initialize socket connection
    const socket = initSocket();

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      binding = new QuillBinding(ydoc.getText('quill'), quill);

      //init loading
      // console.log('loading selection', props, props.data, props.data.selections ||
      //   "not here", props.data.textValue)

      if (props.data?.order) {
        applyOrder({
          order: props.data.order
        })
      }

      if (props.data?.textValue) {

        // Decode base64 string back to a buffer
        const decodedBuffer = Buffer.from(props.data.textValue, 'base64');

        // Convert buffer to Uint8Array
        const updateArray = new Uint8Array(decodedBuffer.buffer);

        // Apply this to the Y.Doc
        Y.applyUpdate(ydoc, updateArray);

        if (onTextUpdate) {
          onTextUpdate(quill.getText().replace(/\n/g, ""))
        }
      }

      // console.log('realtime props', props)
      if (props.data?.selections) {
        const cursors = quill.getModule('cursors');


        for (let i = 0; i < props.data.selections.length; i++) {
          const { userId, username, userColor, range, order } = props.data.selections[i];
          if (idChip.id !== userId) {

            if (order) {
              applyOrder({
                order,
              })
            }
            // Check if the cursor for this user already exists
            if (!cursors.cursors[userId]) {
              // Create a new cursor for the user
              cursors.createCursor(userId, username, userColor);
            }

            // Move the user's cursor to the new position
            cursors.moveCursor(userId, range)
          }
        }
      }





      //Buffer text field, then load text field


      //Buffer selection, then load selection














      // Create a binding between Quill and Yjs

      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const updatedYdoc = Y.encodeStateAsUpdate(ydoc)

          // Yjs and Quill are already synced by the binding.
          // Emit the Yjs update to the server.
          socket.emit('server-samedoc-yjs-update', {
            entity: props.entity,
            name: props.data.name,
            ydoc: updatedYdoc,
          });

          if (onTextUpdate) {
            onTextUpdate(quill.getText().replace(/\n/g, ""))
          }
        }
      });
      // Listen for Yjs updates from the server
      socket.on('samedoc-yjs-update', (data) => {
        try {
          if (props.entity === data.entity && props.data.name === data.name) {
            // console.log('samedoc-yjs-update', data)
            Y.applyUpdate(ydoc, new Uint8Array(data.ydoc));

            if (onTextUpdate) {
              onTextUpdate(quill.getText().replace(/\n/g, ""))
            }
          }
        } catch (error) {
          console.error('Error applying Y.js update:', error);
        }
      });


      if (props?.data) {

        applyTextFieldSelectionBuffer({
          entity: props.entity,
          name: props.data.name,
          order: orderNumber,
          cb: (update) => {
            const quill = quillRef.current.getEditor();
            const cursors = quill.getModule('cursors');


            // Check if the cursor for this user already exists
            if (!cursors.cursors[update.userId]) {
              // Create a new cursor for the user
              cursors.createCursor(update.userId, update.username, update.userColor);
            }

            // Move the user's cursor to the new position
            cursors.moveCursor(update.userId, update.range)

          }

        }).then((order) => {
          setOrderNumber(order)
          quill.on('selection-change', (range, oldRange, source) => {
            if (source === 'user' || source === "api") {
              socket.emit('server-samedoc-selection-change', {
                range,
                entity: props.entity,
                name: props.data.name,
              });
            }
          });
          // Listen for selection changes from other clients
          socket.on('samedoc-selection-change', (data) => {

            if (props.entity === data.entity && props.data.name === data.name) {
              const quill = quillRef.current.getEditor();
              const cursors = quill.getModule('cursors');


              // Check if the cursor for this user already exists
              if (!cursors.cursors[data.userId]) {
                // Create a new cursor for the user
                cursors.createCursor(data.userId, data.username, data.userColor);
              }

              // Move the user's cursor to the new position
              cursors.moveCursor(data.userId, data.range)
            }
          })
        });



      }

    }


    return () => {
      binding.destroy();  // Clean up the binding
      socket.off('samedoc-yjs-update');
      socket.off('samedoc-selection-change');
    };

  }, [idChip]);


  return (
    <ListItem>
      <div style={{ width: "100%" }}>
        <p>{props.label}</p>
        <ReactQuill ref={quillRef} theme="snow" modules={quillModules} style={{ width: "100%" }} />
      </div>
    </ListItem>
  );
}

export default RealTimeTextField;
