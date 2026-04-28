<?php
/**
 * Helper functions.
 *
 * @package BestWebDeveloperCorporate
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function bwd_get_phone() {
	return get_theme_mod( 'bwd_phone', '+966510451995' );
}

function bwd_get_whatsapp() {
	return get_theme_mod( 'bwd_whatsapp', '+966510451995' );
}

function bwd_get_tel_link() {
	return 'tel:' . preg_replace( '/[^0-9+]/', '', bwd_get_phone() );
}

function bwd_get_wa_link() {
	$number = preg_replace( '/[^0-9]/', '', bwd_get_whatsapp() );
	return 'https://wa.me/' . $number;
}

function bwd_posted_on() {
	echo '<span class="meta-item">' . esc_html( get_the_date() ) . '</span>';
	echo '<span class="meta-item">' . esc_html( get_the_author() ) . '</span>';
}
