<?php
/**
 * Theme customizer options.
 *
 * @package BestWebDeveloperCorporate
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function bwd_sanitize_phone( $input ) {
	return preg_replace( '/[^0-9+]/', '', (string) $input );
}

function bwd_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'bwd_contact_section',
		array(
			'title'    => __( 'Business Contact', 'bwd-corporate' ),
			'priority' => 30,
		)
	);

	$wp_customize->add_setting( 'bwd_phone', array( 'default' => '+966510451995', 'sanitize_callback' => 'bwd_sanitize_phone' ) );
	$wp_customize->add_control( 'bwd_phone', array( 'label' => __( 'Phone Number', 'bwd-corporate' ), 'section' => 'bwd_contact_section', 'type' => 'text' ) );

	$wp_customize->add_setting( 'bwd_whatsapp', array( 'default' => '+966510451995', 'sanitize_callback' => 'bwd_sanitize_phone' ) );
	$wp_customize->add_control( 'bwd_whatsapp', array( 'label' => __( 'WhatsApp Number', 'bwd-corporate' ), 'section' => 'bwd_contact_section', 'type' => 'text' ) );

	$wp_customize->add_section( 'bwd_hero_section', array( 'title' => __( 'Homepage Hero', 'bwd-corporate' ), 'priority' => 31 ) );

	$wp_customize->add_setting( 'bwd_hero_title', array( 'default' => 'Modern Corporate Websites That Help Your Business Grow', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'bwd_hero_title', array( 'label' => __( 'Hero Title', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'text' ) );

	$wp_customize->add_setting( 'bwd_hero_subtitle', array( 'default' => 'bestwebdeveloper.org builds premium websites, WordPress solutions, SEO-ready service pages, and conversion-focused digital experiences for modern businesses.', 'sanitize_callback' => 'sanitize_textarea_field' ) );
	$wp_customize->add_control( 'bwd_hero_subtitle', array( 'label' => __( 'Hero Subtitle', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'textarea' ) );

	$wp_customize->add_setting( 'bwd_hero_btn_primary_text', array( 'default' => 'Start Your Project', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'bwd_hero_btn_primary_text', array( 'label' => __( 'Hero Primary Button Text', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'text' ) );

	$wp_customize->add_setting( 'bwd_hero_btn_primary_url', array( 'default' => '/contact', 'sanitize_callback' => 'esc_url_raw' ) );
	$wp_customize->add_control( 'bwd_hero_btn_primary_url', array( 'label' => __( 'Hero Primary Button URL', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'url' ) );

	$wp_customize->add_setting( 'bwd_hero_btn_secondary_text', array( 'default' => 'Explore Services', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'bwd_hero_btn_secondary_text', array( 'label' => __( 'Hero Secondary Button Text', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'text' ) );

	$wp_customize->add_setting( 'bwd_hero_btn_secondary_url', array( 'default' => '/services', 'sanitize_callback' => 'esc_url_raw' ) );
	$wp_customize->add_control( 'bwd_hero_btn_secondary_url', array( 'label' => __( 'Hero Secondary Button URL', 'bwd-corporate' ), 'section' => 'bwd_hero_section', 'type' => 'url' ) );

	$wp_customize->add_setting( 'bwd_contact_intro', array( 'default' => 'Speak directly with bestwebdeveloper.org to discuss your website, landing page, UI/UX, SEO, or branding goals.', 'sanitize_callback' => 'sanitize_textarea_field' ) );
	$wp_customize->add_control( 'bwd_contact_intro', array( 'label' => __( 'Contact Intro Text', 'bwd-corporate' ), 'section' => 'bwd_contact_section', 'type' => 'textarea' ) );

	$wp_customize->add_section( 'bwd_footer_section', array( 'title' => __( 'Footer Content', 'bwd-corporate' ), 'priority' => 40 ) );
	$wp_customize->add_setting( 'bwd_footer_description', array( 'default' => 'bestwebdeveloper.org helps businesses launch modern, fast, and conversion-focused websites with premium design and reliable performance.', 'sanitize_callback' => 'sanitize_textarea_field' ) );
	$wp_customize->add_control( 'bwd_footer_description', array( 'label' => __( 'Footer Description', 'bwd-corporate' ), 'section' => 'bwd_footer_section', 'type' => 'textarea' ) );

	$wp_customize->add_setting( 'bwd_footer_copyright', array( 'default' => '© ' . gmdate( 'Y' ) . ' bestwebdeveloper.org. All rights reserved.', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'bwd_footer_copyright', array( 'label' => __( 'Footer Copyright', 'bwd-corporate' ), 'section' => 'bwd_footer_section', 'type' => 'text' ) );

	$wp_customize->add_section( 'bwd_brand_colors', array( 'title' => __( 'Brand Colors', 'bwd-corporate' ), 'priority' => 35 ) );
	$wp_customize->add_setting( 'bwd_primary_color', array( 'default' => '#4f8dff', 'sanitize_callback' => 'sanitize_hex_color' ) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'bwd_primary_color', array( 'label' => __( 'Primary Color', 'bwd-corporate' ), 'section' => 'bwd_brand_colors' ) ) );
	$wp_customize->add_setting( 'bwd_accent_color', array( 'default' => '#2de2c4', 'sanitize_callback' => 'sanitize_hex_color' ) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'bwd_accent_color', array( 'label' => __( 'Accent Color', 'bwd-corporate' ), 'section' => 'bwd_brand_colors' ) ) );
}
add_action( 'customize_register', 'bwd_customize_register' );

function bwd_customizer_css() {
	$primary = get_theme_mod( 'bwd_primary_color', '#4f8dff' );
	$accent  = get_theme_mod( 'bwd_accent_color', '#2de2c4' );
	?>
	<style id="bwd-customizer-css">
		:root { --primary: <?php echo esc_html( $primary ); ?>; --accent: <?php echo esc_html( $accent ); ?>; }
	</style>
	<?php
}
add_action( 'wp_head', 'bwd_customizer_css' );
