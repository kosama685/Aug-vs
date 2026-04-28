<?php
/**
 * Footer template.
 *
 * @package BestWebDeveloperCorporate
 */
?>
</main>
<footer class="site-footer">
	<div class="container footer-grid">
		<div>
			<h2><?php bloginfo( 'name' ); ?></h2>
			<p><?php echo esc_html( get_theme_mod( 'bwd_footer_description', 'bestwebdeveloper.org helps businesses launch modern, fast, and conversion-focused websites with premium design and reliable performance.' ) ); ?></p>
		</div>
		<div>
			<h3><?php esc_html_e( 'Contact', 'bwd-corporate' ); ?></h3>
			<ul class="footer-links">
				<li><a href="<?php echo esc_url( bwd_get_tel_link() ); ?>"><?php echo esc_html( bwd_get_phone() ); ?></a></li>
				<li><a href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener">WhatsApp</a></li>
				<li><a href="https://bestwebdeveloper.org" target="_blank" rel="noopener">bestwebdeveloper.org</a></li>
			</ul>
		</div>
		<div>
			<h3><?php esc_html_e( 'Quick Links', 'bwd-corporate' ); ?></h3>
			<?php wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-links', 'fallback_cb' => false ) ); ?>
		</div>
	</div>
	<div class="container footer-bottom">
		<p><?php echo esc_html( get_theme_mod( 'bwd_footer_copyright', '© ' . gmdate( 'Y' ) . ' bestwebdeveloper.org. All rights reserved.' ) ); ?></p>
	</div>
	<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
		<div class="container footer-widgets"><?php dynamic_sidebar( 'footer-1' ); ?></div>
	<?php endif; ?>
</footer>
<?php wp_footer(); ?>
</body>
</html>
