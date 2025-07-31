-- Schema para sistema de administração da Landing Page ECKO

-- Configurações gerais da página
CREATE TABLE IF NOT EXISTS page_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type ENUM('text', 'textarea', 'image', 'url', 'json') DEFAULT 'text',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Configurações de design (cores, fontes, etc)
CREATE TABLE IF NOT EXISTS design_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  primary_color VARCHAR(7) DEFAULT '#dc2626',
  secondary_color VARCHAR(7) DEFAULT '#000000',
  accent_color VARCHAR(7) DEFAULT '#ffffff',
  text_color VARCHAR(7) DEFAULT '#1f2937',
  background_color VARCHAR(7) DEFAULT '#f9fafb',
  font_primary VARCHAR(100) DEFAULT 'Inter',
  font_secondary VARCHAR(100) DEFAULT 'Roboto',
  font_sizes JSON,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seção Hero
CREATE TABLE IF NOT EXISTS hero_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  logo_url VARCHAR(500),
  subtitle TEXT,
  main_title TEXT NOT NULL,
  description TEXT,
  cta_button_text VARCHAR(100),
  background_image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Benefícios
CREATE TABLE IF NOT EXISTS benefits (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon_svg TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seção de benefícios (imagem e textos)
CREATE TABLE IF NOT EXISTS benefits_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section_title VARCHAR(200),
  section_subtitle TEXT,
  hero_image_url VARCHAR(500),
  hero_image_alt VARCHAR(200),
  success_title VARCHAR(200),
  success_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seção de contato/formulário
CREATE TABLE IF NOT EXISTS contact_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section_title VARCHAR(200),
  section_description TEXT,
  form_title VARCHAR(200),
  form_description TEXT,
  consumer_message_title VARCHAR(200),
  consumer_message_text TEXT,
  consumer_button_text VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Características do processo (na seção de contato)
CREATE TABLE IF NOT EXISTS process_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon_svg TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  duration VARCHAR(100),
  rating INT DEFAULT 5,
  testimonial_text TEXT NOT NULL,
  avatar_letter CHAR(1),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Galeria de produtos
CREATE TABLE IF NOT EXISTS product_gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  product_category VARCHAR(100),
  image_url VARCHAR(500) NOT NULL,
  image_alt VARCHAR(200),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Showroom
CREATE TABLE IF NOT EXISTS showroom_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  image_alt VARCHAR(200),
  image_title VARCHAR(200),
  image_description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seção do showroom
CREATE TABLE IF NOT EXISTS showroom_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section_title VARCHAR(200),
  section_description TEXT,
  cta_button_text VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Footer/Redes sociais
CREATE TABLE IF NOT EXISTS social_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon_svg TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Footer
CREATE TABLE IF NOT EXISTS footer_section (
  id INT PRIMARY KEY AUTO_INCREMENT,
  logo_url VARCHAR(500),
  about_text TEXT,
  social_title VARCHAR(200),
  social_description TEXT,
  copyright_text VARCHAR(200),
  developer_text VARCHAR(200),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Links rápidos do footer
CREATE TABLE IF NOT EXISTS quick_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  link_text VARCHAR(100) NOT NULL,
  link_url VARCHAR(500),
  link_target VARCHAR(50) DEFAULT '_self',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Upload de arquivos
CREATE TABLE IF NOT EXISTS uploaded_files (
  id INT PRIMARY KEY AUTO_INCREMENT,
  original_name VARCHAR(500) NOT NULL,
  filename VARCHAR(500) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INT,
  mime_type VARCHAR(100),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO hero_section (logo_url, subtitle, main_title, description, cta_button_text, background_image_url) VALUES 
('https://www.ntktextil.com.br/wp-content/uploads/2022/08/Logo-Ecko.png', 
'Transforme sua paixão pelo streetwear em um negócio lucrativo', 
'SEJA UM LOJISTA\nOFICIAL ECKO E TENHA\nos melhores produtos', 
'Junte-se aos milhares de revendedores que já transformaram seus negócios com a marca mais desejada do streetwear brasileiro', 
'CONHECER OS BENEFÍCIOS', 
'https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000');

INSERT INTO benefits (title, description, icon_svg, display_order) VALUES 
('MARGEM ALTA', 'Lucre até 60% em cada produto vendido com preços exclusivos para parceiros oficiais', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />', 1),
('ENVIO NACIONAL', 'Entregamos em todo Brasil com frete otimizado e prazos reduzidos para seus clientes', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />', 2),
('LANÇAMENTOS EXCLUSIVOS', 'Tenha acesso antecipado às novas coleções e produtos exclusivos antes de todos', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 10V3L4 14h7v7l9-11h-7z" />', 3),
('SUPORTE COMPLETO', 'Equipe dedicada para ajudar com vendas, marketing e crescimento do seu negócio', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v20M2 12h20" />', 4);

INSERT INTO benefits_section (section_title, section_subtitle, hero_image_url, hero_image_alt, success_title, success_description) VALUES 
('POR QUE SER PARCEIRO ECKO?', 
'Descubra as vantagens exclusivas que oferecemos aos nossos parceiros oficiais', 
'https://cdn.builder.io/api/v1/image/assets%2F3a038822502b49b39691cbaf44da5f95%2F34298f64f7774ba9ba1c7a2036028b45?format=webp&width=600', 
'Lojista ECKO oficial bem-sucedido vendendo streetwear brasileiro com margem alta e suporte completo', 
'SUCESSO GARANTIDO', 
'Junte-se aos milhares de parceiros que já transformaram suas vidas com a ECKO');
