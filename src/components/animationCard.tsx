import { Player } from '@lottiefiles/react-lottie-player';
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIndexedDBStore } from 'use-indexeddb'
import { AnimationNode } from './animationList'
import { useIntersectionObserver } from 'usehooks-ts'
import { useMutation } from '@apollo/client'
import { cn } from '@/lib/utils'
import { DELETE_MUTATION } from '@/graphql/mutation'
import { GET_ANIMATIONS } from '@/graphql/query'

type CachedAnimation = {
  lottieId: string
  data?: object | null
}

export function AnimationCard ({ node }: { node: AnimationNode }) {
  const { add, getOneByKey } = useIndexedDBStore<CachedAnimation>('animations')
  const [data, setData] = useState<object | null>(null)
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.75
  })

  const [deleteMutation, { loading }] = useMutation(DELETE_MUTATION, {
    variables: {
      id: node.id
    },
    refetchQueries: [GET_ANIMATIONS]
  })

  useEffect(() => {
    async function prepareAnimations () {
      const cached = await getOneByKey('lottieId', node.id)

      if (!cached) {
        try {
          const serverPublic = import.meta.env.VITE_SERVER_PUBLIC_URL as string
          const response = await fetch(`${serverPublic}/${node.jsonName}`)
          const animationData = await response.json()

          await add({
            lottieId: node.id,
            data: animationData
          })

          return setData(animationData)
        } catch (error) {
          // Handle error
        }
      }

      cached?.data && setData(cached.data)
    }

    prepareAnimations()
  }, [node, add, getOneByKey])

  return (
    <div
      className={cn(
        'relative group',
        loading && 'opacity-50 pointer-events-none'
      )}
    >
      <button
        onClick={() => deleteMutation()}
        className='absolute top-1 right-1 flex items-center justify-center z-10 shadow-lg opacity-0 bg-white rounded-full p-2 group-hover:opacity-100'
      >
        <Trash size={16} className='text-destructive' />
      </button>

      <div ref={ref} className='bg-white rounded-lg border aspect-square'>
        {isIntersecting && data && (
          <Player loop autoplay src={data} className='aspect-square' />
        )}
      </div>

      <div className='mt-2'>
        <h3 className='text-lg font-bold'>{node.name}</h3>
        <div className='text-sm text-muted-foreground flex gap-2 items-center'>
          {node.createdAt}
        </div>
      </div>
    </div>
  )
}
