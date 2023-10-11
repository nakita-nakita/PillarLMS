'use client';

import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ListItem } from '@mui/material';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { initSocket } from '@/utils/realtime/socket';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';

// Register the quill-cursors module
Quill.register('modules/cursors', QuillCursors);


function RealTimeTextField({ label, entity = "void", id = "void" }) {
  const quillRef = useRef(null);
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

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  useEffect(() => {
    // Initialize Yjs document
    const ydoc = new Y.Doc();

    // Initialize socket connection
    const socket = initSocket();

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Create a binding between Quill and Yjs
      const binding = new QuillBinding(ydoc.getText('quill'), quill);

      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const doc = Y.encodeStateAsUpdate(ydoc)

          // Yjs and Quill are already synced by the binding.
          // Emit the Yjs update to the server.
          socket.emit('server-yjs-update', {
            entity,
            id,
            doc,
          });
        }
      });
      // Listen for Yjs updates from the server
      socket.on('yjs-update', ({ entity, id, doc }) => {
        try {
          Y.applyUpdate(ydoc, new Uint8Array(doc));
        } catch (error) {
          console.error('Error applying Y.js update:', error);
        }
      });



      quill.on('selection-change', (range, oldRange, source) => {
        if (source === 'user' || source === "api") {
          // Emit the selection change to the server
          const cursorData = {
            // userId: 'YOUR_LOCAL_USER_ID',  // Replace with a unique identifier for the local user
            // userName: 'YOUR_LOCAL_USER_NAME', // Replace with the local user's name or username
            // userColor: 'YOUR_PREFERRED_COLOR', // Replace with a color for the local user's cursor, e.g., 'red'
            range
          };
          socket.emit('server-selection-change', cursorData);
        }
      });
      // Listen for selection changes from other clients
      socket.on('remote-selection-change', (cursorData) => {
        console.info('remote-selection-change', cursorData)
        const quill = quillRef.current.getEditor();
        const cursors = quill.getModule('cursors');


        // Check if the cursor for this user already exists
        if (!cursors.cursors[cursorData.userId]) {
          // Create a new cursor for the user
          cursors.createCursor(cursorData.userId, cursorData.username, getRandomColor());
        }

        // Move the user's cursor to the new position
        cursors.moveCursor(cursorData.userId, cursorData.range)
      });






      return () => {
        binding.destroy();  // Clean up the binding
        socket.off('yjs-update');
        socket.off('remote-selection-change');
      };
    }
  }, []);


  return (
    <ListItem>
      <div style={{ width: "100%" }}>
        <p>{label}</p>
        <ReactQuill ref={quillRef} theme="snow" modules={quillModules} style={{ width: "100%" }} />
      </div>
    </ListItem>
  );
}

export default RealTimeTextField;
