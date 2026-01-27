
function ArticleSectionSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Title skeleton */}
        <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
        {/* Description skeleton */}
        <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto mb-12 animate-pulse" />
        {/* Content blocks skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Card header skeleton */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              {/* Card content skeleton */}
              <div className="px-6 py-6 space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSectionSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Title skeleton */}
        <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
        {/* Description skeleton */}
        <div className="h-6 w-80 bg-gray-200 rounded-lg mx-auto mb-12 animate-pulse" />
        {/* FAQ card skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Card header skeleton */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          {/* Accordion items skeleton */}
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-5">
                <div className="h-6 w-full bg-gray-100 rounded animate-pulse mb-2" />
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeContentSkeleton() {
  return (
    <>
      <ArticleSectionSkeleton />
      <FAQSectionSkeleton />
    </>
  );
}
