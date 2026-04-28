<?php
get_header();
?>
<section class="section container card page-hero not-found">
	<h1><?php esc_html_e( 'Page Not Found', 'bwd-corporate' ); ?></h1>
	<p><?php esc_html_e( 'The page you requested is unavailable. Use search, return home, or contact bestwebdeveloper.org for assistance.', 'bwd-corporate' ); ?></p>
	<div class="btn-row">
		<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return Home', 'bwd-corporate' ); ?></a>
		<a class="btn btn-secondary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'bwd-corporate' ); ?></a>
	</div>
	<?php get_search_form(); ?>
</section>
<?php
get_footer();
