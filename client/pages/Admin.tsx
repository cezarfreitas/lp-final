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
        const errorText = await response.text();
        console.error('API Error:', response.status, response.statusText, errorText);

        // Check if this is a database initialization issue
        if (response.status === 500 && errorText.includes('ER_NO_SUCH_TABLE')) {
          // Database tables don't exist, redirect to setup
          window.location.href = '/setup';
          return;
        }

        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
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
      const response = await fetch(`/api/admin/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save data');
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
      
      // Refresh data
      await fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'benefits', label: 'Benefícios', icon: '⭐' },
    { id: 'testimonials', label: 'Depoimentos', icon: '💬' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'gallery', label: 'Galeria', icon: '🖼️' },
    { id: 'showroom', label: 'Showroom', icon: '🏢' },
    { id: 'footer', label: 'Footer', icon: '📄' },
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
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Erro ao carregar dados</p>
          <button 
            onClick={fetchData}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png"
                alt="ECKO Admin"
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
            </div>
            
            {/* Save Status */}
            <div className="flex items-center space-x-4">
              {saveStatus === 'saving' && (
                <div className="flex items-center text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Salvando...
                </div>
              )}
              {saveStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Salvo com sucesso!
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Erro ao salvar
                </div>
              )}
              <a 
                href="/" 
                target="_blank" 
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Ver Site 🔗
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${ 
                      activeTab === tab.id
                        ? 'bg-red-100 text-red-700 border-l-4 border-red-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
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
        </main>
      </div>
    </div>
  );
}
