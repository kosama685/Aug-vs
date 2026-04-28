<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
<aside class="sidebar" aria-label="<?php esc_attr_e( 'Sidebar', 'bwd-corporate' ); ?>">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>
<?php endif; ?>
