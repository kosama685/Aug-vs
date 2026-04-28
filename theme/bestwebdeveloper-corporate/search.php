<?php
get_header();
?>
<section class="section container page-hero">
	<h1><?php printf( esc_html__( 'Search Results for: %s', 'bwd-corporate' ), esc_html( get_search_query() ) ); ?></h1>
	<?php get_search_form(); ?>
</section>
<div class="container content-grid">
	<div>
		<?php if ( have_posts() ) : ?>
			<div class="post-grid"><?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/content', get_post_type() ); endwhile; ?></div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'No matching content was found. Try a broader keyword.', 'bwd-corporate' ); ?></p>
		<?php endif; ?>
	</div>
	<?php get_sidebar(); ?>
</div>
<?php get_footer();
