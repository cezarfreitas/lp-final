import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

interface AdminFAQProps {
  data: FAQ[];
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminFAQ({ data, onSave }: AdminFAQProps) {
  const [faqs, setFaqs] = useState(data || []);
  const [editing, setEditing] = useState<FAQ | null>(null);

  const handleSave = (faq: FAQ) => {
    if (faq.id) {
      onSave(`faqs/${faq.id}`, faq);
    } else {
      onSave('faqs', faq, 'POST');
    }
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta pergunta?')) {
      onSave(`faqs/${id}`, {}, 'DELETE' as any);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">FAQ - Perguntas Frequentes</h2>
        <button
          onClick={() => setEditing({
            id: 0,
            question: '',
            answer: '',
            display_order: faqs.length + 1,
            is_active: true
          })}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Adicionar FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setEditing(faq)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              {editing.id ? 'Editar' : 'Adicionar'} FAQ
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
                <input
                  type="text"
                  value={editing.question}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, question: e.target.value } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                <textarea
                  value={editing.answer}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, answer: e.target.value } : null)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordem de Exibição</label>
                <input
                  type="number"
                  value={editing.display_order}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => editing && handleSave(editing)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
