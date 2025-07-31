import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo ECKO */}
        <div className="mb-8">
          <img
            src="https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png"
            alt="Logo ECKO"
            className="h-16 w-auto mx-auto"
          />
        </div>

        {/* 404 */}
        <h1 className="font-display text-6xl sm:text-8xl font-bold text-red-600 mb-4">
          404
        </h1>

        {/* Mensagem */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-wider">
          Página não encontrada
        </h2>

        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>

        {/* Botão voltar */}
        <Link
          to="/"
          className="inline-block font-display bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-colors duration-300 uppercase tracking-wide rounded-lg"
        >
          Voltar ao início
        </Link>

        {/* Informações de contato */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Precisa de ajuda? Entre em contato:
          </p>
          <a
            href="https://wa.me/5511987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            WhatsApp: (11) 9 8765-4321
          </a>
        </div>
      </div>
    </div>
  );
}
