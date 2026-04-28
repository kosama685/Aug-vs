<?php
/**
 * Single post content.
 *
 * @package BestWebDeveloperCorporate
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-card' ); ?>>
	<header class="entry-header">
		<h1><?php the_title(); ?></h1>
		<div class="meta-row"><?php bwd_posted_on(); ?></div>
	</header>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="thumb-wrap"><?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?></div>
	<?php endif; ?>
	<div class="entry-content"><?php the_content(); ?></div>
</article>
