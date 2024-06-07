import { useQuery } from '@apollo/client'
import { AnimationCard } from './animationCard'
import { GET_ANIMATIONS } from '@/graphql/query'
import { useMemo, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination'
import { AnimationListLoader } from './animationListLoader'
import { ErrorAlert } from './errorAlert'

export interface AnimationNode {
  id: string
  jsonName: string
  name: string
  slug: string
  createdAt: string
}

export interface PageInfo {
  itemCount: number
  pageCount: number
  currentPage: number
}

interface AnimationList {
  animations: {
    items: AnimationNode[]
    pageInfo?: PageInfo
  }
}

export function AnimationList ({ search }: { search: string }) {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useQuery<AnimationList>(GET_ANIMATIONS, {
    variables: {
      page,
      nameRegex: '/.*' + search + '.*/ig'
    }
  })

  const pages = useMemo(() => {
    const pagination = data?.animations.pageInfo as PageInfo
    const hasNextPage = pagination?.currentPage < pagination?.pageCount
    const hasPreviousPage = pagination?.currentPage > 1

    return {
      hasNextPage,
      hasPreviousPage
    }
  }, [data?.animations.pageInfo])

  if (loading) return <AnimationListLoader />
  if (error)
    return <ErrorAlert message={error.message} title={'Something wrong!'} />

  if (!data?.animations.items.length) {
    return (
      <div className='container'>
        <h2 className='text-4xl leading-tight font-display font-bold text-center text-muted-foreground'>
          🔎 No animations found
        </h2>
      </div>
    )
  }

  return (
    <>
      <div className='container py-6 grid gap-4 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
        {data.animations.items.map(item => (
          <AnimationCard key={item?.id} node={item} />
        ))}
      </div>

      <div className='container'>
        <Pagination>
          <PaginationContent>
            {pages.hasPreviousPage && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              </PaginationItem>
            )}

            {pages.hasNextPage && (
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
