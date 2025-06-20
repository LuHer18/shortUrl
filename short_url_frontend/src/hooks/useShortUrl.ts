import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ShortUrl, FormInputs, PaginatedResponse, PaginationParams, EncryptionStrategy } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const useShortUrl = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([])
  const [loading, setLoading] = useState(false)
  const [strategies, setStrategies] = useState<EncryptionStrategy[]>([])
  const [loadingStrategies, setLoadingStrategies] = useState(false)
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    size: 10,
    sortBy: 'id',
    sortDir: 'desc'
  })
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  const methods = useForm<FormInputs>({
    defaultValues: {
      name: '',
      urlOriginal: '',
      strategy: ''
    }
  })

  const fetchStrategies = async () => {
    setLoadingStrategies(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/encrypt/all`)
      if (!response.ok) {
        throw new Error('Error al cargar las estrategias')
      }
      const data: EncryptionStrategy[] = await response.json()
      setStrategies(data)
      // Si hay estrategias, seleccionar la primera por defecto
      if (data.length > 0 && !methods.getValues('strategy')) {
        methods.setValue('strategy', data[0].type)
      }
    } catch (error) {
      console.error('Error fetching strategies:', error)
    } finally {
      setLoadingStrategies(false)
    }
  }

  const fetchUrls = async (params: PaginationParams) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        size: params.size.toString(),
        sortBy: params.sortBy || 'id',
        sortDir: params.sortDir || 'desc'
      })
      
      const response = await fetch(
        `${API_BASE_URL}/api/v1/url/all/paginated?${queryParams}`
      )
      
      if (!response.ok) {
        throw new Error('Error al cargar las URLs')
      }
      
      const data: PaginatedResponse<ShortUrl> = await response.json()
      setUrls(data.content)
      setTotalElements(data.totalElements)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching URLs:', error)
      setUrls([])
      setTotalElements(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls(pagination)
    fetchStrategies()
  }, [pagination])

  const createShortUrl = async (data: FormInputs) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/url/create?strategy=${data.strategy}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          urlOriginal: data.urlOriginal
        })
      })
      
      if (!response.ok) {
        throw new Error('Error al crear la URL')
      }
      
      // Recargar la página actual después de crear
      fetchUrls(pagination)
      methods.reset()
    } catch (error) {
      console.error('Error creating short URL:', error)
    }
  }

  const deleteUrl = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/url/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Error al eliminar la URL')
      }
      
      // Recargar la página actual después de eliminar
      fetchUrls(pagination)
    } catch (error) {
      console.error('Error deleting URL:', error)
    }
  }

  const changePage = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const changePageSize = (newSize: number) => {
    setPagination({ ...pagination, page: 0, size: newSize })
  }

  const changeSort = (sortBy: string, sortDir: string) => {
    setPagination({ ...pagination, page: 0, sortBy, sortDir })
  }

  return {
    urls,
    loading,
    strategies,
    loadingStrategies,
    methods,
    createShortUrl,
    deleteUrl,
    pagination,
    totalElements,
    totalPages,
    changePage,
    changePageSize,
    changeSort
  }
} 