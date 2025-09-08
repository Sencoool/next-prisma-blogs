export default function Loading() {
  return (
    <main
      className="min-h-screen bg-base-100 py-10 px-2"
      role="status"
      aria-busy="true"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header: title + search + divider */}
        <div className="flex items-center justify-between mb-6">
          <div className="skeleton h-7 w-36" />
          <div className="skeleton h-10 w-64" />
          <div className="skeleton h-2 w-12 rounded-full" />
        </div>

        {/* Grid of post cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 shadow-md">
              <figure className="w-full h-48 overflow-hidden">
                <div className="skeleton h-full w-full" />
              </figure>
              <div className="card-body">
                <div className="skeleton h-6 w-4/5 mb-2" />
                <div className="skeleton h-4 w-28 mb-2" />
                <div className="space-y-2 mb-4">
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                </div>
                <div className="card-actions justify-end">
                  <div className="skeleton h-8 w-20 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-8">
          <div className="join">
            <div className="skeleton join-item h-10 w-16 rounded-btn" />
            <div className="skeleton join-item h-10 w-24 rounded-btn mx-1" />
            <div className="skeleton join-item h-10 w-16 rounded-btn" />
          </div>
        </div>
      </div>
    </main>
  );
}
