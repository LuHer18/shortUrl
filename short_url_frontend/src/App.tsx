import { FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Select } from './components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/ui/pagination'
import { useShortUrl } from './hooks/useShortUrl'
import { FormInputs } from './types'
import { Loader2 } from 'lucide-react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { 
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
    changePageSize 
  } = useShortUrl()

  const handleCreateShortUrl = async (data: FormInputs) => {
    await createShortUrl(data)
    setIsModalOpen(false) // Cerrar el modal después de crear
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Acortador de URLs</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>Crear nueva URL</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear URL corta</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleCreateShortUrl)} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    name="name"
                    placeholder="Nombre de la URL (ej: Blog Personal)"
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    name="urlOriginal"
                    placeholder="URL a acortar (ej: https://miblog.com)"
                  />
                </div>
                <div className="grid gap-2">
                  {loadingStrategies ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Cargando estrategias...</span>
                    </div>
                  ) : (
                    <Select
                      name="strategy"
                      placeholder="Seleccionar estrategia de encriptación"
                      options={strategies.map(strategy => ({
                        value: strategy.type,
                        label: strategy.type
                      }))}
                    />
                  )}
                </div>
                <Button type="submit" disabled={loadingStrategies || strategies.length === 0}>
                  Crear
                </Button>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>URL Original</TableHead>
              <TableHead>URL Corta</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Cargando URLs...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No hay URLs para mostrar
                </TableCell>
              </TableRow>
            ) : (
              urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>{url.name}</TableCell>
                  <TableCell className="max-w-xs truncate" title={url.urlOriginal}>
                    {url.urlOriginal}
                  </TableCell>
                  <TableCell>
                    <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/v1/url/${url.urlShort}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {url.urlShort}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUrl(url.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {totalElements > 0 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={totalPages}
            onPageChange={changePage}
            totalElements={totalElements}
            pageSize={pagination.size}
            onPageSizeChange={changePageSize}
          />
        )}
      </div>
    </div>
  )
}

export default App
