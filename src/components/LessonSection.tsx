import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function LessonSection({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-emerald-400 prose-strong:text-zinc-200 prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-emerald-300 prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-li:text-zinc-300 prose-th:text-zinc-200 prose-td:text-zinc-300 prose-table:border-zinc-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
