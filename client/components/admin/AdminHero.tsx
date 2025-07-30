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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <div className="flex space-x-4">
            <input
              type="url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="https://..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'logo_url');
              }}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {formData.logo_url && (
            <img 
              src={formData.logo_url} 
              alt="Logo preview" 
              className="mt-2 h-12 w-auto object-contain"
            />
          )}
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem de Fundo
          </label>
          <div className="flex space-x-4">
            <input
              type="url"
              name="background_image_url"
              value={formData.background_image_url}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="https://..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'background_image_url');
              }}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {formData.background_image_url && (
            <img 
              src={formData.background_image_url} 
              alt="Background preview" 
              className="mt-2 h-32 w-full object-cover rounded"
            />
          )}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtítulo
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Transforme sua paixão pelo streetwear..."
          />
        </div>

        {/* Main Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título Principal
          </label>
          <textarea
            name="main_title"
            value={formData.main_title}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="SEJA UM LOJISTA\\nOFICIAL ECKO E TENHA\\nos melhores produtos"
          />
          <p className="text-xs text-gray-500 mt-1">Use \\n para quebra de linha</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Junte-se aos milhares de revendedores..."
          />
        </div>

        {/* CTA Button Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto do Botão
          </label>
          <input
            type="text"
            name="cta_button_text"
            value={formData.cta_button_text}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="CONHECER OS BENEFÍCIOS"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
