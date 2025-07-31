import { useState, useEffect } from 'react';

interface HeroData {
  logo_url: string;
  subtitle: string;
  main_title: string;
  description: string;
  cta_button_text: string;
  background_image_url: string;
}

export default function Index() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero');
      if (response.ok) {
        const data = await response.json();
        setHeroData(data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
      // Use fallback data if API fails
      setHeroData({
        logo_url: 'https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png',
        subtitle: 'Transforme sua paixão pelo streetwear em um negócio lucrativo',
        main_title: 'SEJA UM LOJISTA\nOFICIAL ECKO E TENHA\nos melhores produtos',
        description: 'Junte-se aos milhares de revendedores que já transformaram seus negócios com a marca mais desejada do streetwear brasileiro',
        cta_button_text: 'CONHECER OS BENEFÍCIOS',
        background_image_url: 'https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroData?.background_image_url || 'https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000'})`,
          }}
        />

        {/* Overlay - Enhanced for mobile readability */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 py-8 sm:py-0">
          <div
            className="text-center text-white w-full max-w-sm sm:max-w-2xl lg:max-w-4xl"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            {/* Logo */}
            {heroData?.logo_url && (
              <div className="mb-6 sm:mb-8 flex justify-center">
                <img
                  src={heroData.logo_url}
                  alt="Logo ECKO Oficial"
                  className="h-12 sm:h-16 w-auto"
                />
              </div>
            )}

            {/* Subtitle */}
            {heroData?.subtitle && (
              <p className="text-sm sm:text-lg mb-4 sm:mb-6 font-light tracking-wide">
                {heroData.subtitle}
              </p>
            )}

            {/* Main Title */}
            {heroData?.main_title && (
              <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-wider uppercase">
                {heroData.main_title.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.includes('ECKO') ? (
                      line.split('ECKO').map((part, i) => (
                        <span key={i}>
                          {part}
                          {i < line.split('ECKO').length - 1 && (
                            <span className="text-red-600">ECKO</span>
                          )}
                        </span>
                      ))
                    ) : (
                      line
                    )}
                    {index < heroData.main_title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
            )}

            {/* Description */}
            {heroData?.description && (
              <p className="text-sm sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed opacity-90 font-medium">
                {heroData.description}
              </p>
            )}

            {/* CTA Button */}
            {heroData?.cta_button_text && (
              <button
                onClick={() => {
                  document.getElementById("benefits")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="font-display border-2 border-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto tracking-wide uppercase w-full max-w-xs sm:w-auto"
              >
                <span className="hidden sm:inline">{heroData.cta_button_text}</span>
                <span className="sm:hidden">VER BENEFÍCIOS</span>
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Animated scroll arrow */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                document.getElementById("benefits")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="animate-bounce text-white hover:text-red-400 transition-colors duration-300"
              aria-label="Scroll para próxima seção"
            >
              <svg
                className="w-8 h-8 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Rest of the page - Benefits section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              POR QUE SER PARCEIRO ECKO?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Descubra as vantagens exclusivas que oferecemos aos nossos parceiros oficiais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">PROCESSO SIMPLES</h3>
              <p className="text-gray-600">Cadastro rápido e aprovação em até 24 horas</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SEM TAXAS INICIAIS</h3>
              <p className="text-gray-600">Comece sem investimento inicial ou taxas de adesão</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.458V6.5m0 7v4.042M2.458 12H6.5m7 0h4.042" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SUPORTE DEDICADO</h3>
              <p className="text-gray-600">Equipe especializada para te acompanhar em cada etapa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
