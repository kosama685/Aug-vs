<?php
/**
 * Setup and enqueue.
 *
 * @package BestWebDeveloperCorporate
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function bwd_theme_setup() {
	load_theme_textdomain( 'bwd-corporate', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/main.css' );

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 80,
			'width'       => 240,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'bwd-corporate' ),
			'footer'  => __( 'Footer Menu', 'bwd-corporate' ),
		)
	);
}
add_action( 'after_setup_theme', 'bwd_theme_setup' );

function bwd_enqueue_assets() {
	wp_enqueue_style( 'bwd-main', BWD_THEME_URI . '/assets/css/main.css', array(), BWD_THEME_VERSION );
	wp_enqueue_script( 'bwd-main', BWD_THEME_URI . '/assets/js/main.js', array(), BWD_THEME_VERSION, true );
	wp_localize_script(
		'bwd-main',
		'bwdTheme',
		array(
			'isReducedMotion' => wp_get_global_settings( array( 'settings', 'appearanceTools' ) ) ? '0' : '0',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'bwd_enqueue_assets' );

function bwd_register_sidebars() {
	register_sidebar(
		array(
			'name'          => __( 'Sidebar', 'bwd-corporate' ),
			'id'            => 'sidebar-1',
			'description'   => __( 'Main sidebar area for blog and archive templates.', 'bwd-corporate' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer Widgets', 'bwd-corporate' ),
			'id'            => 'footer-1',
			'description'   => __( 'Footer widget area.', 'bwd-corporate' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'bwd_register_sidebars' );
