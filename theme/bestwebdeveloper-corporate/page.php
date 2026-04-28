<?php
get_header();
if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		echo '<section class="section container">';
		get_template_part( 'template-parts/content', 'page' );
		echo '</section>';
	}
}
get_footer();
