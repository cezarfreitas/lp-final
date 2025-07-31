import { useState } from 'react';

interface ShowroomSection {
  id: number;
  section_title: string;
  section_description: string;
  cta_button_text: string;
}

interface ShowroomImage {
  id: number;
  image_url: string;
  image_alt: string;
  image_title: string;
  image_description: string;
  display_order: number;
  is_active: boolean;
}

interface AdminShowroomProps {
  section: ShowroomSection;
  images: ShowroomImage[];
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminShowroom({ section, images, onSave }: AdminShowroomProps) {
  const [activeTab, setActiveTab] = useState('section');
  const [sectionData, setSectionData] = useState(section || {});
  const [imagesList, setImagesList] = useState(images || []);
  const [editingImage, setEditingImage] = useState<ShowroomImage | null>(null);

  const handleSectionSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(`showroom-section/${sectionData.id}`, sectionData);
  };

  const handleImageSave = (image: ShowroomImage) => {
    if (image.id) {
      onSave(`showroom-images/${image.id}`, image);
    } else {
      onSave('showroom-images', image, 'POST');
    }
    setEditingImage(null);
  };

  const handleImageDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta imagem?')) {
      onSave(`showroom-images/${id}`, {}, 'DELETE' as any);
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
        setEditingImage(prev => prev ? { ...prev, image_url: result.url } : null);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Showroom</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('section')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'section'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Configurações da Seção
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'images'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Imagens do Slider
          </button>
        </nav>
      </div>

      {/* Section Settings */}
      {activeTab === 'section' && (
        <form onSubmit={handleSectionSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Seção
            </label>
            <input
              type="text"
              value={sectionData.section_title || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, section_title: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Seção
            </label>
            <textarea
              value={sectionData.section_description || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, section_description: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto do Botão CTA
            </label>
            <input
              type="text"
              value={sectionData.cta_button_text || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, cta_button_text: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Salvar Configurações
            </button>
          </div>
        </form>
      )}

      {/* Images */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Imagens do Showroom</h3>
            <button
              onClick={() => setEditingImage({
                id: 0,
                image_url: '',
                image_alt: '',
                image_title: '',
                image_description: '',
                display_order: imagesList.length + 1,
                is_active: true
              })}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              + Adicionar Imagem
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imagesList.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt={image.image_alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">{image.image_title}</h4>
                  <p className="text-gray-600 text-sm">{image.image_description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Ordem: {image.display_order}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleImageDelete(image.id)}
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

          {/* Edit Modal */}
          {editingImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">
                  {editingImage.id ? 'Editar' : 'Adicionar'} Imagem
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={editingImage.image_title}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, image_title: e.target.value } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <input
                      type="text"
                      value={editingImage.image_description}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, image_description: e.target.value } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={editingImage.image_url}
                        onChange={(e) => setEditingImage(prev => prev ? { ...prev, image_url: e.target.value } : null)}
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
                    {editingImage.image_url && (
                      <img 
                        src={editingImage.image_url} 
                        alt="Preview" 
                        className="mt-2 h-24 w-full object-cover rounded"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                    <input
                      type="text"
                      value={editingImage.image_alt}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, image_alt: e.target.value } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                    <input
                      type="number"
                      value={editingImage.display_order}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setEditingImage(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => editingImage && handleImageSave(editingImage)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
