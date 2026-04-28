<?php
get_header();
?>
<section class="section container page-hero">
	<h1><?php the_archive_title(); ?></h1>
	<?php the_archive_description( '<p>', '</p>' ); ?>
</section>
<div class="container content-grid">
	<div>
		<?php if ( have_posts() ) : ?>
			<div class="post-grid"><?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/content', get_post_type() ); endwhile; ?></div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'No posts available.', 'bwd-corporate' ); ?></p>
		<?php endif; ?>
	</div>
	<?php get_sidebar(); ?>
</div>
<?php get_footer();
