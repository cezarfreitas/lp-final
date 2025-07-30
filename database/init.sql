-- Usar o banco correto
USE `lp-ecko-db`;

-- Inserir dados iniciais se não existirem

-- Hero Section
INSERT IGNORE INTO hero_section (id, logo_url, subtitle, main_title, description, cta_button_text, background_image_url) VALUES 
(1, 'https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png', 
'Transforme sua paixão pelo streetwear em um negócio lucrativo', 
'SEJA UM LOJISTA\nOFICIAL ECKO E TENHA\nos melhores produtos', 
'Junte-se aos milhares de revendedores que já transformaram seus negócios com a marca mais desejada do streetwear brasileiro', 
'CONHECER OS BENEFÍCIOS', 
'https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000');

-- Benefits Section
INSERT IGNORE INTO benefits_section (id, section_title, section_subtitle, hero_image_url, hero_image_alt, success_title, success_description) VALUES 
(1, 'POR QUE SER PARCEIRO ECKO?', 
'Descubra as vantagens exclusivas que oferecemos aos nossos parceiros oficiais', 
'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 
'Lojista ECKO oficial bem-sucedido vendendo streetwear brasileiro com margem alta e suporte completo', 
'SUCESSO GARANTIDO', 
'Junte-se aos milhares de parceiros que já transformaram suas vidas com a ECKO');

-- Contact Section
INSERT IGNORE INTO contact_section (id, section_title, section_description, form_title, form_description, consumer_message_title, consumer_message_text, consumer_button_text) VALUES 
(1, 'COMO SE TORNAR UM LOJISTA OFICIAL ECKO', 
'Transforme sua paixão pelo streetwear em uma fonte de renda consistente. Nossa equipe está pronta para te ajudar a dar os primeiros passos no mundo da revenda autorizada ECKO.', 
'CADASTRO LOJISTA OFICIAL ECKO', 
'Preencha o formulário e nossa equipe entrará em contato', 
'⚠️ CANAL EXCLUSIVO B2B', 
'Infelizmente este canal é só por atacado, mas caso queira receber um cupom de 10% de desconto no site oficial da ECKO, clique em enviar que te mando agora!', 
'QUERO O CUPOM DE 10%');

-- Process Features
INSERT IGNORE INTO process_features (title, description, display_order) VALUES 
('PROCESSO SIMPLES', 'Cadastro rápido e aprovação em até 24 horas', 1),
('SEM TAXAS INICIAIS', 'Comece sem investimento inicial ou taxas de adesão', 2),
('SUPORTE DEDICADO', 'Equipe especializada para te acompanhar em cada etapa', 3);

-- Testimonials
INSERT IGNORE INTO testimonials (name, location, duration, rating, testimonial_text, avatar_letter, display_order) VALUES 
('MARCOS SILVA', 'São Paulo/SP', 'Lojista há 2 anos', 5, 'Comecei vendendo para amigos e hoje tenho uma loja online que fatura R$ 15mil por mês. A ECKO mudou minha vida!', 'M', 1),
('ANA COSTA', 'Rio de Janeiro/RJ', 'Lojista há 3 anos', 5, 'Tenho loja física e online. A qualidade dos produtos e o suporte da equipe são excepcionais. Recomendo!', 'A', 2),
('RAFAEL MENDES', 'Belo Horizonte/MG', 'Lojista há 1 ano', 5, 'Sempre quis empreender e com a ECKO consegui realizar esse sonho. Processo simples e lucrativo!', 'R', 3);

