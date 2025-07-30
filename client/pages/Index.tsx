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
            <button
              onClick={() => {
                document.getElementById('benefits')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="font-display border-2 border-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto tracking-wide uppercase w-full max-w-xs sm:w-auto"
            >
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

          {/* Animated scroll arrow */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                document.getElementById('benefits')?.scrollIntoView({
                  behavior: 'smooth'
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

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 bg-white">
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v20M2 12h20"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                SUPORTE COMPLETO
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Equipe dedicada para ajudar com vendas, marketing e crescimento
                do seu negócio
              </p>
            </div>

            {/* Benefit 5 */}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                MARCA CONSOLIDADA
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                20 anos de tradição no streetwear com reconhecimento nacional e
                credibilidade
              </p>
            </div>

            {/* Benefit 6 */}
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wide">
                MATERIAL DE APOIO
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
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

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase tracking-wider">
                COMECE SUA <span className="text-red-600">JORNADA</span> HOJE
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Transforme sua paixão pelo streetwear em uma fonte de renda consistente.
                Nossa equipe está pronta para te ajudar a dar os primeiros passos no mundo
                da revenda autorizada ECKO.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      PROCESSO SIMPLES
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Cadastro rápido e aprovação em até 24 horas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      SEM TAXAS INICIAIS
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Comece sem investimento inicial ou taxas de adesão
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      SUPORTE DEDICADO
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Equipe especializada para te acompanhar em cada etapa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-wider mb-2">
                  SOLICITE SEU ACESSO
                </h3>
                <p className="text-gray-600">
                  Preencha o formulário e nossa equipe entrará em contato
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Você é lojista com CNPJ? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lojista"
                        value="sim"
                        id="lojista-sim"
                        required
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                        onChange={(e) => {
                          const extraFields = document.getElementById('extra-fields');
                          const consumerMessage = document.getElementById('consumer-message');
                          const submitButton = document.getElementById('submit-button');
                          if (e.target.checked) {
                            if (extraFields) extraFields.style.display = 'block';
                            if (consumerMessage) consumerMessage.style.display = 'none';
                            if (submitButton) submitButton.style.display = 'block';
                          }
                        }}
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lojista"
                        value="nao"
                        required
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                        onChange={(e) => {
                          const extraFields = document.getElementById('extra-fields');
                          const consumerMessage = document.getElementById('consumer-message');
                          const submitButton = document.getElementById('submit-button');
                          if (e.target.checked) {
                            if (extraFields) extraFields.style.display = 'none';
                            if (consumerMessage) consumerMessage.style.display = 'block';
                            if (submitButton) submitButton.style.display = 'none';
                          }
                        }}
                      />
                      <span className="ml-2 text-gray-700">Não, sou consumidor</span>
                    </label>
                  </div>
                </div>

                {/* Campos extras para lojistas */}
                <div id="extra-fields" style={{ display: 'none' }} className="space-y-6">
                  <div>
                    <label htmlFor="store-type" className="block text-sm font-medium text-gray-700 mb-2">
                      Sua loja é? *
                    </label>
                    <select
                      id="store-type"
                      name="store-type"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="online">Online</option>
                      <option value="fisica">Física</option>
                      <option value="online-fisica">Online + Física</option>
                      <option value="midias-sociais">Vendo nas mídias sociais</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
                      Qual seu CEP? *
                    </label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-colors"
                      placeholder="00000-000"
                      maxLength={9}
                      onChange={(e) => {
                        // Formatação automática do CEP
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 5) {
                          value = value.substring(0, 5) + '-' + value.substring(5, 8);
                        }
                        e.target.value = value;
                      }}
                    />
                  </div>
                </div>

                {/* Mensagem para consumidores */}
                <div id="consumer-message" style={{ display: 'none' }} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <h4 className="font-display text-lg font-bold text-gray-900 uppercase tracking-wide">
                      ⚠️ CANAL EXCLUSIVO B2B
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Infelizmente este canal é só por <strong>atacado</strong>, mas caso queira receber um <strong className="text-red-600">cupom de 10% de desconto</strong> no site oficial da ECKO, clique em enviar que te mando agora!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // Aqui você pode adicionar a lógica para enviar o cupom
                        alert('Cupom enviado! Verifique seu WhatsApp em alguns minutos.');
                      }}
                      className="font-display bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-sm font-semibold transition-colors duration-300 uppercase tracking-wide rounded-lg"
                    >
                      QUERO O CUPOM DE 10%
                    </button>
                  </div>
                </div>

                <div id="submit-button" style={{ display: 'none' }}>
                  <button
                    type="submit"
                    className="w-full font-display bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 uppercase tracking-wide rounded-lg"
                  >
                    QUERO SER PARCEIRO AGORA
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Ao enviar, você concorda em receber contato da nossa equipe
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
