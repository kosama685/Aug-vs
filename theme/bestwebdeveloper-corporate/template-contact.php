<?php
/**
 * Template Name: Contact Page
 */
get_header();
?>
<section class="section container page-hero card">
	<p class="eyebrow">Contact bestwebdeveloper.org</p>
	<h1>Let’s Build Your Next Digital Project</h1>
	<p><?php echo esc_html( get_theme_mod( 'bwd_contact_intro', 'Speak directly with bestwebdeveloper.org to discuss your website, landing page, UI/UX, SEO, or branding goals.' ) ); ?></p>
	<div class="btn-row">
		<a class="btn btn-primary" href="<?php echo esc_url( bwd_get_tel_link() ); ?>">Call <?php echo esc_html( bwd_get_phone() ); ?></a>
		<a class="btn btn-secondary" href="<?php echo esc_url( bwd_get_wa_link() ); ?>" target="_blank" rel="noopener">WhatsApp <?php echo esc_html( bwd_get_whatsapp() ); ?></a>
	</div>
</section>
<section class="section container card-grid two contact-layout">
	<article class="card"><h2>Contact Form</h2><p>Use this layout with your preferred WordPress form plugin (Contact Form 7, WPForms, Gravity Forms, or similar).</p><form class="contact-form" method="post" action="#" onsubmit="return false;"><label for="name">Name</label><input id="name" type="text" required><label for="email">Email</label><input id="email" type="email" required><label for="service">Service Needed</label><select id="service"><option>Corporate Website Design</option><option>WordPress Development</option><option>SEO Services</option><option>Landing Page Design</option><option>UI/UX and Branding</option></select><label for="message">Project Details</label><textarea id="message" rows="5"></textarea><button type="submit" class="btn btn-primary">Form design only — connect plugin to enable sending</button></form></article>
	<article class="card"><h2>Business Information</h2><ul class="clean-list"><li><strong>Website:</strong> bestwebdeveloper.org</li><li><strong>Phone:</strong> <?php echo esc_html( bwd_get_phone() ); ?></li><li><strong>WhatsApp:</strong> <?php echo esc_html( bwd_get_whatsapp() ); ?></li></ul><h3>Service Inquiry Guidance</h3><p>Share your goals, target audience, current website link, required services, and expected launch timeline for faster recommendations.</p><div class="faq"><button class="faq-toggle" aria-expanded="false">How quickly can we start?</button><div class="faq-content"><p>Initial planning can begin immediately after first contact and scope confirmation.</p></div><button class="faq-toggle" aria-expanded="false">Which services can be combined?</button><div class="faq-content"><p>Corporate web design, WordPress, SEO pages, landing pages, and branding can be delivered as one integrated package.</p></div></div></article>
</section>
<?php get_footer();
