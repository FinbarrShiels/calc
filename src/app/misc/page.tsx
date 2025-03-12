export const metadata = {
  title: 'Miscellaneous Tools',
  description: 'A collection of miscellaneous tools and utilities',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Miscellaneous Tools</h1>
      <p className="mb-4">
        This page contains a collection of miscellaneous tools and utilities that don't fit into other categories.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Example tool cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Tool 1</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Description of tool 1</p>
          <a href="/misc/tool1" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Use Tool →
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Tool 2</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Description of tool 2</p>
          <a href="/misc/tool2" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Use Tool →
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Tool 3</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Description of tool 3</p>
          <a href="/misc/tool3" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Use Tool →
          </a>
        </div>
      </div>
    </div>
  );
} 