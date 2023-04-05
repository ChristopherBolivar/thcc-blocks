<?php

/**
 * Plugin Name: Chris's Blocks
 * Plugin URI: https://christopherbolivar/gutenberg-blocks
 * Description: Custom block plugin by Christopher Bolivar
 * Version: 1.0.0
 * Author: Christopher Bolivar
 *
 * @package thcc
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 * 
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action( 'init', 'thcc_load_textdomain' );

function thcc_load_textdomain() {
	load_plugin_textdomain( 'thcc', false, basename( __DIR__ ) . '/languages' );
}

/** 
 * Add custom image size for block featured image.
 * 
 * @link https://developer.wordpress.org/reference/functions/add_image_size/
 */
add_action( 'init', 'thcc_add_image_size' );

function thcc_add_image_size() {
	add_image_size( 'thccFeatImg', 250, 250, array( 'center', 'center' ) ); 
}

/** 
 * Register custom image size with sizes list to make it available.
 * 
 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
 */
add_filter( 'image_size_names_choose', 'thcc_custom_sizes' );

function thcc_custom_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'thccFeatImg' => __('thcc Featured Image'),
	) );
}

/** 
 * Add custom "thcc" block category
 * 
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'thcc_block_categories', 10, 2 );

function thcc_block_categories( $categories, $post ) {

	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'thcc',
				'title' => __( 'THCC Blocks', 'thcc' ),
				'icon'  => 'smiley',
			),
		)
	);
}




/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action( 'init', 'thcc_register_blocks' );

function thcc_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'thcc-editor-script',											// label
		plugins_url( 'build/index.js', __FILE__ ),						// script file
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),		// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		'thcc-editor-styles',											// label
		plugins_url( 'build/editor.css', __FILE__ ),					// CSS file
		array( 'wp-edit-blocks' ),										// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )	// set version as file last modified time
	);

	// Register the front-end stylesheet.
	wp_register_style(
		'thcc-front-end-styles',										// label
		plugins_url( 'build/style.css', __FILE__ ),						// CSS file
		array( ),														// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )	// set version as file last modified time
	);

	// Array of block created in this plugin.
	$blocks = [
		'thcc/rippedpaper',
		'thcc/headline',
		'thcc/paragraph'
	];
	
	// Loop through $blocks and register each block with the same script and styles.
	foreach( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'thcc-editor-script',					// Calls registered script above
			'editor_style' => 'thcc-editor-styles',					// Calls registered stylesheet above
			'style' => 'thcc-front-end-styles',						// Calls registered stylesheet above
		) );	  
	}

	// Register dynamic block.
		register_block_type( 'thcc/topics', array(
			'editor_script' => 'thcc-editor-script',
			'editor_style' => 'thcc-editor-styles',
			'style' => 'thcc-front-end-styles',
			'render_callback' => 'thcc_dynamic_render_callback'
		) );

			// Register dynamic block.
			register_block_type( 'thcc/episodes', array(
				'editor_script' => 'thcc-editor-script',
				'editor_style' => 'thcc-editor-styles',
				'style' => 'thcc-front-end-styles',
				'render_callback' => 'thcc_episodes_render_callback'
			) );
	

	if ( function_exists( 'wp_set_script_translations' ) ) {
	/**
	 * Adds internationalization support. 
	 * 
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
	 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
	 */
	wp_set_script_translations( 'thcc-editor-script', 'thcc', plugin_dir_path( __FILE__ ) . '/languages' );
	}

}

/**
 * Build classes based on block attributes.
 * Returns string of classes.
 * 
 * $attributes - array - Block attributes.
 */
function thcc_block_classes( $attributes ) {
	$classes = null;
	if ( $attributes['align'] ) {
		$classes = 'align' . $attributes['align'] . ' ';
	}

	if ( $attributes['className'] ) {
		$classes .= $attributes['className']; 
	}

	return $classes;
}

/**
 * Serve up featured image is available, otherwise serve up logo.
 * Returns <img> element.
 * 
 * $post - object - The post object.
 */ 
function thcc_post_img( $post ) {
	$thcc_img = get_the_post_thumbnail( $post, 'thccFeatImg' );
	if ( empty( $thcc_img ) ) {
		$url = plugins_url( "src/bv-logo-white.svg", __FILE__ );
		$thcc_img = '<img src="' . $url . '" alt="Podtcast thumbnail" />';
	}
	return $thcc_img;
}

/**
 * Render the saved output from the dynamic block.
 * 
 * $attributes - array - Block attributes.
 * $content - Block inner content.
 */
function thcc_dynamic_render_callback( $attributes, $content ) {

	
		$args = array(
			'post_type' => 'thcc-episodes',
			'posts_per_page' => 100,
			'tax_query' => array(
				array(
					'taxonomy' => 'topics',
					'field' => 'slug',
					'terms' => array($postType) //excluding the term you dont want.
				)
			)
		);
		$the_query = new WP_Query( $args ); 
		
	
	$terms = get_terms( array(
			'taxonomy'   => 'topics', // Swap in your custom taxonomy name
			'hide_empty' => true, 
	));
	
	
	// Loop through all terms with a foreach loop
	$topicString = '<ul class="episode-topic-list">';
		
		foreach( $terms as $term ) {
			$topicString .= ' <li class="thcc-topic-list"><a href="/topic/'. $term->slug . '">'. $term->name .' ('.$term->count.')</a></li> ';
		}
		$topicString .= '</ul>';

		return $topicString;
	
	// Reset main query object
	$wp_query = NULL;
	$wp_query = $temp_query;


	
	

	// Reset postdata to avoid conflicts.
	wp_reset_postdata();
	
}


/**
 * Render the saved output from the dynamic block.
 * 
 * $attributes - array - Block attributes.
 * $content - Block inner content.
 */
function thcc_episodes_render_callback( $attributes, $content ) {

	      // WP_Query arguments
		  $args = array(
            'post_type'              => array( 'thcc-episodes' ),
            'post_status'            => array( 'publish' ),
            'order'                  => 'DSC',
            'orderby'                => 'publish_date',
        );

        // The Query
        $query = new WP_Query( $args );
        $episodeString = '';
	
        // The Loop
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
               
                $episodeString .= '<div class="thcc-episodes-wrapper">
				<div class="thcc-episode-thumbnail">
					<div class="thcc-episode-thumbnail-inner">
				  		<img src="'. esc_html(  get_the_post_thumbnail_url(get_the_ID(),'full') ) .'"/>
				  	</div>
				</div>
				<div class="thcc-episode-info">
				 <div class="thcc-episode-info-inner">
				  <h1>'. esc_html( get_the_title() ) .'</h1>
				  <p>'. esc_html(  substr(get_post_meta(get_the_id(), '_episode_description_meta_key', true),0,300) )  .'...</p>
				  <a target="_blank" href="' . esc_html(  get_post_meta(get_the_id(), '_episode_link_meta_key', true) ) . '" class="thcc-episode-info-btn"><h5>More info</h5></a>
				 </div>
				</div>
				</div>';
				$total -=  1;
			
                
            }
        } else {
            // no posts found
        }

		return $episodeString;

        // Restore original Post Data
        wp_reset_postdata();

}
