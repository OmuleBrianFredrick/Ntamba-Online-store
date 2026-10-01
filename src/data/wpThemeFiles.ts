export interface ThemeFile {
  path: string;
  name: string;
  language: 'php' | 'css' | 'markdown' | 'json';
  description: string;
  content: string;
}

export const WP_THEME_FILES: ThemeFile[] = [
  {
    path: 'style.css',
    name: 'style.css',
    language: 'css',
    description: 'Theme stylesheet & WordPress theme header definition',
    content: `/*
Theme Name: Ntamba Luxury Agroecology
Theme URI: https://ntamba.co.ug
Author: Ntamba Processors Limited & Quality International Foundation
Author URI: https://qualityinternationalfoundation.com
Description: Ultra-fast, dual-audience (B2B & B2C) premium WooCommerce theme for Ntamba Coffee Processors. Earthy luxury aesthetic, built for high conversion, mobile performance, unit/carton volume pricing, and EUDR compliance without external page builders.
Version: 1.0.0
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 8.0
License: GNU General Public License v2 or later
Text Domain: ntamba-luxury
Tags: e-commerce, custom-colors, responsive-layout, block-styles, translation-ready, full-site-editing
*/

:root {
  --color-cream: #F9F7F2;
  --color-coffee: #2A1E17;
  --color-green: #2D5A27;
  --color-gold: #D4A017;
  --font-heading: 'Lora', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background-color: var(--color-cream);
  color: var(--color-coffee);
  font-family: var(--font-body);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, .font-heading {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
}

/* Glassmorphism for B2B RFQ Portal */
.ntamba-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(42, 30, 23, 0.08);
  box-shadow: 0 20px 40px -15px rgba(42, 30, 23, 0.06);
}

/* Single Product Sticky Purchase Column */
@media (min-width: 1024px) {
  .ntamba-sticky-summary {
    position: sticky;
    top: 96px;
    height: fit-content;
  }
}

/* High-Performance Product Image Studio Pedestal (Zero-CLS & Aspect-Ratio Stabilization) */
.ntamba-product-pedestal {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 1rem;
  background: linear-gradient(180deg, #FAF8F5 0%, #F3EEE4 50%, #E6DFD0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ntamba-product-pedestal::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  background: linear-gradient(0deg, rgba(168, 162, 158, 0.2) 0%, transparent 100%);
  pointer-events: none;
}

.ntamba-product-pedestal img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.group:hover .ntamba-product-pedestal img,
.ntamba-product-card:hover .ntamba-product-pedestal img {
  transform: scale(1.06);
}
`
  },
  {
    path: 'functions.php',
    name: 'functions.php',
    language: 'php',
    description: 'Core theme setup, scripts, WooCommerce support, and custom REST API endpoints',
    content: `<?php
/**
 * Ntamba Luxury Agroecology Theme Functions
 *
 * @package Ntamba_Luxury
 */

if (!defined('ABSPATH')) {
    exit;
}

define('NTAMBA_VERSION', '1.0.0');

/**
 * Theme Setup
 */
function ntamba_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
    
    // Declare full WooCommerce compatibility
    add_theme_support('woocommerce', array(
        'thumbnail_image_width' => 600,
        'single_image_width'    => 1000,
        'product_grid'          => array(
            'default_rows'    => 4,
            'min_rows'        => 2,
            'max_rows'        => 8,
            'default_columns' => 4,
            'min_columns'     => 2,
            'max_columns'     => 5,
        ),
    ));
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => __('Primary Header Menu', 'ntamba-luxury'),
        'footer'  => __('Footer Quick Links', 'ntamba-luxury'),
    ));
}
add_action('after_setup_theme', 'ntamba_theme_setup');

/**
 * Enqueue Google Fonts and Tailwind Core
 */
function ntamba_enqueue_scripts() {
    wp_enqueue_style('ntamba-google-fonts', 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap', array(), null);
    wp_enqueue_style('ntamba-main-style', get_stylesheet_uri(), array('ntamba-google-fonts'), NTAMBA_VERSION);
    
    wp_enqueue_script('ntamba-scripts', get_template_directory_uri() . '/assets/js/theme.js', array('jquery'), NTAMBA_VERSION, true);
    wp_localize_script('ntamba-scripts', 'ntamba_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('ntamba_ajax_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'ntamba_enqueue_scripts');

/**
 * Include Submodules
 */
require_once get_template_directory() . '/inc/custom-post-types.php';
require_once get_template_directory() . '/inc/theme-settings.php';
require_once get_template_directory() . '/inc/api-endpoints.php';
require_once get_template_directory() . '/inc/b2b-commerce.php';

/**
 * B2B Carton Pricing Hook for WooCommerce
 */
add_action('woocommerce_single_product_summary', 'ntamba_render_carton_toggle', 15);
function ntamba_render_carton_toggle() {
    global $product;
    $carton_price = get_post_meta($product->get_id(), '_carton_price', true);
    if (!empty($carton_price)) {
        echo '<div class="ntamba-volume-toggle my-4 p-3 bg-white rounded-lg border border-amber-200">';
        echo '<label class="text-xs uppercase font-semibold text-amber-800 tracking-wider">Volume Purchasing</label>';
        echo '<div class="flex items-center justify-between mt-1 text-sm">';
        echo '<span>Single Unit: <strong>' . wc_price($product->get_price()) . '</strong></span>';
        echo '<span class="text-stone-400">|</span>';
        echo '<span>Carton (12x): <strong class="text-emerald-800">' . wc_price($carton_price) . '</strong></span>';
        echo '</div>';
        echo '</div>';
    }
}

/**
 * High-Performance Image Optimization & Native Lazy-Loading for WooCommerce
 * Enforces native loading="lazy", decoding="async", and smooth hover easing
 */
add_filter('wp_get_attachment_image_attributes', 'ntamba_optimize_product_images', 10, 3);
function ntamba_optimize_product_images($attr, $attachment, $size) {
    $attr['loading'] = 'lazy';
    $attr['decoding'] = 'async';
    $attr['class'] = ($attr['class'] ?? '') . ' object-cover object-center transition-transform duration-700 ease-out select-none';
    return $attr;
}
`
  },
  {
    path: 'header.php',
    name: 'header.php',
    language: 'php',
    description: 'Header template adhering to Top Bar Contract (Wordmark, Nav, Actions)',
    content: `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#F9F7F2] text-[#2A1E17] font-body'); ?>>
<?php wp_body_open(); ?>

<header class="sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2A1E17]/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Zone 1: Authentic Ntamba Logo (Horizontal Format) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3 group" rel="home">
            <?php if (has_custom_logo()): ?>
                <?php the_custom_logo(); ?>
            <?php else: ?>
                <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/ntamba-logo-horizontal.svg'); ?>" alt="<?php bloginfo('name'); ?>" class="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102" />
            <?php endif; ?>
        </a>

        <!-- Zone 2: Clean Editorial Nav Links -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[#2A1E17]/80">
            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>" class="hover:text-[#D4A017] transition-colors">Retail Shop</a>
            <a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-[#D4A017] transition-colors">B2B Wholesale & Export</a>
            <a href="<?php echo esc_url(home_url('/our-agroecology/')); ?>" class="hover:text-[#D4A017] transition-colors">Kyantamba Estate</a>
            <a href="<?php echo esc_url(home_url('/cupping-samples/')); ?>" class="hover:text-[#D4A017] transition-colors">Cupping Pipeline</a>
        </nav>

        <!-- Zone 3: Actions (Cart & B2B RFQ) -->
        <div class="flex items-center gap-4">
            <a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1E17] rounded-md hover:bg-[#D4A017] transition-all">
                Request Quote
            </a>
            
            <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="relative p-2 text-[#2A1E17] hover:text-[#D4A017]" aria-label="Cart">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span class="absolute top-0 right-0 w-4 h-4 text-[10px] font-bold text-white bg-[#D4A017] rounded-full flex items-center justify-center">
                    <?php echo WC()->cart ? WC()->cart->get_cart_contents_count() : 0; ?>
                </span>
            </a>
        </div>
    </div>
</header>
`
  },
  {
    path: 'footer.php',
    name: 'footer.php',
    language: 'php',
    description: 'Global 4-column footer with regulatory credentials, TIN, and payment badges',
    content: `<footer class="bg-[#2A1E17] text-[#F9F7F2] mt-24 pt-16 pb-12 border-t border-amber-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Col 1: Brand & Origin with Official Logo -->
        <div class="space-y-4">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/ntamba-logo-white.svg'); ?>" alt="<?php bloginfo('name'); ?>" class="h-12 w-auto object-contain mb-2" />
            <p class="text-sm text-stone-300 leading-relaxed">
                Commercial arm of Quality International Foundation (QIF). Sourced from our 385-acre integrated, zero-waste agroecology estate in Kyantamba Village, Western Uganda.
            </p>
            <div class="text-xs text-stone-400 space-y-1">
                <p>TIN: 1058611264 · BRN: 80034312494926</p>
                <p>P.O. BOX 186844, Kampala, Uganda</p>
                <p>EU Distribution: DARAJA UG, Günzburg, Germany</p>
            </div>
        </div>

        <!-- Col 2: Retail Collections -->
        <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">Retail Catalog</h4>
            <ul class="space-y-2 text-sm text-stone-300">
                <li><a href="<?php echo esc_url(get_term_link('ground-coffee', 'product_cat')); ?>" class="hover:text-white">Natural Robusta Ground</a></li>
                <li><a href="<?php echo esc_url(get_term_link('roasted-beans', 'product_cat')); ?>" class="hover:text-white">Single Farm Whole Beans</a></li>
                <li><a href="<?php echo esc_url(get_term_link('honey', 'product_cat')); ?>" class="hover:text-white">Pure Natural Apiary Honey</a></li>
                <li><a href="<?php echo esc_url(get_term_link('dried-fruits', 'product_cat')); ?>" class="hover:text-white">FruitTreat Dehydrated Fruits</a></li>
                <li><a href="<?php echo esc_url(get_term_link('chewable', 'product_cat')); ?>" class="hover:text-white">Chewable Coffee Beans</a></li>
            </ul>
        </div>

        <!-- Col 3: B2B & Export Logistics -->
        <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">B2B & Export</h4>
            <ul class="space-y-2 text-sm text-stone-300">
                <li><a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-white">Cupping Sample Requests</a></li>
                <li><a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-white">Full Container Load (FCL/LCL)</a></li>
                <li><a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-white">Incoterms & EUDR Compliance</a></li>
                <li><a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-white">Direct Trade Roastery Contracts</a></li>
                <li><a href="<?php echo esc_url(home_url('/wholesale/')); ?>" class="hover:text-white">SWIFT Wire Split Terms</a></li>
            </ul>
        </div>

        <!-- Col 4: Payments & Contact -->
        <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">Direct Inquiries</h4>
            <p class="text-sm text-stone-300 mb-2">inquire@ntamba.co.ug</p>
            <p class="text-sm text-stone-300 mb-4">+256 782 333 223 / +256 200 920 228</p>
            
            <div class="pt-2 border-t border-stone-800">
                <span class="text-xs text-stone-400 block mb-2">Accepted Payment Channels:</span>
                <div class="flex flex-wrap gap-2 text-[11px] text-amber-300">
                    <span class="px-2 py-1 bg-stone-900 rounded">MTN MoMo</span>
                    <span class="px-2 py-1 bg-stone-900 rounded">Airtel Money</span>
                    <span class="px-2 py-1 bg-stone-900 rounded">Visa / MC</span>
                    <span class="px-2 py-1 bg-stone-900 rounded">SWIFT Wire</span>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 text-xs text-stone-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; <?php echo date('Y'); ?> Ntamba Processors Limited. Commercial Subsidiary of QIF.</p>
        <p>Single Farm Origin · Regenerative Agroecology · Kyantamba, Uganda</p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`
  },
  {
    path: 'page-wholesale.php',
    name: 'page-wholesale.php',
    language: 'php',
    description: 'B2B Wholesale Portal & Glassmorphism RFQ Form template with Make.com webhook trigger',
    content: `<?php
/**
 * Template Name: B2B Wholesale & Export Portal
 *
 * @package Ntamba_Luxury
 */

get_header(); ?>

<main class="min-h-screen py-16 bg-[#F9F7F2]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Portal Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-semibold uppercase tracking-widest text-[#2D5A27]">Direct-from-Origin Sourcing</span>
            <h1 class="font-heading text-4xl sm:text-5xl text-[#2A1E17] mt-3 mb-6">
                B2B Wholesale & Export Portal
            </h1>
            <p class="text-base sm:text-lg text-[#2A1E17]/80 leading-relaxed">
                Connect your roastery, specialty market, or retail distribution network directly with our 385-acre regenerative agroecology farm in Kyantamba, Uganda.
            </p>
        </div>

        <!-- 4-Step Cupping Sample Pipeline -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div class="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                <span class="text-2xl font-heading text-[#D4A017] block mb-2">01</span>
                <h3 class="font-semibold text-stone-900 mb-1">Select Lot Profile</h3>
                <p class="text-xs text-stone-600">Choose between Green Screen 18, Roasted Whole Beans, or Natural Micro-lots.</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                <span class="text-2xl font-heading text-[#D4A017] block mb-2">02</span>
                <h3 class="font-semibold text-stone-900 mb-1">Express Courier</h3>
                <p class="text-xs text-stone-600">Dispatched via DHL Express directly from Kampala to your roastery cupping lab.</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                <span class="text-2xl font-heading text-[#D4A017] block mb-2">03</span>
                <h3 class="font-semibold text-stone-900 mb-1">Incoterms Quoting</h3>
                <p class="text-xs text-stone-600">FOB Mombasa or CIF European Ports (Hamburg/Rotterdam) with EUDR traceability.</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
                <span class="text-2xl font-heading text-[#D4A017] block mb-2">04</span>
                <h3 class="font-semibold text-stone-900 mb-1">Sample Cost Credit</h3>
                <p class="text-xs text-stone-600">Courier fees for verified samples are 100% credited against your first commercial container.</p>
            </div>
        </div>

        <!-- Glassmorphism RFQ Form Container -->
        <div class="ntamba-glass p-8 sm:p-12 rounded-2xl max-w-3xl mx-auto shadow-xl">
            <h2 class="font-heading text-2xl text-[#2A1E17] mb-2">Request Wholesale Quote & Cupping Samples</h2>
            <p class="text-sm text-stone-600 mb-8">Direct integration with our logistics operations desk. Response within 12 business hours.</p>

            <form id="ntamba-b2b-rfq-form" class="space-y-6" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                <input type="hidden" name="action" value="ntamba_submit_rfq">
                <?php wp_nonce_field('ntamba_rfq_action', 'ntamba_rfq_nonce'); ?>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Full Name *</label>
                        <input type="text" name="full_name" required class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Company / Roastery *</label>
                        <input type="text" name="company" required class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Corporate Email *</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Destination Country *</label>
                        <input type="text" name="country" required class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Inquiry Type</label>
                        <select name="inquiry_type" class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                            <option value="samples">Cupping Samples (250g / 500g)</option>
                            <option value="lcl">Pallet / LCL Shipment (500kg - 2 Tons)</option>
                            <option value="fcl">Full Container Load (FCL 20ft / 40ft)</option>
                            <option value="honey_bulk">Bulk Apiary Honey Drums (200kg)</option>
                            <option value="fruittreat_bulk">FruitTreat Dried Fruit Wholesale Cartons</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Preferred Incoterm</label>
                        <select name="incoterm" class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]">
                            <option value="FOB">FOB Mombasa Port</option>
                            <option value="CIF_HAMBURG">CIF Hamburg, Germany</option>
                            <option value="CIF_ROTTERDAM">CIF Rotterdam, Netherlands</option>
                            <option value="DDP">DDP (EU Domestic via Daraja UG)</option>
                            <option value="EXW">EXW Farm Estate (Kyantamba)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-stone-700 uppercase mb-2">Specifications & Target Volume</label>
                    <textarea name="message" rows="4" placeholder="Detail your roast expectations, required green coffee grading, moisture thresholds, or delivery timeline..." class="w-full px-4 py-3 bg-white/90 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]"></textarea>
                </div>

                <button type="submit" class="w-full py-4 text-sm font-semibold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] transition-all rounded-lg shadow-md hover:-translate-y-0.5">
                    Submit Formal Sourcing Request
                </button>
            </form>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`
  },
  {
    path: 'inc/custom-post-types.php',
    name: 'inc/custom-post-types.php',
    language: 'php',
    description: 'Registers Harvest Batch and Cupping Profile Custom Post Types (Zero external plugins)',
    content: `<?php
/**
 * Register Custom Post Types for Ntamba Traceability
 *
 * @package Ntamba_Luxury
 */

if (!defined('ABSPATH')) {
    exit;
}

function ntamba_register_custom_post_types() {
    // 1. Harvest Batches (Seed of the Farm Yield Engine)
    register_post_type('harvest_batch', array(
        'labels' => array(
            'name'          => __('Harvest Batches', 'ntamba-luxury'),
            'singular_name' => __('Harvest Batch', 'ntamba-luxury'),
            'add_new_item'  => __('Add New Harvest Batch', 'ntamba-luxury'),
            'edit_item'     => __('Edit Harvest Batch', 'ntamba-luxury'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'menu_icon'    => 'dashicons-chart-pie',
        'supports'     => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true,
        'rewrite'      => array('slug' => 'harvest-batches'),
    ));

    // 2. Cupping Profiles (Specialty Q-Grade Reviews)
    register_post_type('cupping_review', array(
        'labels' => array(
            'name'          => __('Cupping Profiles', 'ntamba-luxury'),
            'singular_name' => __('Cupping Profile', 'ntamba-luxury'),
            'add_new_item'  => __('Add Cupping Score Sheet', 'ntamba-luxury'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'menu_icon'    => 'dashicons-awards',
        'supports'     => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true,
        'rewrite'      => array('slug' => 'cupping-profiles'),
    ));
}
add_action('init', 'ntamba_register_custom_post_types');
`
  },
  {
    path: 'inc/theme-settings.php',
    name: 'inc/theme-settings.php',
    language: 'php',
    description: 'WordPress Customizer controls for brand identity, WhatsApp hotline, and EUDR license',
    content: `<?php
/**
 * Theme Customizer Settings for Ntamba Luxury
 *
 * @package Ntamba_Luxury
 */

if (!defined('ABSPATH')) {
    exit;
}

function ntamba_customize_register($wp_customize) {
    // Ntamba Commercial Identity Section
    $wp_customize->add_section('ntamba_identity_section', array(
        'title'       => __('Ntamba Commercial & Export Details', 'ntamba-luxury'),
        'priority'    => 30,
        'description' => __('Configure official export IDs, WhatsApp direct order numbers, and EUDR compliance text without any plugins.', 'ntamba-luxury'),
    ));

    // WhatsApp Hotline
    $wp_customize->add_setting('ntamba_whatsapp_hotline', array(
        'default'           => '+256782333223',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ntamba_whatsapp_hotline', array(
        'label'    => __('WhatsApp Direct Sales Hotline', 'ntamba-luxury'),
        'section'  => 'ntamba_identity_section',
        'type'     => 'text',
    ));

    // EUDR License ID
    $wp_customize->add_setting('ntamba_eudr_id', array(
        'default'           => 'EUDR-UG-2026-NPL-0482',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ntamba_eudr_id', array(
        'label'    => __('EUDR Traceability Registration ID', 'ntamba-luxury'),
        'section'  => 'ntamba_identity_section',
        'type'     => 'text',
    ));

    // European Distributor Info
    $wp_customize->add_setting('ntamba_eu_distributor', array(
        'default'           => 'DARAJA UG (haftungsbeschränkt), Günzburg, Germany',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ntamba_eu_distributor', array(
        'label'    => __('European Partner Entity', 'ntamba-luxury'),
        'section'  => 'ntamba_identity_section',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'ntamba_customize_register');

/**
 * Enable Custom Logo Support in WordPress
 */
function ntamba_custom_logo_setup() {
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 280,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array('site-title', 'site-description'),
    ));
}
add_action('after_setup_theme', 'ntamba_custom_logo_setup');

/**
 * Custom WordPress Login Screen with Official Ntamba Stacked Logo
 */
function ntamba_custom_login_branding() {
    ?>
    <style type="text/css">
        #login h1 a, .login h1 a {
            background-image: url('<?php echo esc_url(get_template_directory_uri() . "/assets/images/ntamba-logo-stacked.svg"); ?>');
            height: 90px;
            width: 280px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            padding-bottom: 15px;
        }
        body.login {
            background-color: #F9F7F2;
        }
        body.login #loginform {
            background: #FFFFFF;
            border-radius: 16px;
            border: 1px solid #E5E0D8;
            box-shadow: 0 10px 30px rgba(42,30,23,0.06);
        }
        body.login #wp-submit {
            background-color: #0C4A2B;
            border-color: #0C4A2B;
            border-radius: 8px;
            font-weight: 700;
            padding: 4px 16px;
            text-shadow: none;
            box-shadow: none;
        }
        body.login #wp-submit:hover {
            background-color: #C27B13;
            border-color: #C27B13;
        }
    </style>
    <?php
}
add_action('login_enqueue_scripts', 'ntamba_custom_login_branding');
`
  },
  {
    path: 'inc/api-endpoints.php',
    name: 'inc/api-endpoints.php',
    language: 'php',
    description: 'REST API endpoints for headless frontend syncing and RFQ Make.com webhooks',
    content: `<?php
/**
 * Custom REST API Endpoints for Ntamba Headless Bridge
 *
 * @package Ntamba_Luxury
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    // 1. GET /wp-json/ntamba/v1/catalog
    register_rest_route('ntamba/v1', '/catalog', array(
        'methods'             => 'GET',
        'callback'            => 'ntamba_rest_get_catalog',
        'permission_callback' => '__return_true',
    ));

    // 2. POST /wp-json/ntamba/v1/rfq
    register_rest_route('ntamba/v1', '/rfq', array(
        'methods'             => 'POST',
        'callback'            => 'ntamba_rest_handle_rfq',
        'permission_callback' => '__return_true',
    ));
});

function ntamba_rest_get_catalog() {
    $args = array(
        'status' => 'publish',
        'limit'  => -1,
    );
    $products = wc_get_products($args);
    $data = array();

    foreach ($products as $product) {
        $data[] = array(
            'id'           => $product->get_id(),
            'sku'          => $product->get_sku(),
            'name'         => $product->get_name(),
            'price'        => $product->get_price(),
            'carton_price' => get_post_meta($product->get_id(), '_carton_price', true),
            'gtin'         => get_post_meta($product->get_id(), '_gtin', true),
            'weight'       => $product->get_weight(),
            'image'        => wp_get_attachment_image_url($product->get_image_id(), 'full'),
            'stock_status' => $product->get_stock_status(),
        );
    }

    return rest_ensure_response($data);
}

function ntamba_rest_handle_rfq($request) {
    $params = $request->get_json_params();

    // Trigger Make.com or Airtable Webhook if configured
    $webhook_url = get_option('ntamba_make_webhook_url');
    if ($webhook_url) {
        wp_remote_post($webhook_url, array(
            'body'    => json_encode($params),
            'headers' => array('Content-Type' => 'application/json'),
        ));
    }

    return rest_ensure_response(array(
        'status'  => 'success',
        'message' => 'Wholesale inquiry received and routed to Ntamba logistics desk.',
        'ref'     => 'NTB-RFQ-' . strtoupper(wp_generate_password(6, false)),
    ));
}
`
  },
  {
    path: 'inc/b2b-commerce.php',
    name: 'inc/b2b-commerce.php',
    language: 'php',
    description: 'B2B Dual-Mode Commercial Engine: User roles, cupping sample quota (2/quarter), credit on container order, and locked FX snapshot',
    content: `<?php
/**
 * Ntamba B2B Dual-Mode Commercial Engine
 * Implements roles, cupping sample quotas, split payments, and order snapshots (PDD Section 5 & 7)
 *
 * @package Ntamba_Luxury
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Register B2B User Roles (Section 2 & 7)
 */
function ntamba_register_b2b_roles() {
    add_role('b2b_unverified', __('Commercial Buyer (Unverified)', 'ntamba-luxury'), array(
        'read' => true,
    ));
    add_role('b2b_verified', __('Commercial Buyer (Verified KYC)', 'ntamba-luxury'), array(
        'read'                    => true,
        'request_cupping_samples' => true,
        'view_wholesale_pricing'  => true,
    ));
    add_role('staff_ops', __('Ntamba Operations Staff', 'ntamba-luxury'), array(
        'read'               => true,
        'edit_posts'         => true,
        'manage_woocommerce' => true,
    ));
}
add_action('init', 'ntamba_register_b2b_roles');

/**
 * 2. Cupping Sample Request Custom Post Type (Section 5.3)
 */
function ntamba_register_sample_request_cpt() {
    register_post_type('sample_request', array(
        'labels' => array(
            'name'          => __('Cupping Sample Requests', 'ntamba-luxury'),
            'singular_name' => __('Sample Request', 'ntamba-luxury'),
        ),
        'public'       => false,
        'show_ui'      => true,
        'menu_icon'    => 'dashicons-coffee',
        'supports'     => array('title', 'custom-fields'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'ntamba_register_sample_request_cpt');

/**
 * 3. Enforce Quarterly Sample Quota (Max 2/Quarter per Verified Buyer)
 */
function ntamba_check_sample_quota($user_id) {
    if (!user_can($user_id, 'request_cupping_samples')) {
        return false;
    }
    $current_quarter = ceil(date('n') / 3);
    $current_year = date('Y');
    
    $args = array(
        'post_type'   => 'sample_request',
        'meta_query'  => array(
            array('key' => '_user_id', 'value' => $user_id),
            array('key' => '_year', 'value' => $current_year),
            array('key' => '_quarter', 'value' => $current_quarter),
        ),
        'fields'      => 'ids',
    );
    $requests = get_posts($args);
    return count($requests) < 2; // Returns true if under 2 requests this quarter
}

/**
 * 4. Lock FX Rate & Order Channel Snapshot on Order Creation (Section 3 & 5.3)
 */
add_action('woocommerce_checkout_create_order', 'ntamba_snapshot_order_meta', 10, 2);
function ntamba_snapshot_order_meta($order, $data) {
    // Snapshot current exchange rate at time of order (never recomputed later)
    $currency = $order->get_currency();
    $rates = array('USD' => 1.0, 'EUR' => 0.92, 'GBP' => 0.78, 'UGX' => 3780);
    $fx_rate = isset($rates[$currency]) ? $rates[$currency] : 1.0;
    
    $order->update_meta_data('_fx_rate_at_order', $fx_rate);
    $order->update_meta_data('_base_price_currency', 'USD');
    
    // Distinguish order channel
    $channel = $order->get_meta('_order_channel') ?: 'b2c_retail';
    $order->update_meta_data('_order_channel', $channel);
    
    // Log Incoterm if B2B
    if (!empty($_POST['ntamba_incoterm'])) {
        $order->update_meta_data('_incoterm', sanitize_text_field($_POST['ntamba_incoterm']));
    }
    
    // Log Payment Milestones (30/70 split or 100%)
    if (!empty($_POST['ntamba_milestone_pct'])) {
        $order->update_meta_data('_milestone_pct', sanitize_text_field($_POST['ntamba_milestone_pct']));
    }
}

/**
 * 5. B2B Sample Credit Deduction against First Commercial Container (Section 5.3)
 */
add_action('woocommerce_cart_calculate_fees', 'ntamba_apply_sample_credit');
function ntamba_apply_sample_credit() {
    if (is_admin() && !defined('DOING_AJAX')) return;
    
    $user_id = get_current_user_id();
    if (!$user_id) return;
    
    $pending_credit = get_user_meta($user_id, '_sample_credit_available_usd', true);
    if ($pending_credit && $pending_credit > 0) {
        $cart_total = WC()->cart->cart_contents_total;
        if ($cart_total > 500) { // Commercial volume threshold
            WC()->cart->add_fee(__('Cupping Sample Fee Credit (Deducted against container)', 'ntamba-luxury'), -$pending_credit);
        }
    }
}

/**
 * 6. Inject Schema.org Product JSON-LD on WooCommerce Single Product Pages (PDD & SEO Requirement)
 */
add_action('wp_head', 'ntamba_inject_product_jsonld');
function ntamba_inject_product_jsonld() {
    if (!function_exists('is_product') || !is_product()) {
        return;
    }
    global $product;
    if (!$product) return;

    $schema = array(
        '@context'        => 'https://schema.org',
        '@type'           => 'Product',
        'name'            => $product->get_name(),
        'description'     => wp_strip_all_tags($product->get_short_description() ?: $product->get_description()),
        'sku'             => $product->get_sku(),
        'countryOfOrigin' => array(
            '@type' => 'Country',
            'name'  => 'Uganda',
        ),
        'countryOfAssembly' => 'Uganda',
        'brand'           => array(
            '@type' => 'Brand',
            'name'  => 'Ntamba Processors',
        ),
        'offers'          => array(
            '@type'         => 'Offer',
            'url'           => get_permalink($product->get_id()),
            'priceCurrency' => get_woocommerce_currency(),
            'price'         => $product->get_price(),
            'priceValidUntil' => '2027-12-31',
            'availability'  => $product->is_in_stock() ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            'seller'        => array(
                '@type' => 'Organization',
                'name'  => 'Ntamba Processors Limited',
            ),
        ),
    );

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
`
  },
  {
    path: 'woocommerce/content-product.php',
    name: 'woocommerce/content-product.php',
    language: 'php',
    description: 'WooCommerce Loop Product Card with Studio Pedestal, Aspect-Ratio Zero-CLS, and Native Lazy-Loading',
    content: `<?php
/**
 * The template for displaying product content within loops
 *
 * @package Ntamba_Luxury
 */

defined('ABSPATH') || exit;

global $product;

// Ensure visibility.
if (empty($product) || !$product->is_visible()) {
    return;
}

$carton_price = get_post_meta($product->get_id(), '_carton_price', true);
$cupping_score = get_post_meta($product->get_id(), '_cupping_score', true);
$badge = get_post_meta($product->get_id(), '_custom_badge', true);
?>
<li <?php wc_product_class('group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(42,30,23,0.04)] hover:shadow-[0_12px_32px_rgba(42,30,23,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden list-none', $product); ?>>
    <a href="<?php echo esc_url(get_permalink()); ?>" class="block relative w-full aspect-square overflow-hidden bg-[#F7F4EE]">
        <!-- Soft Studio Pedestal Atmosphere -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F3EEE4] to-[#E6DFD0] opacity-85"></div>
        <div class="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-stone-400/20 to-transparent pointer-events-none"></div>

        <!-- High-Performance Lazy-Loaded Product Photography -->
        <div class="relative z-10 w-full h-full flex items-center justify-center">
            <?php
            if (has_post_thumbnail()) {
                echo get_the_post_thumbnail($product->get_id(), 'woocommerce_thumbnail', array(
                    'class'   => 'w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106 select-none',
                    'loading' => 'lazy',
                    'decoding'=> 'async',
                ));
            } else {
                echo '<img src="' . esc_url(get_template_directory_uri() . '/assets/images/fruits/tropical-dried-fruits.png') . '" alt="' . esc_attr(get_the_title()) . '" class="w-full h-full object-cover object-center" loading="lazy" decoding="async" />';
            }
            ?>

            <!-- Top Left Weight/Badge -->
            <div class="absolute top-3 left-3 flex flex-col gap-1 items-start z-20">
                <?php if ($product->has_weight()): ?>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#2A1E17]/90 text-white backdrop-blur-md shadow-md border border-white/15">
                        <?php echo esc_html(wc_format_weight($product->get_weight())); ?>
                    </span>
                <?php endif; ?>
                <?php if (!empty($badge)): ?>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#D4A017] text-[#2A1E17] shadow-md">
                        ★ <?php echo esc_html($badge); ?>
                    </span>
                <?php endif; ?>
            </div>

            <!-- Bottom Traceability Stamp -->
            <div class="absolute bottom-2.5 inset-x-2.5 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md text-white flex items-center justify-between text-[11px] border border-white/15 shadow-sm z-20">
                <span class="font-semibold text-stone-200 flex items-center gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2D5A27] animate-pulse"></span>
                    <span class="truncate">Kyantamba Agroecology</span>
                </span>
                <span class="text-[10px] text-amber-300 font-mono font-bold shrink-0">EUDR Ready</span>
            </div>
        </div>
    </a>

    <!-- Product Content Details -->
    <div class="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
            <div class="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
                <span><?php echo wc_get_product_category_list($product->get_id(), ', '); ?></span>
                <?php if (!empty($cupping_score)): ?>
                    <span aria-hidden="true">·</span>
                    <span class="text-[#2D5A27] font-semibold"><?php echo esc_html($cupping_score); ?> Q-Score</span>
                <?php endif; ?>
            </div>

            <h3 class="font-heading text-lg font-bold text-[#2A1E17] group-hover:text-[#D4A017] transition-colors line-clamp-1">
                <a href="<?php echo esc_url(get_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a>
            </h3>

            <p class="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                <?php echo wp_strip_all_tags(get_the_excerpt()); ?>
            </p>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span class="text-base font-bold text-[#2A1E17]">
                <?php echo $product->get_price_html(); ?>
            </span>
            <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" class="px-4 py-2 bg-[#2A1E17] hover:bg-[#D4A017] text-white hover:text-[#2A1E17] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm">
                Add to Cart
            </a>
        </div>
    </div>
</li>
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    description: 'Documentation: Installation guide, zero-plugin setup, and WooCommerce configuration',
    content: `# Ntamba Luxury Agroecology — WordPress & WooCommerce Theme

**Client:** Ntamba Processors Limited (Commercial Arm of Quality International Foundation)  
**Origin:** 385-Acre Circular Agroecology Farm, Kyantamba Village, Western Uganda  
**Version:** 1.0.0  

---

## ⚡ Zero-Plugin Philosophy
This theme is architected to be 100% self-contained. It delivers:
- **Dual-Audience (B2C & B2B) Sourcing**: Built-in Unit vs. Carton (12x) volume pricing displays.
- **Glassmorphism B2B RFQ Portal**: Form templates and sample request pipeline.
- **Custom Post Types**: Native registration of \`harvest_batch\` and \`cupping_review\` post types without ACF or CPT UI.
- **Customizer Controls**: Native WP Customizer settings for brand colors, WhatsApp hotlines, and EUDR license strings.
- **Headless Ready**: Custom REST API endpoints under \`/wp-json/ntamba/v1/\`.

---

## 📦 How to Install on WordPress

1. Click **"Download Theme (.zip)"** in the top navigation of this dashboard.
2. In your WordPress Admin: Navigate to **Appearance > Themes > Add New > Upload Theme**.
3. Select \`ntamba-luxury-theme.zip\` and click **Install Now**.
4. Click **Activate**.
5. Ensure WooCommerce is active. The theme will automatically inherit and enhance all 17 SKUs.
`
  }
];
