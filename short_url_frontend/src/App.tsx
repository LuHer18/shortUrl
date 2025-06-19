import { FormProvider } from 'react-hook-form'
import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { useShortUrl } from './hooks/useShortUrl'

function App() {
  const { urls, methods, createShortUrl, deleteUrl } = useShortUrl()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Acortador de URLs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Crear nueva URL</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear URL corta</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(createShortUrl)} className="grid gap-4 py-4">
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
                <Button type="submit">Crear</Button>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>

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
          {urls.map((url) => (
            <TableRow key={url.id}>
              <TableCell>{url.name}</TableCell>
              <TableCell>{url.originalUrl}</TableCell>
              <TableCell>
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {url.shortUrl}
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
