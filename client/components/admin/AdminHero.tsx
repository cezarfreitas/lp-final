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
    id: 1,
    logo_url: '',
    subtitle: '',
    main_title: '',
    description: '',
    cta_button_text: '',
    background_image_url: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState<{ logo: boolean; background: boolean }>({
    logo: false,
    background: false
  });

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

  // Função para comprimir e otimizar imagens
  const compressImage = (file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular dimensões mantendo aspect ratio
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para blob com compressão
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/webp', // WebP para melhor compressão
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // Fallback para arquivo original
            }
          },
          'image/webp', // Formato WebP otimizado
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImage = async (file: File, field: 'logo_url' | 'background_image_url') => {
    // Validar se é imagem
    if (!file.type.startsWith('image/')) {
      alert('❌ Por favor, selecione apenas arquivos de imagem (JPG, PNG, WebP, etc.)');
      return;
    }

    // Validar tamanho máximo (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('❌ Arquivo muito grande! Máximo permitido: 10MB');
      return;
    }

    const uploadField = field === 'logo_url' ? 'logo' : 'background';
    setUploading(prev => ({ ...prev, [uploadField]: true }));

    try {
      console.log('Processando imagem:', file.name, 'Tamanho original:', (file.size / 1024 / 1024).toFixed(2) + 'MB');

      // Definir dimensões máximas baseadas no tipo de imagem
      const maxDimensions = field === 'logo_url'
        ? { width: 400, height: 200 } // Logo menor
        : { width: 1920, height: 1080 }; // Background maior

      // Comprimir imagem
      const compressedFile = await compressImage(file, maxDimensions.width, maxDimensions.height, 0.85);

      console.log('Imagem comprimida:', compressedFile.name, 'Novo tamanho:', (compressedFile.size / 1024 / 1024).toFixed(2) + 'MB');

      const formData = new FormData();
      formData.append('file', compressedFile);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        setFormData(prev => ({
          ...prev,
          [field]: result.url
        }));

        // Mostrar informações de otimização
        const originalSize = (file.size / 1024).toFixed(0);
        const compressedSize = (compressedFile.size / 1024).toFixed(0);
        const reduction = ((1 - compressedFile.size / file.size) * 100).toFixed(0);

        alert(`✅ Upload otimizado com sucesso!
📈 Redução: ${reduction}% (${originalSize}KB → ${compressedSize}KB)
🚀 Formato WebP para melhor performance`);
      } else {
        const errorData = await response.text();
        console.error('Upload failed:', response.status, errorData);
        alert(`Erro no upload: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Erro no upload: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setUploading(prev => ({ ...prev, [uploadField]: false }));
    }
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Preview - Hero Section</h1>
          <button
            onClick={() => setShowPreview(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Voltar �� Edição
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div 
            className="relative h-96 flex items-center justify-center"
            style={{
              backgroundImage: formData.background_image_url ? `url(${formData.background_image_url})` : 'linear-gradient(135deg, #000 0%, #333 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="relative z-10 text-center text-white max-w-3xl px-8">
              {formData.logo_url && (
                <img 
                  src={formData.logo_url} 
                  alt="Logo" 
                  className="h-12 w-auto mx-auto mb-6"
                />
              )}
              
              {formData.subtitle && (
                <p className="text-lg mb-4 opacity-90">
                  {formData.subtitle}
                </p>
              )}
              
              {formData.main_title && (
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                  {formData.main_title.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < formData.main_title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
              )}
              
              {formData.description && (
                <p className="text-lg mb-8 opacity-90">
                  {formData.description}
                </p>
              )}
              
              {formData.cta_button_text && (
                <button
                  type="button"
                  disabled
                  className="bg-red-600 text-white px-8 py-3 rounded font-semibold cursor-default"
                >
                  {formData.cta_button_text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hero Section</h1>
          <p className="text-gray-600">Configure a seção principal da página</p>
        </div>
        
        <button
          onClick={() => setShowPreview(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Visualizar
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Content */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Conteúdo</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Transforme sua paixão pelo streetwear..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título Principal
                </label>
                <textarea
                  name="main_title"
                  value={formData.main_title}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="SEJA UM LOJISTA&#10;OFICIAL ECKO E TENHA&#10;os melhores produtos"
                />
                <p className="text-xs text-gray-500 mt-1">Pressione Enter para quebrar linha</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Junte-se aos milhares de revendedores..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  name="cta_button_text"
                  value={formData.cta_button_text}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="CONHECER OS BENEFÍCIOS"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Imagens</h3>
            
            <div className="space-y-4">
              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="logo_url"
                      value={formData.logo_url}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://... ou /uploads/..."
                    />
                    <label className={`px-4 py-2 rounded border transition-all cursor-pointer flex items-center space-x-2 ${
                      uploading.logo
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}>
                      {uploading.logo ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                          <span>Otimizando...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span>Upload</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading.logo}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(file, 'logo_url');
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.logo_url && (
                    <div className="p-3 bg-gray-50 rounded border">
                      <img 
                        src={formData.logo_url} 
                        alt="Logo preview" 
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Background */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem de Fundo
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="background_image_url"
                      value={formData.background_image_url}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://... ou /uploads/..."
                    />
                    <label className={`px-4 py-2 rounded border transition-all cursor-pointer flex items-center space-x-2 ${
                      uploading.background
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}>
                      {uploading.background ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                          <span>Otimizando...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span>Upload</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading.background}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(file, 'background_image_url');
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.background_image_url && (
                    <div className="p-3 bg-gray-50 rounded border">
                      <img 
                        src={formData.background_image_url} 
                        alt="Background preview" 
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
