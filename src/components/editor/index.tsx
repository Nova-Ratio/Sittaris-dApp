import { useState } from "react";
import { Editor } from "./tinyMce";

export default function TextEditor({
  textData,
  setData,
}: {
  textData: string;
  setData: (e: string) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_TINY_API_KEY;
  const sampleContent = `
<h2>Full-featured rich text editing experience</h2>
<p>No matter what you're building, TinyMCE has got you covered.</p>
`;

  return (
    <div className="z-50">
      <Editor
        apiKey={apiKey}
        disabled={false}
        init={{
          menubar: false,
          height: 350,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            /* "image", */
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            /* "fullscreen", */
            "insertdatetime",
            /* "media", */
            "table",
            "code",
            "help",
            /* "wordcount", */
          ],
          toolbar_mode: "sliding",
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignjustify | bullist numlist outdent indent | image link anchor | code fullscreen | " +
            +"removeformat | help" +
            "  | preview | searchreplace | visualblocks | charmap | insertdatetime | table | wordcount | media",
        }}
        value={textData}
        onEditorChange={(e) => setData(e)}
      />
    </div>
  );
}
