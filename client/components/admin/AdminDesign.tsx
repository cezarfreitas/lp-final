import { useState } from 'react';

interface DesignData {
  id: number;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_color: string;
  background_color: string;
  font_primary: string;
  font_secondary: string;
  font_sizes: {
    heading1: string;
    heading2: string;
    heading3: string;
    body: string;
    small: string;
  };
}

interface AdminDesignProps {
  data?: DesignData;
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminDesign({ data, onSave }: AdminDesignProps) {
  const [formData, setFormData] = useState<DesignData>(data || {
    id: 1,
    primary_color: '#dc2626',
    secondary_color: '#000000',
    accent_color: '#ffffff',
    text_color: '#1f2937',
    background_color: '#f9fafb',
    font_primary: 'Inter',
    font_secondary: 'Roboto',
    font_sizes: {
      heading1: '3rem',
      heading2: '2.25rem',
      heading3: '1.875rem',
      body: '1rem',
      small: '0.875rem'
    }
  });

  const [activeSection, setActiveSection] = useState<string>('colors');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave('design', formData, 'PUT');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFontSizeChange = (size: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      font_sizes: {
        ...prev.font_sizes,
        [size]: value
      }
    }));
  };

  const colorPalettes = [
    { name: 'ECKO Original', primary: '#dc2626', secondary: '#000000', accent: '#ffffff' },
    { name: 'Streetwear Dark', primary: '#1f2937', secondary: '#dc2626', accent: '#f59e0b' },
    { name: 'Urban Clean', primary: '#374151', secondary: '#6b7280', accent: '#10b981' },
    { name: 'Fire Red', primary: '#ef4444', secondary: '#1f2937', accent: '#fbbf24' },
    { name: 'Night Mode', primary: '#000000', secondary: '#dc2626', accent: '#ffffff' }
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Helvetica', 'Arial', 'Poppins', 'Montserrat', 
    'Open Sans', 'Lato', 'Source Sans Pro', 'Nunito', 'Raleway', 'Ubuntu'
  ];

  const applyPalette = (palette: any) => {
    setFormData(prev => ({
      ...prev,
      primary_color: palette.primary,
      secondary_color: palette.secondary,
      accent_color: palette.accent
    }));
  };

  const sections = [
    { id: 'colors', label: 'Cores' },
    { id: 'fonts', label: 'Fontes' },
    { id: 'preview', label: 'Preview' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className="space-y-6">
            {/* Color Palettes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paletas Predefinidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorPalettes.map((palette, index) => (
                  <div
                    key={index}
                    onClick={() => applyPalette(palette)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-red-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: palette.primary }}
                      ></div>
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: palette.secondary }}
                      ></div>
                      <div 
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: palette.accent }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{palette.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Cores Personalizadas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Primária
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => handleChange('primary_color', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => handleChange('primary_color', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="#dc2626"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Secundária
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => handleChange('secondary_color', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondary_color}
                      onChange={(e) => handleChange('secondary_color', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor de Destaque
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.accent_color}
                      onChange={(e) => handleChange('accent_color', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accent_color}
                      onChange={(e) => handleChange('accent_color', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor do Texto
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.text_color}
                      onChange={(e) => handleChange('text_color', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.text_color}
                      onChange={(e) => handleChange('text_color', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="#1f2937"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor de Fundo
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.background_color}
                      onChange={(e) => handleChange('background_color', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.background_color}
                      onChange={(e) => handleChange('background_color', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="#f9fafb"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fonts Section */}
        {activeSection === 'fonts' && (
          <div className="space-y-6">
            {/* Font Family */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Famílias de Fonte</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fonte Primária (Títulos)
                  </label>
                  <select
                    value={formData.font_primary}
                    onChange={(e) => handleChange('font_primary', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fonte Secundária (Texto)
                  </label>
                  <select
                    value={formData.font_secondary}
                    onChange={(e) => handleChange('font_secondary', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Font Sizes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tamanhos de Fonte</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título Principal (H1)
                  </label>
                  <input
                    type="text"
                    value={formData.font_sizes.heading1}
                    onChange={(e) => handleFontSizeChange('heading1', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="3rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo (H2)
                  </label>
                  <input
                    type="text"
                    value={formData.font_sizes.heading2}
                    onChange={(e) => handleFontSizeChange('heading2', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="2.25rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seção (H3)
                  </label>
                  <input
                    type="text"
                    value={formData.font_sizes.heading3}
                    onChange={(e) => handleFontSizeChange('heading3', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="1.875rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto Normal
                  </label>
                  <input
                    type="text"
                    value={formData.font_sizes.body}
                    onChange={(e) => handleFontSizeChange('body', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto Pequeno
                  </label>
                  <input
                    type="text"
                    value={formData.font_sizes.small}
                    onChange={(e) => handleFontSizeChange('small', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="0.875rem"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Section */}
        {activeSection === 'preview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview do Design</h3>
            
            <div 
              className="p-8 rounded-lg border-2 border-dashed border-gray-300"
              style={{ 
                backgroundColor: formData.background_color,
                color: formData.text_color,
                fontFamily: formData.font_secondary
              }}
            >
              <h1 
                style={{ 
                  color: formData.primary_color,
                  fontFamily: formData.font_primary,
                  fontSize: formData.font_sizes.heading1,
                  marginBottom: '1rem'
                }}
              >
                SEJA UM LOJISTA OFICIAL ECKO
              </h1>
              
              <h2 
                style={{ 
                  color: formData.secondary_color,
                  fontFamily: formData.font_primary,
                  fontSize: formData.font_sizes.heading2,
                  marginBottom: '1rem'
                }}
              >
                Transforme sua paixão em negócio
              </h2>
              
              <p 
                style={{ 
                  fontSize: formData.font_sizes.body,
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}
              >
                Junte-se aos milhares de revendedores que já transformaram seus negócios com a marca mais desejada do streetwear brasileiro.
              </p>
              
              <button
                style={{
                  backgroundColor: formData.primary_color,
                  color: formData.accent_color,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontFamily: formData.font_primary,
                  fontSize: formData.font_sizes.body,
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                CONHECER OS BENEFÍCIOS
              </button>
              
              <p 
                style={{ 
                  fontSize: formData.font_sizes.small,
                  marginTop: '1rem',
                  opacity: '0.7'
                }}
              >
                Este é um exemplo de como o texto pequeno aparecerá no site.
              </p>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Salvar Design</span>
          </button>
        </div>
      </form>
    </div>
  );
}
