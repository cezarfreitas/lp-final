import { useState } from 'react';

interface HeroData {
  id: number;
  logo_url: string;
  subtitle: string;
  main_title: string;
  description: string;
  cta_button_text: string;
  background_image_url: string;
}

interface AdminHeroProps {
  data: HeroData;
  onSave: (data: HeroData) => void;
}

export function AdminHero({ data, onSave }: AdminHeroProps) {
  const [formData, setFormData] = useState<HeroData>(data || {
    id: 0,
    logo_url: '',
    subtitle: '',
    main_title: '',
    description: '',
    cta_button_text: '',
    background_image_url: ''
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImage = async (file: File, field: 'logo_url' | 'background_image_url') => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({
          ...prev,
          [field]: result.url
        }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-600 mt-1">Configure a seção principal da sua landing page</p>
        </div>
        
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            previewMode 
              ? 'bg-gray-600 text-white hover:bg-gray-700' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {previewMode ? 'Editar' : 'Preview'}
        </button>
      </div>

      {previewMode ? (
        /* Live Preview */
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div 
            className="relative h-[600px] flex items-center justify-center"
            style={{
              backgroundImage: formData.background_image_url ? `url(${formData.background_image_url})` : 'linear-gradient(135deg, #000 0%, #333 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-4xl px-8">
              {formData.logo_url && (
                <img 
                  src={formData.logo_url} 
                  alt="Logo" 
                  className="h-16 w-auto mx-auto mb-8"
                />
              )}
              
              {formData.subtitle && (
                <p className="text-xl mb-6 opacity-90">
                  {formData.subtitle}
                </p>
              )}
              
              {formData.main_title && (
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  {formData.main_title.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < formData.main_title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
              )}
              
              {formData.description && (
                <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                  {formData.description}
                </p>
              )}
              
              {formData.cta_button_text && (
                <button
                  type="button"
                  disabled
                  className="bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors cursor-default"
                >
                  {formData.cta_button_text}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Edit Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Content Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Conteúdo</h3>
                    <p className="text-gray-500">Textos e mensagens principais</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Subtitle */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-lg"
                      placeholder="Transforme sua paixão pelo streetwear..."
                    />
                  </div>

                  {/* Main Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Título Principal
                    </label>
                    <textarea
                      name="main_title"
                      value={formData.main_title}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-lg resize-none"
                      placeholder="SEJA UM LOJISTA&#10;OFICIAL ECKO E TENHA&#10;os melhores produtos"
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pressione Enter para quebrar linha
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Descrição
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors resize-none"
                      placeholder="Junte-se aos milhares de revendedores..."
                    />
                  </div>

                  {/* CTA Button */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Texto do Botão
                    </label>
                    <input
                      type="text"
                      name="cta_button_text"
                      value={formData.cta_button_text}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-lg"
                      placeholder="CONHECER OS BENEFÍCIOS"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Mídia</h3>
                    <p className="text-gray-500">Logo e imagem de fundo</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Logo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Logo da Marca
                    </label>
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        <input
                          type="url"
                          name="logo_url"
                          value={formData.logo_url}
                          onChange={handleChange}
                          className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="https://..."
                        />
                        <label className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all cursor-pointer flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-sm font-medium">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(file, 'logo_url');
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {formData.logo_url && (
                        <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                          <p className="text-sm text-gray-600 mb-3 font-medium">Preview do Logo:</p>
                          <img 
                            src={formData.logo_url} 
                            alt="Logo preview" 
                            className="h-16 w-auto object-contain bg-white p-3 rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Background Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Imagem de Fundo
                    </label>
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        <input
                          type="url"
                          name="background_image_url"
                          value={formData.background_image_url}
                          onChange={handleChange}
                          className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="https://..."
                        />
                        <label className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all cursor-pointer flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-sm font-medium">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(file, 'background_image_url');
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {formData.background_image_url && (
                        <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                          <p className="text-sm text-gray-600 mb-3 font-medium">Preview do Fundo:</p>
                          <img 
                            src={formData.background_image_url} 
                            alt="Background preview" 
                            className="w-full h-40 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-200 flex items-center space-x-3 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Salvar Hero Section</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
