<?php
/**
 * Header template.
 *
 * @package BestWebDeveloperCorporate
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'bwd-corporate' ); ?></a>
<header class="site-header" id="site-header">
	<div class="container header-wrap">
		<div class="site-branding">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-title"><?php bloginfo( 'name' ); ?></a>
				<p class="site-description"><?php bloginfo( 'description' ); ?></p>
			<?php endif; ?>
		</div>
		<button class="menu-toggle" aria-expanded="false" aria-controls="primary-menu">
			<span></span><span></span><span></span><span class="screen-reader-text"><?php esc_html_e( 'Open menu', 'bwd-corporate' ); ?></span>
		</button>
		<nav class="main-nav" aria-label="<?php esc_attr_e( 'Primary menu', 'bwd-corporate' ); ?>">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu', 'container' => false, 'fallback_cb' => false ) ); ?>
			<a class="btn btn-secondary nav-phone" href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener">WhatsApp <?php echo esc_html( bwd_get_whatsapp() ); ?></a>
			<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'bwd-corporate' ); ?></a>
		</nav>
	</div>
</header>
<main id="content" class="site-main">
