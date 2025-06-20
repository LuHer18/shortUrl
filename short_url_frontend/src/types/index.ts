export interface ShortUrl {
  id: number
  name: string
  urlOriginal: string
  urlShort: string
  createdAt: string
  updatedAt: string
}

export interface FormInputs {
  name: string
  urlOriginal: string
}

export interface PaginatedResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    unpaged: boolean
    paged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface PaginationParams {
  page: number
  size: number
  sortBy?: string
  sortDir?: string
} 