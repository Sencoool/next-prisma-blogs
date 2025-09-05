export default function Loading() {
  return (
    <main className="min-h-screen bg-base-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* BlogHeader */}
        <div className="flex flex-col items-center mb-10">
          <div className="skeleton h-10 w-48 mb-2" />
          <div className="skeleton h-5 w-72 mb-3" />
          <hr className="border-2 border-green-500 w-16 mt-1" />
        </div>

        {/* Recent Post (highlight) */}
        <section className="mb-12">
          <div className="skeleton h-10 w-48 mb-3"></div>

          <div className="card lg:card-side bg-base-200 shadow-xl overflow-hidden">
            <figure className="lg:w-2/5 w-full h-64 lg:h-auto">
              <div className="skeleton w-full h-full" />
            </figure>
            <div className="card-body lg:w-3/5">
              <div className="skeleton h-24 w-4/5 mb-2" />
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="space-y-2 mb-4">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="skeleton h-4 w-2/3" />
              </div>
              <div className="card-actions justify-end">
                <div className="skeleton h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </section>

        {/* All Posts header + search */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="skeleton h-6 w-28" />
            <hr className="border-2 border-green-500 w-12" />
          </div>

          {/* Grid of post cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card bg-base-200">
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
                    <div className="skeleton h-8 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
