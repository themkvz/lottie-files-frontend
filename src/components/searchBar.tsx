import { useDebounceCallback } from 'usehooks-ts'
import { Input } from './ui/input'

export function SearchBar ({setSearch, value}: {setSearch: (search: string) => void, value: string}) {

  const debounced = useDebounceCallback(setSearch, 500)

  return (
    <div className='container'>
      <div className='py-6'>
        <h2 className='text-2xl leading-tight font-display font-bold'>
          Search animations
        </h2>
      </div>

      <div className='pb-6'>
        <Input defaultValue={value} onChange={e => debounced(e.target.value)} type='search' className='max-w-xs' placeholder='Search animation...' />
      </div>
    </div>
  )
}
