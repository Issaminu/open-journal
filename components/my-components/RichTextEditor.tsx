"use client";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, Editor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Button } from "@/components/ui/button";

// const content =
//   '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const RichTextEditorContainer = ({
  content,
  editorRef,
  saveFunction,
}: {
  content: string;
  editorRef: any;
  saveFunction: () => void;
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
    content,
    onUpdate({ editor }) {
      editorRef.current = editor.getHTML();
    },
  });

  return (
    <RichTextEditor
      editor={editor}
      style={{
        borderWidth: "0rem",
        borderColor: "rgb(0 0 0/0.2)",
        borderRadius: "0.5rem",
      }}
    >
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={60}
        style={{
          backgroundColor: "rgb(0 0 0/0.2)",
          color: "white",
          borderWidth: "0.1rem",
          borderColor: "rgb(0 0 0/0.2)",
          borderRadius: "0.5rem",
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

        <Button
          className="h-7 shadow-2xl"
          variant={"outline"}
          onClick={saveFunction}
        >
          Save
        </Button>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{
          textAlign: "left",
          backgroundColor: "transparent",
          color: "white",
        }}
      />
    </RichTextEditor>
  );
};

export default RichTextEditorContainer;
