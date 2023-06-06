"use client";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, Editor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const RichTextEditorContainer = ({
  content,
  editorRef,
}: {
  content?: string;
  editorRef: any;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content ? content : "",
    onUpdate({ editor }) {
      editorRef.current = editor.getHTML();
    },
  });

  return (
    <RichTextEditor
      editor={editor}
      style={{
        borderWidth: "0.2rem",
        borderColor: "rgb(0 0 0/0.3)",
        borderRadius: "1rem",
      }}
    >
      <RichTextEditor.Toolbar
        style={{
          backgroundColor: "rgb(0 0 0/0.2)",
          color: "white",
          borderRadius: "0.8rem",
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderWidth: "0.2rem",
          borderColor: "rgb(0 0 0/0.2)",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
      >
        <RichTextEditor.ControlsGroup className="RichTextEditorControlsGroup">
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="RichTextEditorControlsGroup">
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="RichTextEditorControlsGroup">
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="RichTextEditorControlsGroup">
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{
          backgroundColor: "rgb(0 0 0/0.1)",
          textAlign: "left",
          lineHeight: "2",
          color: "white",
          borderRadius: "0rem",
          minHeight: "15rem",
        }}
      />
    </RichTextEditor>
  );
};

export default RichTextEditorContainer;
