import { Skeleton } from './ui/skeleton'

export function AnimationListLoader () {
  return (
    <div className='container py-6 grid gap-4 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <Skeleton className='rounded-lg border aspect-square' />

          <div className='mt-2'>
            <Skeleton className='h-7' />
          </div>
        </div>
      ))}
    </div>
  )
}
