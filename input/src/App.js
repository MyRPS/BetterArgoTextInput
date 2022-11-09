import React, { useEffect } from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

var toolbarOptions = [
  [{ font: [] }],
  [{ size: ['small', false, 'large', 'huge'] }],

  [],

  ["bold", "italic", "underline", "strike"], 

  [],

  [{ color: [] }, { background: [] }],

  [],

  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [],

  [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],

  [],

  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],

  [],

  [{ align: [] }, { direction: "rtl" }], // text direction

  [],

  ['link', 'image', 'video', 'formula'],

  [],[],[],

  ["clean"], // remove formatting button
];

export default function App() {
  const { quill, quillRef } = useQuill({theme: "snow", modules: {toolbar: toolbarOptions}, formats: [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ], placeholder: ""});

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        const html = (quill.root.innerHTML); // Get innerHTML using quill
        window.postMessage({target: "ArgoPlus-Updated", html: html}, "*"); // Send html to main process
      });
    }
  }, [quill]);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      //ignore messages from current script
      console.log(event.data)
      if (!event.data || event.data.target !== "ArgoPlus-Post") {
        return;
      }
      if (event.source === window) {
        quill.root.innerHTML = "<p>same org</p>" + event.data.html; // Set innerHTML using quill
        return;
      }
      quill.root.innerHTML = event.data.html; 
    });
  }, [])

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={quillRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};