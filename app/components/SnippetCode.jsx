import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SnippetCode = ({ code }) => {
  return (
    <div>
      <SyntaxHighlighter language="jsx" style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default SnippetCode;
