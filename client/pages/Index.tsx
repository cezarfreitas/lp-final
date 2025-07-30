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
                document.getElementById("benefits")?.scrollIntoView({
                  behavior: "smooth",
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
                Transforme sua paixão pelo streetwear em uma fonte de renda
                consistente. Nossa equipe está pronta para te ajudar a dar os
                primeiros passos no mundo da revenda autorizada ECKO.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
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
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
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
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                          const extraFields =
                            document.getElementById("extra-fields");
                          const consumerMessage =
                            document.getElementById("consumer-message");
                          const submitButton =
                            document.getElementById("submit-button");
                          if (e.target.checked) {
                            if (extraFields)
                              extraFields.style.display = "block";
                            if (consumerMessage)
                              consumerMessage.style.display = "none";
                            if (submitButton)
                              submitButton.style.display = "block";
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
                          const extraFields =
                            document.getElementById("extra-fields");
                          const consumerMessage =
                            document.getElementById("consumer-message");
                          const submitButton =
                            document.getElementById("submit-button");
                          if (e.target.checked) {
                            if (extraFields) extraFields.style.display = "none";
                            if (consumerMessage)
                              consumerMessage.style.display = "block";
                            if (submitButton)
                              submitButton.style.display = "none";
                          }
                        }}
                      />
                      <span className="ml-2 text-gray-700">
                        Não, sou consumidor
                      </span>
                    </label>
                  </div>
                </div>

                {/* Campos extras para lojistas */}
                <div
                  id="extra-fields"
                  style={{ display: "none" }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="store-type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
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
                      <option value="midias-sociais">
                        Vendo nas mídias sociais
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="cep"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
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
                        // Formata��ão automática do CEP
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 5) {
                          value =
                            value.substring(0, 5) + "-" + value.substring(5, 8);
                        }
                        e.target.value = value;
                      }}
                    />
                  </div>
                </div>

                {/* Mensagem para consumidores */}
                <div
                  id="consumer-message"
                  style={{ display: "none" }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                >
                  <div className="text-center space-y-4">
                    <h4 className="font-display text-lg font-bold text-gray-900 uppercase tracking-wide">
                      ⚠️ CANAL EXCLUSIVO B2B
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Infelizmente este canal é só por <strong>atacado</strong>,
                      mas caso queira receber um{" "}
                      <strong className="text-red-600">
                        cupom de 10% de desconto
                      </strong>{" "}
                      no site oficial da ECKO, clique em enviar que te mando
                      agora!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // Aqui você pode adicionar a lógica para enviar o cupom
                        alert(
                          "Cupom enviado! Verifique seu WhatsApp em alguns minutos.",
                        );
                      }}
                      className="font-display bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-sm font-semibold transition-colors duration-300 uppercase tracking-wide rounded-lg"
                    >
                      QUERO O CUPOM DE 10%
                    </button>
                  </div>
                </div>

                <div id="submit-button" style={{ display: "none" }}>
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

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
              O QUE DIZEM NOSSOS <span className="text-red-600">PARCEIROS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Histórias reais de quem transformou paixão em lucro com a ECKO
            </p>
          </div>

          {/* Desktop: 3 columns, Mobile: Carousel */}
          <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide">
                      MARCOS SILVA
                    </h4>
                    <p className="text-sm text-gray-600">
                      São Paulo/SP - Lojista há 2 anos
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Comecei vendendo para amigos e hoje tenho uma loja online que
                  fatura R$ 15mil por mês. A ECKO mudou minha vida!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide">
                      ANA COSTA
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rio de Janeiro/RJ - Lojista há 3 anos
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Tenho loja física e online. A qualidade dos produtos e o
                  suporte da equipe são excepcionais. Recomendo!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    R
                  </div>
                  <div className="ml-4">
                    <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide">
                      RAFAEL MENDES
                    </h4>
                    <p className="text-sm text-gray-600">
                      Belo Horizonte/MG - Lojista há 1 ano
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Sempre quis empreender e com a ECKO consegui realizar esse
                  sonho. Processo simples e lucrativo!"
                </p>
              </div>
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden">
              <div className="overflow-hidden">
                <div
                  id="testimonials-carousel"
                  className="flex transition-transform duration-300 ease-in-out"
                >
                  {/* Testimonial 1 - Mobile */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          M
                        </div>
                        <div className="ml-4">
                          <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                            MARCOS SILVA
                          </h4>
                          <p className="text-xs text-gray-600">
                            São Paulo/SP - Lojista há 2 anos
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-sm">
                        "Comecei vendendo para amigos e hoje tenho uma loja
                        online que fatura R$ 15mil por mês. A ECKO mudou minha
                        vida!"
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 2 - Mobile */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          A
                        </div>
                        <div className="ml-4">
                          <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                            ANA COSTA
                          </h4>
                          <p className="text-xs text-gray-600">
                            Rio de Janeiro/RJ - Lojista há 3 anos
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-sm">
                        "Tenho loja física e online. A qualidade dos produtos e
                        o suporte da equipe são excepcionais. Recomendo!"
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 3 - Mobile */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          R
                        </div>
                        <div className="ml-4">
                          <h4 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                            RAFAEL MENDES
                          </h4>
                          <p className="text-xs text-gray-600">
                            Belo Horizonte/MG - Lojista há 1 ano
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-sm">
                        "Sempre quis empreender e com a ECKO consegui realizar
                        esse sonho. Processo simples e lucrativo!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  id="prev-btn"
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                  onClick={() => {
                    const carousel = document.getElementById(
                      "testimonials-carousel",
                    );
                    const currentTransform =
                      carousel?.style.transform || "translateX(0%)";
                    const currentValue = parseInt(
                      currentTransform.match(/-?\d+/) || ["0"],
                    );
                    const newValue =
                      currentValue >= 0 ? -200 : currentValue + 100;
                    if (carousel)
                      carousel.style.transform = `translateX(${newValue}%)`;
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  <button
                    className="w-3 h-3 rounded-full bg-red-600"
                    onClick={() => {
                      const carousel = document.getElementById(
                        "testimonials-carousel",
                      );
                      if (carousel) carousel.style.transform = "translateX(0%)";
                    }}
                  ></button>
                  <button
                    className="w-3 h-3 rounded-full bg-gray-300"
                    onClick={() => {
                      const carousel = document.getElementById(
                        "testimonials-carousel",
                      );
                      if (carousel)
                        carousel.style.transform = "translateX(-100%)";
                    }}
                  ></button>
                  <button
                    className="w-3 h-3 rounded-full bg-gray-300"
                    onClick={() => {
                      const carousel = document.getElementById(
                        "testimonials-carousel",
                      );
                      if (carousel)
                        carousel.style.transform = "translateX(-200%)";
                    }}
                  ></button>
                </div>

                <button
                  id="next-btn"
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                  onClick={() => {
                    const carousel = document.getElementById(
                      "testimonials-carousel",
                    );
                    const currentTransform =
                      carousel?.style.transform || "translateX(0%)";
                    const currentValue = parseInt(
                      currentTransform.match(/-?\d+/) || ["0"],
                    );
                    const newValue =
                      currentValue <= -200 ? 0 : currentValue - 100;
                    if (carousel)
                      carousel.style.transform = `translateX(${newValue}%)`;
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
              PERGUNTAS <span className="text-red-600">FREQUENTES</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre como se tornar um parceiro oficial ECKO
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Preciso ter CNPJ para ser parceiro?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Sim, para ser um parceiro oficial ECKO você precisa ter CNPJ
                  ativo. Isso garante que você possa revender nossos produtos
                  com todas as vantagens e suporte necessários para o
                  crescimento do seu negócio.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Qual o valor mínimo para começar?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Não há valor mínimo obrigatório para se tornar parceiro. Você
                  pode começar com o pedido que se adequar ao seu orçamento.
                  Oferecemos condições especiais de pagamento e prazos flexíveis
                  para facilitar o início da sua operação.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Como funciona o processo de aprovação?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Após o preenchimento do formulário, nossa equipe comercial
                  entrará em contato em até 24 horas. Fazemos uma análise rápida
                  dos seus dados e, sendo aprovado, você já pode fazer seu
                  primeiro pedido e começar a vender.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Quais são as formas de pagamento?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Aceitamos diversas formas de pagamento: cartão de crédito (até
                  6x), PIX com desconto, boleto bancário e transferência. Para
                  parceiros antigos, oferecemos também condições especiais de
                  prazo para pagamento.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Vocês entregam em todo Brasil?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Sim! Atendemos todo o território nacional. Temos parcerias com
                  as principais transportadoras para garantir entregas rápidas e
                  seguras. Os prazos variam de acordo com a região, mas sempre
                  buscamos a melhor opção custo-benefício.
                </p>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  const content = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  const icon = e.currentTarget.querySelector(
                    ".faq-icon",
                  ) as HTMLElement;
                  if (content && icon) {
                    const isOpen = content.style.display !== "none";
                    content.style.display = isOpen ? "none" : "block";
                    icon.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }
                }}
              >
                <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm sm:text-base">
                  Que tipo de suporte vocês oferecem?
                </h3>
                <svg
                  className="w-5 h-5 text-red-600 transition-transform duration-200 faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="px-6 pb-4 text-gray-700"
                style={{ display: "none" }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  Oferecemos suporte completo: equipe comercial dedicada,
                  materiais de divulgação, fotos profissionais dos produtos,
                  orientações de vendas e marketing digital. Nosso objetivo é o
                  seu sucesso como parceiro ECKO.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
              AINDA TEM DÚVIDAS?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para te ajudar
            </p>
            <button
              onClick={() => {
                document.getElementById("benefits")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="font-display bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-colors duration-300 uppercase tracking-wide rounded-lg"
            >
              FALAR COM CONSULTOR
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
