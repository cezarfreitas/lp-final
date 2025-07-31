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
    { id: 'hero', label: 'Hero' },
    { id: 'benefits', label: 'Benefícios' },
    { id: 'testimonials', label: 'Depoimentos' },
    { id: 'faq', label: 'FAQ' },
    { id: 'gallery', label: 'Galeria' },
    { id: 'showroom', label: 'Showroom' },
    { id: 'footer', label: 'Footer' },
    { id: 'design', label: 'Design' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar dados</h2>
              <p className="text-gray-600 mb-6">
                Não foi possível conectar ao banco de dados.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={fetchData}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Tentar Novamente
              </button>

              <a
                href="/setup"
                className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                Configuração Inicial
              </a>

              <a
                href="/"
                className="block w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-center"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <div className="text-sm text-gray-600 ml-4">
            Painel de administração
          </div>
        </div>

          {/* Save Status */}
          <div className="flex items-center space-x-4">
            {saveStatus === 'saving' && (
              <div className="flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                <span className="text-sm">Salvando...</span>
              </div>
            )}
            {saveStatus === 'success' && (
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Salvo</span>
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center text-red-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Erro</span>
              </div>
            )}

            <a 
              href="/" 
              target="_blank" 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Ver Site
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button 
                onClick={fetchData}
                className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-sm"
              >
                Atualizar Dados
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'hero' && (
              <AdminHero
                data={data.hero}
                onSave={(data) => handleSave('hero/1', data)}
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
        </main>
      </div>
    </div>
  );
}
