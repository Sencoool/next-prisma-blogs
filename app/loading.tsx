export default function Loading() {
  return (
    <main className="flex flex-col items-center mt-5 transition-all duration-300">
      {/* heading */}
      <div className="text-2xl font-bold">Jira Blogs</div>
      <hr className="border-2 border-t my-4 w-2/6" />
      {/* skeleton for recent post heading */}
      <div className="mb-4 w-full max-w-5xl px-4">
        <div className="skeleton w-32 h-7"></div>
        <hr className="border-2 w-2/6 md:w-2/12 mt-2" />
      </div>

      {/* recentpost - skeleton structure */}
      <div className="w-full max-w-5xl px-4 mb-8">
        <div className="border rounded-lg p-6 shadow-md">
          <div className="flex flex-col gap-4">
            {/* name */}
            <div className="skeleton h-8 w-3/4"></div>
            {/* writer */}
            <div className="flex items-center gap-2">
              <div className="skeleton w-10 h-4"></div>
              <div className="skeleton w-32 h-4"></div>
            </div>
            {/* coverImage */}
            <div className="skeleton h-80 w-full rounded-lg"></div>
            {/* viewBtn */}
            <div className="flex mt-2">
              <div className="ml-auto skeleton h-10 w-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      {/* skeleton for other post heading */}
      <div className="mb-4 w-full max-w-5xl px-4">
        <div className="skeleton w-32 h-7"></div>
        <hr className="border-2 w-2/6 md:w-2/12 mt-2" />
      </div>
      {/* other posts - skeleton structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full px-4">
        {/* Loop for display posts */}
        {[...Array(3)].map((_, index) => (
          <div
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            key={index}
          >
            <div className="flex flex-col gap-2">
              {/* name */}
              <div className="skeleton h-6 w-5/6"></div>
              {/* writer */}
              <div className="flex items-center gap-2">
                <div className="skeleton w-8 h-3"></div>
                <div className="skeleton w-24 h-3"></div>
              </div>
              {/* coverImage */}
              <div className="skeleton h-40 w-full rounded-lg"></div>
              {/* viewBtn */}
              <div className="flex mt-2">
                <div className="ml-auto skeleton h-8 w-16 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
