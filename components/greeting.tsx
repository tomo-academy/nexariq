import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-8 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-24 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3 }}
      >
        {/* DeepSeek-style logo */}
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">TOMO CHAT</h1>
      </motion.div>
      
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        Hello! I'm TOMO CHAT, your advanced AI assistant.
      </motion.div>
      
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-base text-gray-600 dark:text-gray-400 leading-relaxed"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
      >
        I'm powered by cutting-edge AI technology and can help you with complex reasoning, creative writing, 
        code generation, analysis, and much more. Experience advanced AI conversations with full transparency 
        in my thinking process.
      </motion.div>
      
      {/* Advanced feature highlights */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.7 }}
      >
        <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-300">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 6V4M12 6L8 2M12 6L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18V20M12 18L8 22M12 18L16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H4M2 12L6 8M2 12L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12H20M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Advanced Reasoning</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Experience transparent AI thinking with step-by-step reasoning processes visible in our "Crafting" interface.
            </div>
          </div>
        </div>
        
        <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Smart Documents</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Create, edit, and collaborate on documents, code, and spreadsheets with intelligent AI assistance.
            </div>
          </div>
        </div>
        
        <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-300">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M7 8H17M7 12H17M7 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Deep Analysis</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Get comprehensive insights, code reviews, data analysis, and research assistance powered by advanced AI.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick action suggestions */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready to start? Try these:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              "Explain quantum computing"
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              "Write a Python function"
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              "Analyze this data"
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
