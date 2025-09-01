export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents Skeleton */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="skeleton h-8 w-3/4"></div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-9">
            <article className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                {/* Title */}
                <div className="skeleton h-12 w-3/4 mb-6"></div>

                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="skeleton h-4 w-16"></div>
                  <span></span>
                  <div className="skeleton h-4 w-32"></div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>

                {/* Cover image */}
                <div className="skeleton h-[300px] w-full rounded-lg mb-6"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="space-y-4">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-5/6"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-4/5"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
