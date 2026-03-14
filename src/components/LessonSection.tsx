import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function LessonSection({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-drac-fg prose-p:text-drac-fg/80 prose-a:text-drac-pink prose-a:no-underline hover:prose-a:text-drac-pink prose-strong:text-drac-orange prose-code:rounded prose-code:border prose-code:border-drac-border prose-code:bg-drac-surface/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-drac-green prose-pre:border prose-pre:border-drac-border prose-pre:bg-drac-bg prose-li:text-drac-fg/80 prose-th:text-drac-purple prose-td:text-drac-fg/80 prose-table:border-drac-border prose-hr:border-drac-border">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
