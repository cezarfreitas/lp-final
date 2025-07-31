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
              <img
                src="https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png"
                alt="Logo ECKO Oficial"
                className="h-12 sm:h-16 w-auto"
              />
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg mb-4 sm:mb-6 font-light tracking-wide">
              Transforme sua paixão pela Ecko em um negócio lucrativo
            </p>

            {/* Main Title */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-wider uppercase">
              SEJA UM LOJISTA
              <br />
              OFICIAL <span className="text-red-600">ECKO</span> E TENHA
              <br />
              SUCESSO NO STREETWEAR
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

          {/* Benefits Layout - Mobile: 2 cols, Desktop: 4 cards + image */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - 4 Benefits Cards (Desktop) */}
            <div className="lg:order-1 order-2 col-span-2 lg:col-span-1">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-8">
                {/* Benefit 1 */}
                <div className="lg:flex lg:items-start lg:text-left text-center group hover:transform hover:scale-105 transition-all duration-300 lg:gap-4">
                  <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto lg:mx-0 mb-4 lg:mb-0 group-hover:bg-red-700 transition-colors lg:flex-shrink-0">
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
                  <div className="lg:flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      MARGEM ALTA
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Lucre até 60% em cada produto vendido com preços
                      exclusivos para parceiros oficiais
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="lg:flex lg:items-start lg:text-left text-center group hover:transform hover:scale-105 transition-all duration-300 lg:gap-4">
                  <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto lg:mx-0 mb-4 lg:mb-0 group-hover:bg-red-700 transition-colors lg:flex-shrink-0">
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
                  <div className="lg:flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      ENVIO NACIONAL
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Entregamos em todo Brasil com frete otimizado e prazos
                      reduzidos para seus clientes
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="lg:flex lg:items-start lg:text-left text-center group hover:transform hover:scale-105 transition-all duration-300 lg:gap-4">
                  <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto lg:mx-0 mb-4 lg:mb-0 group-hover:bg-red-700 transition-colors lg:flex-shrink-0">
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
                  <div className="lg:flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      LANÇAMENTOS EXCLUSIVOS
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Tenha acesso antecipado às novas coleções e produtos
                      exclusivos antes de todos
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="lg:flex lg:items-start lg:text-left text-center group hover:transform hover:scale-105 transition-all duration-300 lg:gap-4">
                  <div className="bg-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto lg:mx-0 mb-4 lg:mb-0 group-hover:bg-red-700 transition-colors lg:flex-shrink-0">
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
                  <div className="lg:flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      SUPORTE COMPLETO
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Equipe dedicada para ajudar com vendas, marketing e
                      crescimento do seu negócio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image (Desktop) */}
            <div className="lg:order-2 order-1 col-span-2 lg:col-span-1">
              <div className="relative group">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600"
                  alt="Lojista ECKO oficial bem-sucedido vendendo streetwear brasileiro com margem alta e suporte completo"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display font-bold text-lg uppercase tracking-wider mb-2">
                    SUCESSO GARANTIDO
                  </h3>
                  <p className="text-sm opacity-90">
                    Junte-se aos milhares de parceiros que já transformaram suas
                    vidas com a ECKO
                  </p>
                </div>
              </div>
            </div>
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
                COMO SE TORNAR UM{" "}
                <span className="text-red-600">LOJISTA OFICIAL</span> ECKO
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
                    <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      PROCESSO SIMPLES
                    </h3>
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
                    <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      SEM TAXAS INICIAIS
                    </h3>
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
                    <h3 className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">
                      SUPORTE DEDICADO
                    </h3>
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
                  CADASTRO LOJISTA OFICIAL ECKO
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
                        // Formatação automática do CEP
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

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo and About */}
            <div className="space-y-4">
              <img
                src="https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png"
                alt="Logo ECKO Oficial"
                className="h-10 w-auto"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                20 anos de tradição no streetwear brasileiro. A marca que
                transforma paixão em negócio lucrativo.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white uppercase tracking-wide text-sm">
                LINKS RÁPIDOS
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#benefits"
                    className="text-gray-300 text-sm hover:text-red-400 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("benefits")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Benefícios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 text-sm hover:text-red-400 transition-colors duration-200"
                  >
                    Como funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 text-sm hover:text-red-400 transition-colors duration-200"
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 text-sm hover:text-red-400 transition-colors duration-200"
                  >
                    Showroom
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white uppercase tracking-wide text-sm">
                SIGA A ECKO
              </h4>
              <div className="flex space-x-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/ecko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguir ECKO no Instagram"
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.988-5.366 11.988-11.99C24.005 5.367 18.641.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297A4.821 4.821 0 013.822 12.4c0-1.297.49-2.448 1.297-3.33A4.821 4.821 0 018.45 7.773c1.297 0 2.448.49 3.33 1.297A4.821 4.821 0 0113.077 12.4c0 1.297-.49 2.448-1.297 3.33-.882.808-2.033 1.258-3.33 1.258zm7.598 0c-1.297 0-2.448-.49-3.33-1.297A4.821 4.821 0 0111.42 12.4c0-1.297.49-2.448 1.297-3.33A4.821 4.821 0 0116.047 7.773c1.297 0 2.448.49 3.33 1.297A4.821 4.821 0 0120.674 12.4c0 1.297-.49 2.448-1.297 3.33-.882.808-2.033 1.258-3.33 1.258z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/ecko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Curtir ECKO no Facebook"
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5511987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Entrar em contato via WhatsApp"
                  className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/ecko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inscrever-se no canal ECKO no YouTube"
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-300">
                  Nos siga para novidades e lançamentos
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-sm text-gray-400">
              © 2024 ECKO Brasil. Todos os direitos reservados.
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Desenvolvido com ❤️ pela equipe ECKO Digital
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
