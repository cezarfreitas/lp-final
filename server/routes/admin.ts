import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import {
  findMany,
  findOne,
  insertRecord,
  updateRecord,
  deleteRecord,
  executeQuery
} from '../lib/database.js';

const router = Router();

// Logging middleware for all admin routes
router.use((req, res, next) => {
  console.log(`Admin API: ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = 'public/uploads';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  }
});

// File upload endpoint
router.post('/upload', (req, res, next) => {
  // Add CORS headers for file upload
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    console.log('File uploaded successfully:', {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: fileUrl
    });

    // Optionally save to database, but don't fail if it doesn't work
    try {
      const fileData = {
        original_name: req.file.originalname,
        filename: req.file.filename,
        file_path: req.file.path,
        file_size: req.file.size,
        mime_type: req.file.mimetype,
        file_url: fileUrl
      };
      await insertRecord('uploaded_files', fileData);
      console.log('File info saved to database');
    } catch (dbError) {
      console.warn('Could not save file info to database:', dbError);
      // Continue without failing
    }

    res.json({
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Hero Section APIs
router.get('/hero', async (req: Request, res: Response) => {
  try {
    const hero = await findOne('hero_section', { is_active: true });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero data' });
  }
});

router.put('/hero/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    console.log(`Updating hero section ${id}:`, data);

    // Check if hero exists, if not create it
    const existing = await findOne('hero_section', { id });
    if (!existing) {
      // Create new hero with default data
      const newHero = {
        id,
        logo_url: data.logo_url || '',
        subtitle: data.subtitle || '',
        main_title: data.main_title || '',
        description: data.description || '',
        cta_button_text: data.cta_button_text || '',
        background_image_url: data.background_image_url || '',
        is_active: true
      };
      await insertRecord('hero_section', newHero);
      console.log(`Hero section ${id} created successfully`);
    } else {
      await updateRecord('hero_section', data, { id });
      console.log(`Hero section ${id} updated successfully`);
    }

    res.json({ message: 'Hero section saved successfully' });
  } catch (error) {
    console.error(`Failed to update hero section ${req.params.id}:`, error);
    res.status(500).json({
      error: 'Failed to update hero section',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Benefits APIs
router.get('/benefits', async (req: Request, res: Response) => {
  try {
    const benefits = await findMany('benefits', { is_active: true }, 'display_order ASC');
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch benefits' });
  }
});

router.post('/benefits', async (req: Request, res: Response) => {
  try {
    console.log('Creating benefit:', req.body);
    const result = await insertRecord('benefits', req.body);
    console.log('Benefit created with ID:', result.insertId);
    res.json({ id: result.insertId, message: 'Benefit created successfully' });
  } catch (error) {
    console.error('Failed to create benefit:', error);
    res.status(500).json({
      error: 'Failed to create benefit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.put('/benefits/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`Updating benefit ${id}:`, req.body);
    await updateRecord('benefits', req.body, { id });
    console.log(`Benefit ${id} updated successfully`);
    res.json({ message: 'Benefit updated successfully' });
  } catch (error) {
    console.error(`Failed to update benefit ${req.params.id}:`, error);
    res.status(500).json({
      error: 'Failed to update benefit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.delete('/benefits/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('benefits', { id });
    res.json({ message: 'Benefit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete benefit' });
  }
});

// Benefits Section APIs
router.get('/benefits-section', async (req: Request, res: Response) => {
  try {
    const section = await findOne('benefits_section', { is_active: true });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch benefits section' });
  }
});

router.put('/benefits-section/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('benefits_section', req.body, { id });
    res.json({ message: 'Benefits section updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update benefits section' });
  }
});

// Contact Section APIs
router.get('/contact-section', async (req: Request, res: Response) => {
  try {
    const section = await findOne('contact_section', { is_active: true });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact section' });
  }
});

router.put('/contact-section/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('contact_section', req.body, { id });
    res.json({ message: 'Contact section updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact section' });
  }
});

// Process Features APIs
router.get('/process-features', async (req: Request, res: Response) => {
  try {
    const features = await findMany('process_features', { is_active: true }, 'display_order ASC');
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch process features' });
  }
});

router.post('/process-features', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('process_features', req.body);
    res.json({ id: result.insertId, message: 'Process feature created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create process feature' });
  }
});

router.put('/process-features/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('process_features', req.body, { id });
    res.json({ message: 'Process feature updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update process feature' });
  }
});

router.delete('/process-features/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('process_features', { id });
    res.json({ message: 'Process feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete process feature' });
  }
});

// Testimonials APIs
router.get('/testimonials', async (req: Request, res: Response) => {
  try {
    const testimonials = await findMany('testimonials', { is_active: true }, 'display_order ASC');
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

router.post('/testimonials', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('testimonials', req.body);
    res.json({ id: result.insertId, message: 'Testimonial created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

router.put('/testimonials/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('testimonials', req.body, { id });
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

router.delete('/testimonials/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('testimonials', { id });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// FAQs APIs
router.get('/faqs', async (req: Request, res: Response) => {
  try {
    const faqs = await findMany('faqs', { is_active: true }, 'display_order ASC');
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

router.post('/faqs', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('faqs', req.body);
    res.json({ id: result.insertId, message: 'FAQ created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

router.put('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('faqs', req.body, { id });
    res.json({ message: 'FAQ updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

router.delete('/faqs/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('faqs', { id });
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// Product Gallery APIs
router.get('/product-gallery', async (req: Request, res: Response) => {
  try {
    const products = await findMany('product_gallery', { is_active: true }, 'display_order ASC');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product gallery' });
  }
});

router.post('/product-gallery', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('product_gallery', req.body);
    res.json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/product-gallery/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('product_gallery', req.body, { id });
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/product-gallery/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('product_gallery', { id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Showroom APIs
router.get('/showroom-section', async (req: Request, res: Response) => {
  try {
    const section = await findOne('showroom_section', { is_active: true });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch showroom section' });
  }
});

router.put('/showroom-section/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('showroom_section', req.body, { id });
    res.json({ message: 'Showroom section updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update showroom section' });
  }
});

router.get('/showroom-images', async (req: Request, res: Response) => {
  try {
    const images = await findMany('showroom_images', { is_active: true }, 'display_order ASC');
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch showroom images' });
  }
});

router.post('/showroom-images', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('showroom_images', req.body);
    res.json({ id: result.insertId, message: 'Showroom image created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create showroom image' });
  }
});

router.put('/showroom-images/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('showroom_images', req.body, { id });
    res.json({ message: 'Showroom image updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update showroom image' });
  }
});

router.delete('/showroom-images/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('showroom_images', { id });
    res.json({ message: 'Showroom image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete showroom image' });
  }
});

// Footer APIs
router.get('/footer-section', async (req: Request, res: Response) => {
  try {
    const footer = await findOne('footer_section', { is_active: true });
    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch footer section' });
  }
});

router.put('/footer-section/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('footer_section', req.body, { id });
    res.json({ message: 'Footer section updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update footer section' });
  }
});

router.get('/social-links', async (req: Request, res: Response) => {
  try {
    const links = await findMany('social_links', { is_active: true });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

router.post('/social-links', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('social_links', req.body);
    res.json({ id: result.insertId, message: 'Social link created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create social link' });
  }
});

router.put('/social-links/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('social_links', req.body, { id });
    res.json({ message: 'Social link updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update social link' });
  }
});

router.delete('/social-links/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('social_links', { id });
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete social link' });
  }
});

// Quick Links APIs
router.get('/quick-links', async (req: Request, res: Response) => {
  try {
    const links = await findMany('quick_links', { is_active: true }, 'display_order ASC');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
});

router.post('/quick-links', async (req: Request, res: Response) => {
  try {
    const result = await insertRecord('quick_links', req.body);
    res.json({ id: result.insertId, message: 'Quick link created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quick link' });
  }
});

router.put('/quick-links/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await updateRecord('quick_links', req.body, { id });
    res.json({ message: 'Quick link updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quick link' });
  }
});

router.delete('/quick-links/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteRecord('quick_links', { id });
    res.json({ message: 'Quick link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quick link' });
  }
});

// Design APIs
router.get('/design', async (req: Request, res: Response) => {
  try {
    const design = await findOne('design_settings', { is_active: true });
    if (!design) {
      // Return default design if none exists
      const defaultDesign = {
        id: 1,
        primary_color: '#dc2626',
        secondary_color: '#000000',
        accent_color: '#ffffff',
        text_color: '#1f2937',
        background_color: '#f9fafb',
        font_primary: 'Inter',
        font_secondary: 'Roboto',
        font_sizes: JSON.stringify({
          heading1: '3rem',
          heading2: '2.25rem',
          heading3: '1.875rem',
          body: '1rem',
          small: '0.875rem'
        })
      };
      res.json(defaultDesign);
    } else {
      // Parse font_sizes if it's stored as JSON string
      if (typeof design.font_sizes === 'string') {
        design.font_sizes = JSON.parse(design.font_sizes);
      }
      res.json(design);
    }
  } catch (error) {
    console.error('Failed to fetch design settings:', error);
    res.status(500).json({ error: 'Failed to fetch design settings' });
  }
});

router.put('/design', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log('Updating design settings:', data);

    // Convert font_sizes object to JSON string for storage
    if (data.font_sizes && typeof data.font_sizes === 'object') {
      data.font_sizes = JSON.stringify(data.font_sizes);
    }

    // Check if design settings exist
    const existing = await findOne('design_settings', { is_active: true }).catch(() => null);

    if (existing) {
      await updateRecord('design_settings', data, { id: existing.id });
    } else {
      // Create new record
      await insertRecord('design_settings', { ...data, is_active: true });
    }

    console.log('Design settings updated successfully');
    res.json({ message: 'Design settings updated successfully' });
  } catch (error) {
    console.error('Failed to update design settings:', error);
    res.status(500).json({
      error: 'Failed to update design settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all data for frontend
router.get('/all-data', async (req: Request, res: Response) => {
  try {
    const [
      hero,
      benefits,
      benefitsSection,
      contactSection,
      processFeatures,
      testimonials,
      faqs,
      productGallery,
      showroomSection,
      showroomImages,
      footerSection,
      socialLinks,
      quickLinks
    ] = await Promise.all([
      findOne('hero_section', { is_active: true }),
      findMany('benefits', { is_active: true }, 'display_order ASC'),
      findOne('benefits_section', { is_active: true }),
      findOne('contact_section', { is_active: true }),
      findMany('process_features', { is_active: true }, 'display_order ASC'),
      findMany('testimonials', { is_active: true }, 'display_order ASC'),
      findMany('faqs', { is_active: true }, 'display_order ASC'),
      findMany('product_gallery', { is_active: true }, 'display_order ASC'),
      findOne('showroom_section', { is_active: true }),
      findMany('showroom_images', { is_active: true }, 'display_order ASC'),
      findOne('footer_section', { is_active: true }),
      findMany('social_links', { is_active: true }),
      findMany('quick_links', { is_active: true }, 'display_order ASC')
    ]);

    res.json({
      hero,
      benefits,
      benefitsSection,
      contactSection,
      processFeatures,
      testimonials,
      faqs,
      productGallery,
      showroomSection,
      showroomImages,
      footerSection,
      socialLinks,
      quickLinks
    });
  } catch (error) {
    console.error('Error fetching all data:', error);

    // Check if it's a table doesn't exist error
    if (error instanceof Error && error.message.includes('ER_NO_SUCH_TABLE')) {
      res.status(500).json({
        error: 'Database tables not found. Please run setup first.',
        code: 'DB_NOT_INITIALIZED',
        setupUrl: '/setup'
      });
    } else {
      res.status(500).json({
        error: 'Failed to fetch page data',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
});

export default router;
