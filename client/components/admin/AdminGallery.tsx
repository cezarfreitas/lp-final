import { useState } from 'react';

interface Product {
  id: number;
  product_name: string;
  product_category: string;
  image_url: string;
  image_alt: string;
  display_order: number;
  is_active: boolean;
}

interface AdminGalleryProps {
  data: Product[];
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminGallery({ data, onSave }: AdminGalleryProps) {
  const [products, setProducts] = useState(data || []);
  const [editing, setEditing] = useState<Product | null>(null);

  const handleSave = (product: Product) => {
    if (product.id) {
      onSave(`product-gallery/${product.id}`, product);
    } else {
      onSave('product-gallery', product, 'POST');
    }
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      onSave(`product-gallery/${id}`, {}, 'DELETE' as any);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        setEditing(prev => prev ? { ...prev, image_url: result.url } : null);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Galeria de Produtos</h2>
        <button
          onClick={() => setEditing({
            id: 0,
            product_name: '',
            product_category: '',
            image_url: '',
            image_alt: '',
            display_order: products.length + 1,
            is_active: true
          })}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Adicionar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img 
              src={product.image_url} 
              alt={product.image_alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">{product.product_name}</h4>
              <p className="text-gray-600 text-sm">{product.product_category}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Ordem: {product.display_order}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(product)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editing.id ? 'Editar' : 'Adicionar'} Produto
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  value={editing.product_name}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, product_name: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <input
                  type="text"
                  value={editing.product_category}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, product_category: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={editing.image_url}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, image_url: e.target.value } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://..."
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(file);
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                {editing.image_url && (
                  <img 
                    src={editing.image_url} 
                    alt="Preview" 
                    className="mt-2 h-24 w-24 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editing.image_alt}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, image_alt: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                <input
                  type="number"
                  value={editing.display_order}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => editing && handleSave(editing)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
