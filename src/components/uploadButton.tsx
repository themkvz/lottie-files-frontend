import { UploadIcon, X } from 'lucide-react'
import { createRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Input } from './ui/input'
import { useMutation } from '@apollo/client'
import { UPLOAD_MUTATION } from '@/graphql/mutation'
import { GET_ANIMATIONS } from '@/graphql/query'

interface ErrorsList {
  file?: string
  name?: string
}

export function UploadButton () {
  const ref = createRef<HTMLDivElement>()
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<ErrorsList>({})

  const [uploadMutation, { loading }] = useMutation(UPLOAD_MUTATION, {
    refetchQueries: [GET_ANIMATIONS]
  })

  useOnClickOutside(ref, () => setIsOpen(false))

  function onChangeFile (e: React.ChangeEvent<HTMLInputElement>) {
    e.target?.files && setFile(e.target?.files[0] || null)
  }

  function onChangeName (e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function onUpload () {
    const errors: ErrorsList = {}

    if (!file) {
      errors.file = 'Please select a file'
    }

    if (!name) {
      errors.name = 'Please enter a name'
    }

    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    uploadMutation({
      variables: {
        file,
        name
      }
    }).then(() => {
      setFile(undefined)
      setName('')
    })
  }

  return (
    <div ref={ref} className='fixed z-10 bottom-8 right-8'>
      {isOpen && (
        <div className='absolute z-10 right-0 bottom-full bg-white p-8 rounded-lg shadow-lg max-w-lg w-[256px] sm:w-[320px] mb-10'>
          <h2 className='text-2xl font-bold'>Upload an animation</h2>

          <div>
            <Input
              onChange={onChangeFile}
              type='file'
              accept='.json'
              className='mt-4'
            />
            {errors.file && (
              <span className='text-red-500 text-sm'>{errors?.file}</span>
            )}
          </div>
          <div>
            <Input
              onChange={onChangeName}
              value={name}
              type='text'
              placeholder='Name'
              className='mt-4'
            />
            {errors.name && (
              <span className='text-red-500 text-sm'>{errors?.name}</span>
            )}
          </div>

          <button
            onClick={onUpload}
            className='bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm rounded-md mt-4'
          >
            Upload
          </button>
        </div>
      )}

      <button
        disabled={loading}
        className=' bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <UploadIcon size={24} />}
      </button>
    </div>
  )
}
