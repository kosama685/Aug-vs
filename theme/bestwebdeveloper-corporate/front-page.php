<?php
/**
 * Front page template.
 *
 * @package BestWebDeveloperCorporate
 */

get_header();
$hero_title    = get_theme_mod( 'bwd_hero_title', 'Modern Corporate Websites That Help Your Business Grow' );
$hero_subtitle = get_theme_mod( 'bwd_hero_subtitle', 'bestwebdeveloper.org builds premium websites, WordPress solutions, SEO-ready service pages, and conversion-focused digital experiences for modern businesses.' );
$hero_btn_1    = get_theme_mod( 'bwd_hero_btn_primary_text', 'Start Your Project' );
$hero_btn_1url = get_theme_mod( 'bwd_hero_btn_primary_url', home_url( '/contact/' ) );
$hero_btn_2    = get_theme_mod( 'bwd_hero_btn_secondary_text', 'Explore Services' );
$hero_btn_2url = get_theme_mod( 'bwd_hero_btn_secondary_url', home_url( '/services/' ) );
?>
<section class="hero section">
	<div class="container hero-grid">
		<div>
			<p class="eyebrow">bestwebdeveloper.org</p>
			<h1><?php echo esc_html( $hero_title ); ?></h1>
			<p class="hero-subtitle"><?php echo esc_html( $hero_subtitle ); ?></p>
			<div class="btn-row">
				<a href="<?php echo esc_url( $hero_btn_1url ); ?>" class="btn btn-primary"><?php echo esc_html( $hero_btn_1 ); ?></a>
				<a href="<?php echo esc_url( $hero_btn_2url ); ?>" class="btn btn-secondary"><?php echo esc_html( $hero_btn_2 ); ?></a>
			</div>
			<p class="inline-contact">Call/WhatsApp: <a href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener"><?php echo esc_html( bwd_get_phone() ); ?></a></p>
		</div>
		<div class="glass-card">
			<h2><?php esc_html_e( 'Trusted Corporate Web Partner', 'bwd-corporate' ); ?></h2>
			<ul>
				<li><?php esc_html_e( 'Corporate website design and development', 'bwd-corporate' ); ?></li>
				<li><?php esc_html_e( 'WordPress theme engineering and support', 'bwd-corporate' ); ?></li>
				<li><?php esc_html_e( 'SEO pages and conversion-focused landing pages', 'bwd-corporate' ); ?></li>
			</ul>
		</div>
	</div>
</section>

<section class="section"><div class="container badge-grid"><div class="badge">Responsive First</div><div class="badge">SEO-Ready Structure</div><div class="badge">UI/UX Strategy</div><div class="badge">Fast Performance</div></div></section>

<section class="section container">
	<h2>Services Overview</h2>
	<div class="card-grid three">
		<?php
		$services = array(
			'Corporate Website Design'              => 'Premium company websites designed to build trust and support growth.',
			'WordPress Theme Development'           => 'Scalable, secure, and editable WordPress themes built to business standards.',
			'UI/UX Design'                          => 'User-focused interfaces that improve clarity, usability, and conversion.',
			'SEO Services Pages'                    => 'Search-optimized service pages with strong structure and internal linking.',
			'Landing Page Design'                   => 'Campaign-ready landing pages with clear messaging and strong calls to action.',
			'Email Marketing Landing Pages'         => 'Conversion-driven email campaign destinations tuned for measurable results.',
			'Branding Design'                       => 'Consistent visual identity elements for a modern corporate presence.',
			'Illustration Service Pages'            => 'High-impact section design for creative and technical illustration offerings.',
			'Website Enhancement'                   => 'UI refresh, code cleanup, and functionality upgrades for existing websites.',
			'Front-End HTML/CSS Design'             => 'Clean semantic front-end architecture with responsive layouts.',
		);
		foreach ( $services as $title => $desc ) :
			?>
			<article class="card"><h3><?php echo esc_html( $title ); ?></h3><p><?php echo esc_html( $desc ); ?></p></article>
		<?php endforeach; ?>
	</div>
</section>

<section class="section container split">
	<div class="card"><h2>Why Choose bestwebdeveloper.org</h2><p>Every project is built with a corporate mindset: clear hierarchy, measurable outcomes, accessibility, and maintainable code that your team can manage confidently from WordPress admin.</p></div>
	<div class="card"><h2>Delivery Process</h2><ol><li>Discovery and service priorities</li><li>Wireframe and visual direction</li><li>WordPress build and content integration</li><li>QA, SEO, speed, and launch readiness</li></ol></div>
</section>

<section class="section container card-grid two">
	<article class="card"><h2>Corporate Website Design</h2><p>Modern layouts with premium brand presence, clear service messaging, and contact-ready user journeys.</p></article>
	<article class="card"><h2>UI/UX and Branding</h2><p>Clean navigation, polished typography, strategic color systems, and trust-building visual consistency.</p></article>
	<article class="card"><h2>SEO Services Pages</h2><p>Built for discoverability with semantic headings, metadata support, and crawl-friendly content blocks.</p></article>
	<article class="card"><h2>Landing & Email Campaign Design</h2><p>Focused landing experiences that align campaign intent with compelling CTAs and fast load times.</p></article>
</section>

<section class="section container">
	<div class="cta-banner card">
		<h2>Ready to Upgrade Your Website?</h2>
		<p>Speak directly with bestwebdeveloper.org and plan your next corporate website, landing page, or SEO upgrade.</p>
		<div class="btn-row">
			<a class="btn btn-primary" href="<?php echo esc_url( bwd_get_tel_link() ); ?>">Call <?php echo esc_html( bwd_get_phone() ); ?></a>
			<a class="btn btn-secondary" href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener">Chat on WhatsApp</a>
		</div>
	</div>
</section>

<section class="section container contact-preview card-grid two">
	<div class="card"><h2>Contact Preview</h2><p><?php echo esc_html( get_theme_mod( 'bwd_contact_intro', 'Speak directly with bestwebdeveloper.org to discuss your website, landing page, UI/UX, SEO, or branding goals.' ) ); ?></p><a class="text-link" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Open full contact page</a></div>
	<div class="card"><h2>Trust & Results Focus</h2><p>The theme includes clean blog layouts, polished service templates, and a conversion-ready structure to help your business communicate value clearly.</p></div>
</section>

<?php
get_footer();
