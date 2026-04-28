<?php
/**
 * Theme functions and definitions.
 *
 * @package BestWebDeveloperCorporate
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BWD_THEME_VERSION', '1.0.0' );
define( 'BWD_THEME_DIR', get_template_directory() );
define( 'BWD_THEME_URI', get_template_directory_uri() );

require_once BWD_THEME_DIR . '/inc/theme-setup.php';
require_once BWD_THEME_DIR . '/inc/customizer.php';
require_once BWD_THEME_DIR . '/inc/template-tags.php';
