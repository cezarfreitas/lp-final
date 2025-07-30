export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000)",
          }}
        />

        {/* Overlay - Multiple layers for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl font-body">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="bg-red-600 p-4 rounded-lg">
                <div className="text-white font-display font-bold text-2xl tracking-wider">ECKO</div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-lg mb-6 font-light tracking-wide">
              Transforme sua paixão pelo streetwear em um negócio lucrativo
            </p>

            {/* Main Title */}
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-wider uppercase">
              SEJA PARCEIRO<br />
              OFICIAL <span className="text-red-600">ECKO</span> E TENHA<br />
              SUCESSO
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90 font-medium">
              Junte-se aos milhares de revendedores que já transformaram seus negócios com a marca mais desejada do streetwear brasileiro
            </p>

            {/* CTA Button */}
            <button className="font-display border-2 border-red-600 text-white px-8 py-4 text-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 mx-auto tracking-wide uppercase">
              CONHECER OS BENEFÍCIOS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
