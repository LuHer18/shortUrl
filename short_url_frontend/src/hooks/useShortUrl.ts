import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShortUrl, FormInputs } from '../types'

export const useShortUrl = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([])
  
  const methods = useForm<FormInputs>({
    defaultValues: {
      name: '',
      urlOriginal: ''
    }
  })

  const createShortUrl = (data: FormInputs) => {
    const newShortUrl: ShortUrl = {
      id: Date.now().toString(),
      name: data.name,
      originalUrl: data.urlOriginal,
      shortUrl: `http://localhost:3000/${Math.random().toString(36).substring(7)}`
    }
    setUrls(prevUrls => [...prevUrls, newShortUrl])
    methods.reset()
  }

  const deleteUrl = (id: string) => {
    setUrls(prevUrls => prevUrls.filter(url => url.id !== id))
  }

  return {
    urls,
    methods,
    createShortUrl,
    deleteUrl
  }
} 