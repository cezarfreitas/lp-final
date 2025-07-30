export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000)",
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
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="bg-red-600 p-3 sm:p-4 rounded-lg">
                <div className="text-white font-display font-bold text-xl sm:text-2xl tracking-wider">
                  ECKO
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg mb-4 sm:mb-6 font-light tracking-wide">
              Transforme sua paixão pelo streetwear em um negócio lucrativo
            </p>

            {/* Main Title */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-wider uppercase">
              SEJA PARCEIRO
              <br />
              OFICIAL <span className="text-red-600">ECKO</span> E TENHA
              <br />
              SUCESSO
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed opacity-90 font-medium">
              Junte-se aos milhares de revendedores que já transformaram seus
              negócios com a marca mais desejada do streetwear brasileiro
            </p>

            {/* CTA Button */}
            <button className="font-display border-2 border-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto tracking-wide uppercase w-full max-w-xs sm:w-auto">
              <span className="hidden sm:inline">CONHECER OS BENEFÍCIOS</span>
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
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
              POR QUE SER PARCEIRO <span className="text-red-600">ECKO</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra as vantagens exclusivas que oferecemos aos nossos
              parceiros oficiais
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Benefit 1 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                MARGEM ALTA
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Lucre até 60% em cada produto vendido com preços exclusivos para
                parceiros oficiais
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                ENVIO NACIONAL
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Entregamos em todo Brasil com frete otimizado e prazos reduzidos
                para seus clientes
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                LANÇAMENTOS EXCLUSIVOS
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Tenha acesso antecipado às novas coleções e produtos exclusivos
                antes de todos
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v20M2 12h20"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                SUPORTE COMPLETO
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Equipe dedicada para ajudar com vendas, marketing e crescimento
                do seu negócio
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                MARCA CONSOLIDADA
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                20 anos de tradição no streetwear com reconhecimento nacional e
                credibilidade
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-700 transition-colors">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                MATERIAL DE APOIO
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Catálogos, fotos profissionais e materiais de divulgação para
                impulsionar suas vendas
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
              PRONTO PARA <span className="text-red-600">COMEÇAR</span>?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se aos mais de 5.000 parceiros que já faturam com a marca
              mais desejada do streetwear
            </p>
            <button className="font-display bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 uppercase tracking-wide">
              QUERO SER PARCEIRO AGORA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
