// components/ShimmerLoading.js

export default function ShimmerLoading() {
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar Menu Skeleton */}
        <div className="lg:w-1/4 w-full">
          <div className="mb-4 h-6 w-3/4 animate-pulse bg-gray-300"></div>
          <div className="gap-2 flex flex-row lg:flex-col">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="mb-2  h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Menu Grid Skeleton */}
        <div className="grid grid-cols-2 w-full lg:w-3/4 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border p-4">
              <div className="mb-4 w-full aspect-[2/1] w-full rounded-md bg-gray-300"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
