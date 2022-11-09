import React from 'react';

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
  const { quillRef } = useQuill({theme: "snow", modules: {toolbar: toolbarOptions}, formats: [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ], placeholder: ""});

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={quillRef} />
    </div>
  );
};