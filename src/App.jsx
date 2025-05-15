import './styles/styles.css';
import ImageUploader from './components/ImageUploader';

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">Subir y Eliminar Imágenes</h1>
        <ImageUploader />
      </div>
    </>
  )
}

export default App;
