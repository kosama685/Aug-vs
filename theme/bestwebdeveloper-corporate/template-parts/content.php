<?php
/**
 * Generic content card.
 *
 * @package BestWebDeveloperCorporate
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
	<a class="post-card-link" href="<?php the_permalink(); ?>">
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="thumb-wrap"><?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?></div>
		<?php endif; ?>
		<div class="post-card-content">
			<h2><?php the_title(); ?></h2>
			<div class="meta-row"><?php bwd_posted_on(); ?></div>
			<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
			<span class="read-more"><?php esc_html_e( 'Read More', 'bwd-corporate' ); ?></span>
		</div>
	</a>
</article>
