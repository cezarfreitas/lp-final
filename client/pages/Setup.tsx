import { useState } from 'react';

export default function Setup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [dbStatus, setDbStatus] = useState<any>(null);

  const initializeDatabase = async () => {
    try {
      setStatus('loading');
      setMessage('Inicializando banco de dados...');

      const response = await fetch('/api/setup/init-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Setup API Error:', response.status, response.statusText, errorText);
        throw new Error(`Erro HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(`Banco inicializado com sucesso! ${result.tablesCreated} tabelas criadas, ${result.recordsInserted} registros inseridos.`);
        await checkDatabaseStatus();
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }
    } catch (error) {
      setStatus('error');
      console.error('Database initialization error:', error);

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setMessage('Erro de conexão: Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
      } else {
        setMessage(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    }
  };

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/setup/status');

      if (!response.ok) {
        console.warn('Setup status endpoint returned:', response.status, response.statusText);
        return;
      }

      const result = await response.json();

      if (result.success) {
        setDbStatus(result);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      // Don't show error to user for status check, it's optional
    }
  };

  const testConnection = async () => {
    try {
      setMessage('Testando conexão com servidor...');
      const response = await fetch('/api/setup/test');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setMessage(`✅ Conexão OK: ${result.message}`);
    } catch (error) {
      setMessage(`❌ Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  useState(() => {
    checkDatabaseStatus();
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <img 
            src="https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png"
            alt="ECKO Logo"
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Inicial - Sistema Admin ECKO
          </h1>
          <p className="text-gray-600">
            Configure o banco de dados para começar a usar o sistema de administração
          </p>
        </div>

        {/* Database Status */}
        {dbStatus && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Status do Banco de Dados</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Tabelas encontradas:</span>
                <span className="ml-2 font-medium">{dbStatus.tables}</span>
              </div>
              {dbStatus.recordCounts && Object.entries(dbStatus.recordCounts).map(([table, count]) => (
                <div key={table}>
                  <span className="text-gray-600">{table}:</span>
                  <span className="ml-2 font-medium">{count as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={initializeDatabase}
            disabled={status === 'loading'}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {status === 'loading' ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Inicializando...
              </div>
            ) : (
              'Inicializar Banco de Dados'
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={checkDatabaseStatus}
              className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Verificar Status
            </button>
            <button
              onClick={testConnection}
              className="py-2 px-4 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50"
            >
              Testar Conexão
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg ${
            status === 'success' ? 'bg-green-50 border border-green-200' :
            status === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${
              status === 'success' ? 'text-green-800' :
              status === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {message}
            </p>
          </div>
        )}

        {/* Navigation */}
        {status === 'success' && (
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/admin"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Ir para Admin
            </a>
            <a
              href="/"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Ver Landing Page
            </a>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>Este setup criará todas as tabelas necessárias e inserirá dados iniciais.</p>
          <p>Execute apenas uma vez ou quando precisar resetar o banco.</p>
        </div>
      </div>
    </div>
  );
}