-- FAQs
INSERT IGNORE INTO faqs (question, answer, display_order) VALUES 
('Preciso ter CNPJ para ser parceiro?', 'Sim, para ser um parceiro oficial ECKO você precisa ter CNPJ ativo. Isso garante que você possa revender nossos produtos com todas as vantagens e suporte necessários para o crescimento do seu negócio.', 1),
('Qual o valor mínimo para começar?', 'Não há valor mínimo obrigatório para se tornar parceiro. Você pode começar com o pedido que se adequar ao seu orçamento. Oferecemos condições especiais de pagamento e prazos flexíveis para facilitar o início da sua operação.', 2),
('Como funciona o processo de aprovação?', 'Após o preenchimento do formulário, nossa equipe comercial entrará em contato em até 24 horas. Fazemos uma análise rápida dos seus dados e, sendo aprovado, você já pode fazer seu primeiro pedido e começar a vender.', 3),
('Quais são as formas de pagamento?', 'Aceitamos diversas formas de pagamento: cartão de crédito (até 6x), PIX com desconto, boleto bancário e transferência. Para parceiros antigos, oferecemos também condições especiais de prazo para pagamento.', 4),
('Vocês entregam em todo Brasil?', 'Sim! Atendemos todo o território nacional. Temos parcerias com as principais transportadoras para garantir entregas rápidas e seguras. Os prazos variam de acordo com a região, mas sempre buscamos a melhor opção custo-benefício.', 5),
('Que tipo de suporte vocês oferecem?', 'Oferecemos suporte completo: equipe comercial dedicada, materiais de divulgação, fotos profissionais dos produtos, orientações de vendas e marketing digital. Nosso objetivo é o seu sucesso como parceiro ECKO.', 6);

-- Product Gallery (exemplos)
INSERT IGNORE INTO product_gallery (product_name, product_category, image_url, image_alt, display_order) VALUES 
('Camiseta ECKO', 'Streetwear Autêntico', 'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=400', 'Camiseta ECKO streetwear para revenda oficial - lojista autorizado', 1),
('Moletom ECKO', 'Conforto e Estilo', 'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=400', 'Moletom ECKO premium para lojistas oficiais - atacado streetwear', 2),
('Boné ECKO', 'Acessório Essencial', 'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=400', 'Boné ECKO original para revenda autorizada - acessório streetwear', 3),
('Calça ECKO', 'Estilo Urbano', 'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=400', 'Calça ECKO style para lojistas oficiais - atacado moda urbana', 4);

-- Showroom Section
INSERT IGNORE INTO showroom_section (id, section_title, section_description, cta_button_text) VALUES 
(1, 'CONHEÇA NOSSO SHOWROOM', 
'Visite nosso showroom e conheça de perto toda a qualidade e diversidade dos produtos ECKO. Um espaço moderno e inspirador onde você pode vivenciar o universo da marca.', 
'AGENDAR VISITA');

-- Showroom Images
INSERT IGNORE INTO showroom_images (image_url, image_alt, image_title, image_description, display_order) VALUES 
('https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 'Showroom ECKO fachada em São Paulo para lojistas oficiais visitarem', 'Fachada do Showroom', 'Design moderno no coração de São Paulo', 1),
('https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 'Interior do showroom ECKO com produtos para lojistas conhecerem', 'Espaço Interno', 'Ambiente amplo e organizado para melhor experiência', 2),
('https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 'Exposição de produtos ECKO no showroom para futuros lojistas oficiais', 'Exposição de Produtos', 'Toda coleção disponível para análise', 3),
('https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 'Área de atendimento especializado para lojistas ECKO no showroom', 'Área de Atendimento', 'Consultoria especializada para parceiros', 4);

-- Footer Section
INSERT IGNORE INTO footer_section (id, logo_url, about_text, social_title, social_description, copyright_text, developer_text) VALUES 
(1, 'https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png', 
'20 anos de tradição no streetwear brasileiro. A marca que transforma paixão em negócio lucrativo.', 
'SIGA A ECKO', 
'Nos siga para novidades e lançamentos', 
'© 2024 ECKO Brasil. Todos os direitos reservados.', 
'Desenvolvido com ❤️ pela equipe ECKO Digital');

-- Social Links
INSERT IGNORE INTO social_links (platform, url) VALUES 
('Instagram', 'https://instagram.com/ecko'),
('Facebook', 'https://facebook.com/ecko'),
('WhatsApp', 'https://wa.me/5511987654321'),
('YouTube', 'https://youtube.com/ecko');

-- Quick Links
INSERT IGNORE INTO quick_links (link_text, link_url, display_order) VALUES 
('Benefícios', '#benefits', 1),
('Como funciona', '#', 2),
('Depoimentos', '#', 3),
('Showroom', '#', 4);
