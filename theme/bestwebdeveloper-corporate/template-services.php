<?php
/**
 * Template Name: Services Page
 */
get_header();
?>
<section class="section container page-hero card"><h1>Corporate Digital Services</h1><p>Professional web design, development, and growth services crafted for performance, trust, and conversion.</p></section>
<section class="section container card-grid three">
<?php
$cards = array(
array('Corporate Website Design','Structured corporate websites with premium visual direction.','Stronger first impression, better lead quality, and scalable content layouts.'),
array('WordPress Theme Development','Custom theme architecture with dynamic, editable content.','Easier content management and long-term maintainability.'),
array('UI/UX Design','User-centered interface and journey planning.','Clearer navigation and higher conversion rates.'),
array('SEO Services Pages','Search-ready page architecture and content hierarchy.','Improved indexing and organic visibility.'),
array('Landing Page Design','Campaign pages focused on one clear action.','More qualified inquiries from paid and organic traffic.'),
array('Email Marketing Landing Pages','Dedicated pages for email sequences and offers.','Improved click-through-to-conversion performance.'),
array('Branding Design','Consistent visual language for modern corporate identity.','Greater trust and brand recognition.'),
array('Illustration Service Pages','Showcase pages for visual and creative offerings.','Higher engagement and stronger storytelling.'),
array('Website Enhancement','UX, design, and functionality improvements for existing sites.','Faster pages and better usability.'),
array('Front-End HTML/CSS Design','Semantic, responsive front-end implementation.','Clean code quality and cross-device reliability.'),
);
foreach ( $cards as $item ) : ?>
<article class="card"><h2><?php echo esc_html( $item[0] ); ?></h2><p><?php echo esc_html( $item[1] ); ?></p><p><strong>Benefits:</strong> <?php echo esc_html( $item[2] ); ?></p><a class="text-link" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Request this service</a></article>
<?php endforeach; ?>
</section>
<?php get_footer();
