export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-center"
          style={{
            backgroundImage:
              "url(https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000)",
          }}
        />

        {/* Overlay - Enhanced for mobile readability */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/50 sm:from-black/30 sm:via-black/60 sm:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 sm:from-black/20 sm:to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 py-8 sm:py-0">
          <div
            className="text-center text-white w-full max-w-sm sm:max-w-2xl lg:max-w-4xl font-body"
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
            <p className="text-sm sm:text-lg mb-4 sm:mb-6 font-light tracking-wide px-2">
              Transforme sua paixão pelo streetwear em um negócio lucrativo
            </p>

            {/* Main Title */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-wider uppercase px-2">
              SEJA PARCEIRO
              <br />
              OFICIAL <span className="text-red-600">ECKO</span> E TENHA
              <br />
              SUCESSO
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed opacity-90 font-medium px-4 sm:px-0">
              Junte-se aos milhares de revendedores que já transformaram seus
              negócios com a marca mais desejada do streetwear brasileiro
            </p>

            {/* CTA Button */}
            <button className="font-display border-2 border-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-colors duration-300 flex items-center gap-2 mx-auto tracking-wide uppercase w-full max-w-xs sm:w-auto sm:max-w-none">
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
    </div>
  );
}
