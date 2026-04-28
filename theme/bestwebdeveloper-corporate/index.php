<?php
/**
 * Main index template.
 *
 * @package BestWebDeveloperCorporate
 */

get_header();
?>
<section class="container section page-hero">
	<h1><?php esc_html_e( 'Latest Insights', 'bwd-corporate' ); ?></h1>
	<p><?php esc_html_e( 'Updates, strategy, and practical advice from bestwebdeveloper.org.', 'bwd-corporate' ); ?></p>
</section>
<div class="container content-grid">
	<div>
		<?php if ( have_posts() ) : ?>
			<div class="post-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/content', get_post_type() );
				endwhile;
				?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'No content found yet.', 'bwd-corporate' ); ?></p>
		<?php endif; ?>
	</div>
	<?php get_sidebar(); ?>
</div>
<?php
get_footer();
