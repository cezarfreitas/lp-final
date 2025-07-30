import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  duration: string;
  rating: number;
  testimonial_text: string;
  avatar_letter: string;
  display_order: number;
  is_active: boolean;
}

interface AdminTestimonialsProps {
  data: Testimonial[];
  onSave: (endpoint: string, data: any, method?: 'PUT' | 'POST') => void;
}

export function AdminTestimonials({ data, onSave }: AdminTestimonialsProps) {
  const [testimonials, setTestimonials] = useState(data || []);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const handleSave = (testimonial: Testimonial) => {
    if (testimonial.id) {
      onSave(`testimonials/${testimonial.id}`, testimonial);
    } else {
      onSave('testimonials', testimonial, 'POST');
    }
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      onSave(`testimonials/${id}`, {}, 'DELETE' as any);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Depoimentos</h2>
        <button
          onClick={() => setEditing({
            id: 0,
            name: '',
            location: '',
            duration: '',
            rating: 5,
            testimonial_text: '',
            avatar_letter: '',
            display_order: testimonials.length + 1,
            is_active: true
          })}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Adicionar Depoimento
        </button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar_letter}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location} - {testimonial.duration}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 italic">"{testimonial.testimonial_text}"</p>
                <div className="flex items-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(testimonial)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editing.id ? 'Editar' : 'Adicionar'} Depoimento
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                  <input
                    type="text"
                    value={editing.location}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                  <input
                    type="text"
                    value={editing.duration}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, duration: e.target.value } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Lojista há 2 anos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Letra Avatar</label>
                  <input
                    type="text"
                    value={editing.avatar_letter}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, avatar_letter: e.target.value.charAt(0).toUpperCase() } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    maxLength={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento</label>
                <textarea
                  value={editing.testimonial_text}
                  onChange={(e) => setEditing(prev => prev ? { ...prev, testimonial_text: e.target.value } : null)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                  <select
                    value={editing.rating}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, rating: parseInt(e.target.value) } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n} estrela{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                  <input
                    type="number"
                    value={editing.display_order}
                    onChange={(e) => setEditing(prev => prev ? { ...prev, display_order: parseInt(e.target.value) } : null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
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
