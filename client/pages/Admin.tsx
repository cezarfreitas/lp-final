import { useState, useEffect } from 'react';
import { AdminHero } from '../components/admin/AdminHero';
import { AdminBenefits } from '../components/admin/AdminBenefits';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminFAQ } from '../components/admin/AdminFAQ';
import { AdminGallery } from '../components/admin/AdminGallery';
import { AdminShowroom } from '../components/admin/AdminShowroom';
import { AdminFooter } from '../components/admin/AdminFooter';
import { AdminDesign } from '../components/admin/AdminDesign';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
          const responseText = await response.text();
          try {
            errorData = JSON.parse(responseText);
          } catch {
            errorData = { error: responseText };
          }
        } catch {
          errorData = { error: 'Failed to read response' };
        }

        console.error('API Error:', response.status, response.statusText, errorData);

        if (response.status === 500 && (
          errorData.code === 'DB_NOT_INITIALIZED' ||
          errorData.error?.includes('ER_NO_SUCH_TABLE') ||
          errorData.error?.includes('Database tables not found')
        )) {
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

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
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
        window.location.href = '/setup';
      }
    } catch {
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
        let errorMessage = `${response.status} ${response.statusText}`;
        
        try {
          const responseClone = response.clone();
          const responseText = await responseClone.text();
          
          try {
            const errorData = JSON.parse(responseText);
            errorMessage += ` - ${errorData.error || errorData.message || 'Unknown error'}`;
          } catch {
            errorMessage += responseText ? ` - ${responseText}` : ' - Unknown error';
          }
        } catch (parseError) {
          console.error('Error reading response:', parseError);
          errorMessage += ' - Failed to read error response';
        }

        console.error('Save API Error:', errorMessage);
        throw new Error(`Failed to save data: ${errorMessage}`);
      }

      const result = await response.json();
      console.log('Save successful:', result);

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);

      await fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);

      alert(`Erro ao salvar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const tabs = [
    { 
      id: 'hero', 
      label: 'Hero',
      icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'benefits', 
      label: 'Benefícios',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'testimonials', 
      label: 'Depoimentos',
      icon: 'M8 12a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12z',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'faq', 
      label: 'FAQ',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'gallery', 
      label: 'Galeria',
      icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z',
      color: 'from-pink-500 to-pink-600'
    },
    { 
      id: 'showroom', 
      label: 'Showroom',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      id: 'footer', 
      label: 'Footer',
      icon: 'M4 6h16M4 12h16M4 18h16',
      color: 'from-gray-500 to-gray-600'
    },
    { 
      id: 'design', 
      label: 'Design',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v12a2 2 0 104 0V5a2 2 0 00-2-2z',
      color: 'from-red-500 to-red-600'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-red-500/30 border-t-red-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-red-500/10 animate-pulse mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">ECKO Admin</h2>
          <p className="text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar dados</h2>
              <p className="text-gray-400 mb-6">
                Não foi possível conectar ao banco de dados. Execute a configuração inicial.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={fetchData}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Tentar Novamente
              </button>

              <a
                href="/setup"
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 text-center transition-colors font-medium"
              >
                Configuração Inicial
              </a>

              <a
                href="/"
                className="block w-full bg-gray-700 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-600 text-center transition-colors font-medium"
              >
                Voltar ao Site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Save Status - Floating */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5">
          {saveStatus === 'saving' && (
            <div className="flex items-center text-blue-400 bg-blue-900/50 backdrop-blur-lg border border-blue-500/30 px-6 py-4 rounded-2xl shadow-2xl">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400/30 border-t-blue-400 mr-3"></div>
              <span className="font-medium">Salvando...</span>
            </div>
          )}
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-400 bg-green-900/50 backdrop-blur-lg border border-green-500/30 px-6 py-4 rounded-2xl shadow-2xl">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Salvo com sucesso!</span>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center text-red-400 bg-red-900/50 backdrop-blur-lg border border-red-500/30 px-6 py-4 rounded-2xl shadow-2xl">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Erro ao salvar</span>
            </div>
          )}
        </div>
      )}

      <div className="flex h-screen">
        {/* Modern Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-black/50 backdrop-blur-2xl border-r border-red-500/20 flex flex-col relative`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-xl">E</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-xl">ECKO</h1>
                    <p className="text-gray-400 text-sm">Admin Panel</p>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
              >
                <svg className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} shadow-lg shadow-red-500/25 scale-105`
                    : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-105'
                }`}
              >
                <div className="flex items-center p-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:text-white'
                  }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={tab.icon} clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="ml-4 flex-1 text-left">
                      <span className={`font-medium block ${
                        activeTab === tab.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {tab.label}
                      </span>
                      <div className={`text-xs mt-1 ${
                        activeTab === tab.id ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        Seção {index + 1}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Active indicator */}
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r"></div>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-800/50 space-y-2">
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">Ver Site</span>}
            </a>
            
            <button 
              onClick={fetchData}
              className="flex items-center justify-center w-full bg-gray-800/50 text-gray-300 p-3 rounded-xl hover:bg-gray-700/50 hover:text-white transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {!sidebarCollapsed && <span>Atualizar</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
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

              {activeTab === 'design' && (
                <AdminDesign 
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
