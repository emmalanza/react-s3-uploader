import { useState, useEffect, useRef } from 'react';
import { uploadImage } from '../services/uploadImage';
import { deleteImage } from '../services/deleteImage';
import { listImages } from '../services/listImages'; // debes crear esta funcion
import { v4 as uuidv4 } from 'uuid';

export default function ImageUploader() {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [images, setImages] = useState([]);

  const BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;
  const REGION = import.meta.env.VITE_AWS_REGION;
  const BUCKET_URL = `https://s3.${REGION}.amazonaws.com/${BUCKET}/`;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const keys = await listImages();
      setImages(keys);
    } catch (err) {
      console.error('Error al obtener imágenes:', err);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl('');
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus('Subiendo imagen...');

    try {
      const key = `${uuidv4()}_${selectedFile.name}`;
      await uploadImage(selectedFile, key);
      setStatus('✅ Imagen subida con éxito');
      setSelectedFile(null);
      fileInputRef.current.value = '';
      fetchImages();
    } catch (err) {
      console.error('Error al subir:', err);
      setStatus('❌ Error al subir imagen');
    }
  };

  const handleDelete = async (key) => {
    setStatus(`Eliminando ${key}...`);
    try {
      await deleteImage(key);
      setStatus('🗑️ Imagen eliminada');
      fetchImages();
    } catch (err) {
      console.error('Error al borrar:', err);
      setStatus('❌ Error al eliminar imagen');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Galería de Imágenes</h2>

      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />

      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Vista previa" className="w-full max-h-64 object-contain rounded-lg shadow-md" />
        </div>
      )}

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedFile
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
        >
          Subir
        </button>
      </div>

      {status && (
        <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded shadow-inner mb-6">{status}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((key) => (
            <div key={key} className="relative group rounded-xl overflow-hidden shadow-md">
              <img src={`${BUCKET_URL}${key}`} alt={key} className="w-full h-48 object-cover rounded-xl" />
              <button
                onClick={() => handleDelete(key)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-red-700 transition-all"
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No hay imágenes disponibles.</p>
        )}
      </div>
    </div>
  );
}
