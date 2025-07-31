import { useState, useEffect } from 'react';
import { AdminHero } from '../components/admin/AdminHero';
import { AdminBenefits } from '../components/admin/AdminBenefits';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminFAQ } from '../components/admin/AdminFAQ';
import { AdminGallery } from '../components/admin/AdminGallery';
import { AdminShowroom } from '../components/admin/AdminShowroom';
import { AdminFooter } from '../components/admin/AdminFooter';

interface AdminData {
  hero: any;
  benefits: any[];
  benefitsSection: any;
  contactSection: any;
  processFeatures: any[];
  testimonials: any[];
  faqs: any[];
  productGallery: any[];
  showroomSection: any;
  showroomImages: any[];
  footerSection: any;
  socialLinks: any[];
  quickLinks: any[];
}

export default function Admin() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/all-data');

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: await response.text() };
        }

        console.error('API Error:', response.status, response.statusText, errorData);

        // Check if this is a database initialization issue
        if (response.status === 500 && (
          errorData.code === 'DB_NOT_INITIALIZED' ||
          errorData.error?.includes('ER_NO_SUCH_TABLE') ||
          errorData.error?.includes('Database tables not found')
        )) {
          // Database tables don't exist, redirect to setup
          console.log('Database not initialized, redirecting to setup...');
          window.location.href = '/setup';
          return;
        }

        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);

      // Check if it's a network error that might indicate database issues
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // Might be a CORS or server issue, check if setup is needed
        checkIfSetupNeeded();
      } else {
        setSaveStatus('error');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkIfSetupNeeded = async () => {
    try {
      const response = await fetch('/api/setup/status');
      if (!response.ok) {
        // If setup status also fails, likely need to run setup
        window.location.href = '/setup';
      }
    } catch {
      // If setup endpoint also fails, redirect to setup
      window.location.href = '/setup';
    }
  };

  const handleSave = async (endpoint: string, data: any, method: 'PUT' | 'POST' = 'PUT') => {
    try {
      setSaveStatus('saving');
      console.log(`Saving to endpoint: /api/admin/${endpoint}`, { method, data });

      const response = await fetch(`/api/admin/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: await response.text() };
        }

        console.error('Save API Error:', response.status, response.statusText, errorData);
        throw new Error(`Failed to save data: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Save successful:', result);

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);

      // Refresh data
      await fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);

      // Show error message to user
      alert(`Erro ao salvar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const tabs = [
    {
      id: 'hero',
      label: 'Hero Section',
      icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
      description: 'Seção principal da página'
    },
    {
      id: 'benefits',
      label: 'Benefícios',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      description: 'Vantagens e diferenciais'
    },
    {
      id: 'testimonials',
      label: 'Depoimentos',
      icon: 'M8 12a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12zM8 9a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1z',
      description: 'Avaliações dos clientes'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.458V6.5m0 7v4.042M2.458 12H6.5m7 0h4.042',
      description: 'Perguntas frequentes'
    },
    {
      id: 'gallery',
      label: 'Galeria',
      icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z',
      description: 'Imagens dos produtos'
    },
    {
      id: 'showroom',
      label: 'Showroom',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      description: 'Espaço físico da loja'
    },
    {
      id: 'footer',
      label: 'Footer',
      icon: 'M4 6h16M4 12h16M4 18h16',
      description: 'Rodapé e links'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar dados</h2>
              <p className="text-gray-600 mb-4">
                Não foi possível conectar ao banco de dados. Isso pode significar que o sistema ainda não foi configurado.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={fetchData}
                className="w-full bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Tentar Novamente
              </button>

              <a
                href="/setup"
                className="block w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-center"
              >
                Ir para Setup Inicial
              </a>

              <a
                href="/"
                className="block w-full bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 text-center"
              >
                Voltar ao Site
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Se este é o primeiro acesso, execute o Setup Inicial para configurar o banco de dados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-black shadow-2xl min-h-screen border-r border-red-900/20 relative overflow-hidden">
          <div className="p-4">
            {/* Compact Header */}
            <div className="mb-6 text-center">
              <div className="w-12 h-12 ecko-logo-container ecko-logo-pulse rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl text-shadow-md">E</span>
              </div>
              <h2 className="text-white font-bold text-lg text-shadow-sm">ECKO</h2>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>

            {/* Compact Navigation */}
            <div className="space-y-1">

              {tabs.map((tab, index) => (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 relative ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {/* Compact Icon */}
                    <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                      activeTab === tab.id
                        ? 'bg-red-500/20 text-red-200'
                        : 'text-gray-400'
                    }`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={tab.icon} clipRule="evenodd" />
                      </svg>
                    </div>

                    {/* Compact Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{tab.label}</span>
                        <span className={`text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium ${
                          activeTab === tab.id
                            ? 'bg-red-500/30 text-red-200'
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Compact Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="space-y-2">
                <a
                  href="/"
                  target="_blank"
                  className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium">Ver Site</span>
                </a>

                <button
                  onClick={fetchData}
                  className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 min-h-screen">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-600">
                      {tabs.find(tab => tab.id === activeTab)?.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {saveStatus === 'saving' && (
                      <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        <span className="text-sm font-medium">Salvando...</span>
                      </div>
                    )}
                    {saveStatus === 'success' && (
                      <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Salvo com sucesso!</span>
                      </div>
                    )}
                    {saveStatus === 'error' && (
                      <div className="flex items-center text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Erro ao salvar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
            {activeTab === 'hero' && (
              <AdminHero 
                data={data.hero} 
                onSave={(data) => handleSave(`hero/${data.id}`, data)} 
              />
            )}
            
            {activeTab === 'benefits' && (
              <AdminBenefits 
                benefits={data.benefits}
                benefitsSection={data.benefitsSection}
                processFeatures={data.processFeatures}
                contactSection={data.contactSection}
                onSave={handleSave}
              />
            )}

            {activeTab === 'testimonials' && (
              <AdminTestimonials 
                data={data.testimonials}
                onSave={handleSave}
              />
            )}

            {activeTab === 'faq' && (
              <AdminFAQ 
                data={data.faqs}
                onSave={handleSave}
              />
            )}

            {activeTab === 'gallery' && (
              <AdminGallery 
                data={data.productGallery}
                onSave={handleSave}
              />
            )}

            {activeTab === 'showroom' && (
              <AdminShowroom 
                section={data.showroomSection}
                images={data.showroomImages}
                onSave={handleSave}
              />
            )}

            {activeTab === 'footer' && (
              <AdminFooter 
                footerSection={data.footerSection}
                socialLinks={data.socialLinks}
                quickLinks={data.quickLinks}
                onSave={handleSave}
              />
            )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
