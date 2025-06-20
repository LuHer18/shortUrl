import { Button } from './button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalElements: number
  pageSize: number
  onPageSizeChange: (size: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  pageSize,
  onPageSizeChange
}: PaginationProps) {
  const startElement = currentPage * pageSize + 1
  const endElement = Math.min((currentPage + 1) * pageSize, totalElements)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 0; i < 4; i++) {
          pages.push(i)
        }
        pages.push(-1) // Separador
        pages.push(totalPages - 1)
      } else if (currentPage >= totalPages - 3) {
        pages.push(0)
        pages.push(-1) // Separador
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(0)
        pages.push(-1) // Separador
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push(-1) // Separador
        pages.push(totalPages - 1)
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>
          Mostrando {startElement} a {endElement} de {totalElements} resultados
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === -1 ? (
              <span className="px-2 py-1">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page + 1}
              </Button>
            )}
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 