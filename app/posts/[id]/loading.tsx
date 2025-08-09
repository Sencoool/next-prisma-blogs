export default function Loading() {
  return (
    <div className="container mx-auto my-8 shadow-xl rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        {/* TOC Skeleton */}
        <div className="hidden md:block md:w-1/4 p-6 border-r border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-8 w-3/4 mb-4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/5"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 w-full p-6">
          <div className="skeleton h-12 w-full mb-4"></div>
          <div className="skeleton h-4 w-1/4 mb-2"></div>
          <div className="skeleton h-4 w-1/4 mb-6"></div>
          <hr className="my-6 border-gray-200" />
          <div className="prose lg:prose-xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-5/6"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-4/5"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-5/6"></div>
              <div className="skeleton h-6 w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
