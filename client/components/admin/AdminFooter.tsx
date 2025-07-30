import { useState } from 'react';

interface FooterSection {
  id: number;
  logo_url: string;
  about_text: string;
  social_title: string;
  social_description: string;
  copyright_text: string;
  developer_text: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_svg: string;
  is_active: boolean;
}

interface QuickLink {
  id: number;
  link_text: string;
  link_url: string;
  link_target: string;
  display_order: number;
  is_active: boolean;
}

interface AdminFooterProps {
  footerSection: FooterSection;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminFooter({ footerSection, socialLinks, quickLinks, onSave }: AdminFooterProps) {
  const [activeTab, setActiveTab] = useState('section');
  const [sectionData, setSectionData] = useState(footerSection || {});
  const [socialList, setSocialList] = useState(socialLinks || []);
  const [quickList, setQuickList] = useState(quickLinks || []);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [editingQuick, setEditingQuick] = useState<QuickLink | null>(null);

  const handleSectionSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(`footer-section/${sectionData.id}`, sectionData);
  };

  const handleSocialSave = (social: SocialLink) => {
    if (social.id) {
      onSave(`social-links/${social.id}`, social);
    } else {
      onSave('social-links', social, 'POST');
    }
    setEditingSocial(null);
  };

  const handleQuickSave = (quick: QuickLink) => {
    if (quick.id) {
      onSave(`quick-links/${quick.id}`, quick);
    } else {
      onSave('quick-links', quick, 'POST');
    }
    setEditingQuick(null);
  };

  const handleSocialDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este link social?')) {
      onSave(`social-links/${id}`, {}, 'DELETE' as any);
    }
  };

  const handleQuickDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este link rápido?')) {
      onSave(`quick-links/${id}`, {}, 'DELETE' as any);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Footer</h2>
      
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
            Configurações Gerais
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'social'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Redes Sociais
          </button>
          <button
            onClick={() => setActiveTab('quick')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quick'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Links Rápidos
          </button>
        </nav>
      </div>

      {/* Section Settings */}
      {activeTab === 'section' && (
        <form onSubmit={handleSectionSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              value={sectionData.logo_url || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, logo_url: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto Sobre</label>
            <textarea
              value={sectionData.about_text || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, about_text: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título Redes Sociais</label>
            <input
              type="text"
              value={sectionData.social_title || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, social_title: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Redes Sociais</label>
            <input
              type="text"
              value={sectionData.social_description || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, social_description: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto Copyright</label>
            <input
              type="text"
              value={sectionData.copyright_text || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, copyright_text: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto Desenvolvedor</label>
            <input
              type="text"
              value={sectionData.developer_text || ''}
              onChange={(e) => setSectionData(prev => ({ ...prev, developer_text: e.target.value }))}
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

      {/* Social Links */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
            <button
              onClick={() => setEditingSocial({
                id: 0,
                platform: '',
                url: '',
                icon_svg: '',
                is_active: true
              })}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              + Adicionar Rede Social
            </button>
          </div>

          <div className="grid gap-4">
            {socialList.map((social) => (
              <div key={social.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{social.platform}</h4>
                    <p className="text-gray-600 text-sm">{social.url}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingSocial(social)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleSocialDelete(social.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      {activeTab === 'quick' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Links Rápidos</h3>
            <button
              onClick={() => setEditingQuick({
                id: 0,
                link_text: '',
                link_url: '',
                link_target: '_self',
                display_order: quickList.length + 1,
                is_active: true
              })}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              + Adicionar Link
            </button>
          </div>

          <div className="grid gap-4">
            {quickList.map((quick) => (
              <div key={quick.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{quick.link_text}</h4>
                    <p className="text-gray-600 text-sm">{quick.link_url}</p>
                    <p className="text-xs text-gray-500">Ordem: {quick.display_order}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingQuick(quick)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleQuickDelete(quick.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Edit Modal */}
      {editingSocial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingSocial.id ? 'Editar' : 'Adicionar'} Rede Social
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
                <input
                  type="text"
                  value={editingSocial.platform}
                  onChange={(e) => setEditingSocial(prev => prev ? { ...prev, platform: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial(prev => prev ? { ...prev, url: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SVG do Ícone</label>
                <textarea
                  value={editingSocial.icon_svg}
                  onChange={(e) => setEditingSocial(prev => prev ? { ...prev, icon_svg: e.target.value } : null)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingSocial(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => editingSocial && handleSocialSave(editingSocial)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Link Edit Modal */}
      {editingQuick && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingQuick.id ? 'Editar' : 'Adicionar'} Link Rápido
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Link</label>
                <input
                  type="text"
                  value={editingQuick.link_text}
                  onChange={(e) => setEditingQuick(prev => prev ? { ...prev, link_text: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="text"
                  value={editingQuick.link_url}
                  onChange={(e) => setEditingQuick(prev => prev ? { ...prev, link_url: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <select
                  value={editingQuick.link_target}
                  onChange={(e) => setEditingQuick(prev => prev ? { ...prev, link_target: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="_self">Mesma aba</option>
                  <option value="_blank">Nova aba</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                <input
                  type="number"
                  value={editingQuick.display_order}
                  onChange={(e) => setEditingQuick(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingQuick(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => editingQuick && handleQuickSave(editingQuick)}
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
