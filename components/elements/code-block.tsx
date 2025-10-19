// components/elements/code-block.tsx

"use client";

import { CheckIcon, CopyIcon, CodeIcon, TerminalIcon, FileIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: ReactNode;
  filename?: string;
};

export const CodeBlock = ({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  filename,
  ...props
}: CodeBlockProps) => {
  const getLanguageIcon = () => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'jsx':
        return <CodeIcon className="h-4 w-4 text-yellow-400" />;
      case 'typescript':
      case 'tsx':
        return <CodeIcon className="h-4 w-4 text-blue-400" />;
      case 'python':
        return <TerminalIcon className="h-4 w-4 text-green-400" />;
      case 'java':
        return <CodeIcon className="h-4 w-4 text-red-400" />;
      case 'cpp':
      case 'c++':
        return <CodeIcon className="h-4 w-4 text-blue-500" />;
      case 'go':
        return <CodeIcon className="h-4 w-4 text-cyan-400" />;
      case 'rust':
        return <CodeIcon className="h-4 w-4 text-orange-500" />;
      case 'sql':
        return <FileIcon className="h-4 w-4 text-slate-400" />;
      case 'html':
        return <CodeIcon className="h-4 w-4 text-orange-400" />;
      case 'css':
        return <CodeIcon className="h-4 w-4 text-blue-400" />;
      default:
        return <CodeIcon className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border",
          "bg-gradient-to-br from-slate-900 to-slate-800",
          "border-slate-700/50 shadow-xl",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center gap-2">
            {getLanguageIcon()}
            <span className="text-xs font-medium text-slate-300">{language}</span>
            {filename && (
              <span className="text-xs text-slate-500 font-mono">{filename}</span>
            )}
          </div>
          {children && (
            <div className="flex items-center gap-2">{children}</div>
          )}
        </div>
        <div className="relative">
          <SyntaxHighlighter
            className="overflow-hidden dark:hidden"
            codeTagProps={{
              className: "font-mono text-sm",
            }}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              overflowX: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
            language={language}
            lineNumberStyle={{
              color: "hsl(var(--muted-foreground))",
              paddingRight: "1rem",
              minWidth: "2.5rem",
            }}
            showLineNumbers={showLineNumbers}
            style={oneLight}
          >
            {code}
          </SyntaxHighlighter>
          <SyntaxHighlighter
            className="hidden overflow-hidden dark:block"
            codeTagProps={{
              className: "font-mono text-sm",
            }}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
              color: "#e2e8f0",
              overflowX: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
            language={language}
            lineNumberStyle={{
              color: "#64748b",
              paddingRight: "1rem",
              minWidth: "2.5rem",
            }}
            showLineNumbers={showLineNumbers}
            style={{
              ...oneDark,
              'pre[class*="language-"]': {
                ...oneDark['pre[class*="language-"]'],
                background: "transparent",
                margin: 0,
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn(
        "shrink-0 h-7 w-7 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200",
        className
      )}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};

// New component for code execution
export type CodeBlockExecuteButtonProps = ComponentProps<typeof Button> & {
  onExecute?: () => void;
  isExecuting?: boolean;
};

export const CodeBlockExecuteButton = ({
  onExecute,
  isExecuting = false,
  children,
  className,
  ...props
}: CodeBlockExecuteButtonProps) => {
  return (
    <Button
      className={cn(
        "shrink-0 h-7 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200",
        "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30",
        "border border-indigo-600/30 hover:border-indigo-600/50",
        className
      )}
      onClick={onExecute}
      disabled={isExecuting}
      size="sm"
      variant="ghost"
      {...props}
    >
      {isExecuting ? (
        <>
          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-1"></div>
          Running...
        </>
      ) : (
        <>
          <TerminalIcon size={12} className="mr-1" />
          {children ?? "Run"}
        </>
      )}
    </Button>
  );
};

// New component for code output
export type CodeBlockOutputProps = HTMLAttributes<HTMLDivElement> & {
  output: string;
  error?: boolean;
};

export const CodeBlockOutput = ({
  output,
  error = false,
  className,
  ...props
}: CodeBlockOutputProps) => {
  return (
    <div
      className={cn(
        "border-t border-slate-700/50 bg-slate-900/80 p-3 font-mono text-xs overflow-x-auto",
        error && "bg-red-950/20 border-red-900/50",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 mb-2">
        <TerminalIcon size={12} className={cn(error ? "text-red-400" : "text-slate-400")} />
        <span className={cn("font-medium", error ? "text-red-400" : "text-slate-400")}>
          {error ? "Error" : "Output"}
        </span>
      </div>
      <pre className={cn(error ? "text-red-300" : "text-slate-300")}>{output}</pre>
    </div>
  );
};
