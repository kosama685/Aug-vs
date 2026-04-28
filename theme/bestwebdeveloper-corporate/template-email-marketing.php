<?php
/**
 * Template Name: Email Marketing Landing
 */
get_header();
?>
<section class="section container page-hero card"><h1>Email Marketing Landing Pages That Convert</h1><p>Design high-performing destination pages for newsletters, offers, and lifecycle campaigns.</p><a class="btn btn-primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Create Campaign Page</a></section>
<section class="section container card-grid three"><article class="card"><h2>Conversion-Focused Hero</h2><p>Immediate clarity, compelling offer framing, and action-driven layout.</p></article><article class="card"><h2>Feature Sections</h2><p>Clear benefits, trust indicators, and frictionless call-to-action blocks.</p></article><article class="card"><h2>Mobile Optimization</h2><p>Fast, readable, and touch-friendly experiences for email traffic.</p></article></section>
<section class="section container card cta-banner"><h2>Need an email campaign page now?</h2><p>Contact bestwebdeveloper.org via WhatsApp at <?php echo esc_html( bwd_get_whatsapp() ); ?>.</p><a class="btn btn-secondary" href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener">Chat on WhatsApp</a></section>
<?php get_footer();
