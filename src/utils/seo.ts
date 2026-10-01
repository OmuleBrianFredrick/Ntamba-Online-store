import { useEffect } from 'react';
import { Product } from '../types';
import { BlogPost } from '../data/blogPosts';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  product?: Product;
  article?: BlogPost;
}

export const getProductJsonLdSchema = (product: Product) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ntamba.co.ug';
  const imageUrl = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `${origin}${product.imageUrl || '/images/hero_coffee_estate_1790760219094.webp'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.fullDescription || product.shortDescription,
    sku: product.sku,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Ntamba Processors'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UGX',
      price: product.unitPriceUGX,
      availability: 'https://schema.org/InStock',
      url: `${origin}/product/${product.id}`
    }
  };
};

export const useProductJsonLd = (product: Product) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !product) return;

    let scriptEl = document.querySelector('#product-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'product-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schema = getProductJsonLdSchema(product);
    scriptEl.textContent = JSON.stringify(schema);

    return () => {
      const existing = document.querySelector('#product-jsonld');
      if (existing) existing.remove();
    };
  }, [product]);
};

export const updateSEO = (config: SEOConfig) => {
  if (typeof document === 'undefined') return;

  const origin = window.location.origin;
  const canonicalUrl = `${origin}${config.canonicalPath || window.location.pathname}`;
  const defaultImage = `${origin}/images/hero_coffee_estate_1790760219094.webp`;
  const imageUrl = config.image ? (config.image.startsWith('http') ? config.image : `${origin}${config.image}`) : defaultImage;

  // 1. Update Document Title
  document.title = config.title;

  // Helper to set or update meta tag
  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const isProperty = selector.includes('property=');
      if (isProperty) {
        const propName = selector.match(/property="([^"]+)"/)?.[1];
        if (propName) el.setAttribute('property', propName);
      } else {
        const metaName = selector.match(/name="([^"]+)"/)?.[1];
        if (metaName) el.setAttribute('name', metaName);
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  // 2. Standard Meta Tags
  setMeta('meta[name="description"]', 'content', config.description);

  // 3. OpenGraph Tags
  setMeta('meta[property="og:title"]', 'content', config.title);
  setMeta('meta[property="og:description"]', 'content', config.description);
  setMeta('meta[property="og:type"]', 'content', config.type || 'website');
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[property="og:site_name"]', 'content', 'Ntamba Processors Limited');

  // 4. Twitter Card Tags
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', config.title);
  setMeta('meta[name="twitter:description"]', 'content', config.description);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 6. Schema.org JSON-LD Structured Data
  let scriptEl = document.querySelector('#schema-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const baseOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ntamba Processors Limited',
    url: origin,
    logo: `${origin}/images/qif/qif-logo.png`,
    description: 'Standalone Ugandan agribusiness cultivating single-origin Robusta coffee, raw apiary honey, and dried fruits across 385 acres in Kyantamba Village.',
    telephone: '+256782333223',
    email: 'inquire@ntamba.co.ug',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kyantamba Estate',
      addressLocality: 'Mbarara District',
      addressRegion: 'Western Region',
      addressCountry: 'UG'
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Quality International Foundation (QIF)',
      url: 'https://qualityinternationalfoundation.com/'
    }
  };

  let schemaData: any = baseOrganization;

  if (config.product) {
    schemaData = getProductJsonLdSchema(config.product);
  } else if (config.article) {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.article.title,
      description: config.article.excerpt,
      image: imageUrl,
      author: {
        '@type': 'Organization',
        name: config.article.author
      },
      publisher: baseOrganization,
      datePublished: '2026-07-01',
      dateModified: '2026-10-01',
      mainEntityOfPage: canonicalUrl
    };
  }

  scriptEl.textContent = JSON.stringify(schemaData);
};
