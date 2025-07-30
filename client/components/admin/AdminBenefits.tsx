import { useState } from 'react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon_svg: string;
  display_order: number;
  is_active: boolean;
}

interface BenefitsSection {
  id: number;
  section_title: string;
  section_subtitle: string;
  hero_image_url: string;
  hero_image_alt: string;
  success_title: string;
  success_description: string;
}

interface AdminBenefitsProps {
  benefits: Benefit[];
  benefitsSection: BenefitsSection;
  processFeatures: any[];
  contactSection: any;
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminBenefits({ benefits, benefitsSection, onSave }: AdminBenefitsProps) {
  const [activeTab, setActiveTab] = useState('section');
  const [sectionData, setSectionData] = useState(benefitsSection || {});
  const [benefitsList, setBenefitsList] = useState(benefits || []);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);

  const handleSectionSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(`benefits-section/${sectionData.id}`, sectionData);
  };

  const handleBenefitSave = async (benefit: Benefit) => {
    if (benefit.id) {
      // Update existing
      onSave(`benefits/${benefit.id}`, benefit);
    } else {
      // Create new
      onSave('benefits', benefit, 'POST');
    }
    setEditingBenefit(null);
  };

  const handleBenefitDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este benefício?')) {
      onSave(`benefits/${id}`, {}, 'DELETE' as any);
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
        setSectionData(prev => ({
          ...prev,
          hero_image_url: result.url
        }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Seção Benefícios</h2>
      
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
            onClick={() => setActiveTab('benefits')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'benefits'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Lista de Benefícios
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
              Subtítulo da Seção
            </label>
            <textarea
              value={sectionData.section_subtitle || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, section_subtitle: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem Principal
            </label>
            <div className="flex space-x-4">
              <input
                type="url"
                value={sectionData.hero_image_url || ''}
                onChange={(e) => setSectionData(prev => ({ ...prev, hero_image_url: e.target.value }))}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://..."
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file);
                }}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            {sectionData.hero_image_url && (
              <img 
                src={sectionData.hero_image_url} 
                alt="Preview" 
                className="mt-2 h-32 w-48 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text da Imagem
            </label>
            <input
              type="text"
              value={sectionData.hero_image_alt || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, hero_image_alt: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de Sucesso
            </label>
            <input
              type="text"
              value={sectionData.success_title || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, success_title: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição de Sucesso
            </label>
            <textarea
              value={sectionData.success_description || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, success_description: e.target.value }))}
              rows={2}
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

      {/* Benefits List */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Lista de Benefícios</h3>
            <button
              onClick={() => setEditingBenefit({
                id: 0,
                title: '',
                description: '',
                icon_svg: '',
                display_order: benefitsList.length + 1,
                is_active: true
              })}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              + Adicionar Benefício
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-4">
            {benefitsList.map((benefit) => (
              <div key={benefit.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Ordem: {benefit.display_order}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingBenefit(benefit)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleBenefitDelete(benefit.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {editingBenefit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                  {editingBenefit.id ? 'Editar' : 'Adicionar'} Benefício
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={editingBenefit.title}
                      onChange={(e) => setEditingBenefit(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={editingBenefit.description}
                      onChange={(e) => setEditingBenefit(prev => prev ? { ...prev, description: e.target.value } : null)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordem de Exibição
                    </label>
                    <input
                      type="number"
                      value={editingBenefit.display_order}
                      onChange={(e) => setEditingBenefit(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SVG do Ícone
                    </label>
                    <textarea
                      value={editingBenefit.icon_svg}
                      onChange={(e) => setEditingBenefit(prev => prev ? { ...prev, icon_svg: e.target.value } : null)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="<path d='...' />"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setEditingBenefit(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => editingBenefit && handleBenefitSave(editingBenefit)}
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
