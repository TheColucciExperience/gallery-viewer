
// Main script for importing assets, modules, etc.

import './index.html'
import './scss/styles.scss';
import jsonData from './json/gallery-data.json';

// IIFE for script initiation

(function main(window, document, $) {

	'use strict';

	$(function initScript() {

		// ** Variables **

		// Object to keep trackof images list and index

		const imagesData = {
				list: jsonData.images,
				// This is to keep track of the current image index, initial one is 0
				listIndex: 0,
				info: jsonData.info
			},
			/**
			 * Object to keep track whether the user can change images
			 * and which block is active
			 */
			interfaceData = {
				imageCanChange: false,
				infoCanChange: false,
				firstBlockActive: true,
				infoShown: false
			},
			// Getting necessary dom elements
			$imageBlock1 = $( '.js-image-block-1' ),
			$imageBlock2 = $( '.js-image-block-2' ),
			$prevBtn = $( '.js-prev-btn' ),
			$nextBtn = $( '.js-next-btn' ),
			$infoBtn = $( '.js-info-btn' );			

		// ** Synchronous code **/

		// Appending first image on the list and updating

		$imageBlock1.append(
			createImg( imagesData.list[0].name, imagesData.list[0].alt )
		);		

		// Showing main section and animating image box

		$( '.b-main' )
			.css( 'animation', 'fadeIn .5s ease forwards' );
		$( '.b-images-container' )
			.css( 'animation', 'zoomImage .5s ease .3s forwards' );

		// Updating github link and info section text

		$( '.js-github-link' ).attr( 'href', imagesData.info.githubLink );
		$( '.b-info-section__title' ).text( imagesData.info.infoTitle );
		$( '.b-info-section__text' ).text( imagesData.info.infoText );

		// Adding listeners to buttons

		$nextBtn.on( 'click', function handleNextClick() {

			if ( interfaceData.imageCanChange ) {

				interfaceData.imageCanChange = false;				
				window.requestAnimationFrame( function callHandler() {					
					changeImage( true );
				} );

			}

		} );

		$prevBtn.on( 'click', function handlePrevClick() {

			if ( interfaceData.imageCanChange ) {

				interfaceData.imageCanChange = false;
				window.requestAnimationFrame( function callHandler() {
					changeImage( false );
				} );

			}

		} );

		$infoBtn.on( 'click', function handleInfoClick() {

			if ( interfaceData.infoCanChange ) {

				interfaceData.infoCanChange = false;
				window.requestAnimationFrame( function callHandler() {
					toggleInfo();
				} );

			}

		} );

		// Allowing user to interact after initial animation

		window.setTimeout( function returnUserControl() {
			interfaceData.imageCanChange = true;
			interfaceData.infoCanChange = true;
		}, 600 );

		// ** Functions **

		// Function to change images

		function changeImage(isNext) {

			// Validation will be done on the listener (imageCanChange)

			// Variables to hold active and unactive blocks

			let $activeBlock,
				$unactiveBlock;

			if ( interfaceData.firstBlockActive ) {
				$activeBlock = $imageBlock1;
				$unactiveBlock = $imageBlock2;
			}
			else {
				$activeBlock = $imageBlock2;
				$unactiveBlock = $imageBlock1;
			}			

			if ( isNext ) {

				// Starting animations and updating index

				$activeBlock.css( 'animation', 'slideToLeft .4s ease forwards' );
				$unactiveBlock.css( 'animation', 'slideFromRight .4s ease forwards' );

				if ( ++imagesData.listIndex >= imagesData.list.length ) {
					imagesData.listIndex = 0;
				}

			}
			else {

				// Starting animations and updating index

				$activeBlock.css( 'animation', 'slideToRight .4s ease forwards' );
				$unactiveBlock.css( 'animation', 'slideFromLeft .4s ease forwards' );

				if ( --imagesData.listIndex < 0 ) {
					imagesData.listIndex = imagesData.list.length - 1;
				}

			}			

			// Cleaning unactive block and creating image in it

			$unactiveBlock				
				.toggleClass( 'b-image-block--hidden' )
				.empty()
				.append(
					createImg(
						imagesData.list[ imagesData.listIndex ].name,
						imagesData.list[ imagesData.listIndex ].alt
					)
				);

			// Timeout to finish transition

			window.setTimeout( function finishTransition() {

				/**
				 * Returning user control, hiding current unactive block
				 * and updating interface info
				 */

				$activeBlock.toggleClass( 'b-image-block--hidden' );
				interfaceData.firstBlockActive = !interfaceData.firstBlockActive;
				interfaceData.imageCanChange = true;

			}, 400 );			

		}

		// Function to show/hide information block

		function toggleInfo() {			

			// Getting DOM elements through jQuery

			const $infoBox = $( '.b-info-container' ),
				$infoSection = $( '.b-info-section' );

			if ( !interfaceData.infoShown ) {

				$infoBox.css( 'animation', 'fadeIn .4s ease forwards' );
				$infoSection.css( 'animation', 'slideInfoIn .5s ease forwards' );
				$infoBtn.empty().append( '<span class="fas fa-times"></span>' );

			}
			else {

				$infoBox.css( 'animation', 'fadeOut .4s ease forwards' );
				$infoSection.css( 'animation', 'slideInfoOut .5s ease forwards' );
				$infoBtn.empty().append( '<span class="fas fa-question-circle"></span>' );
			}

			// Returning user control and updating changes

			window.setTimeout( function returnUserControl() {
				interfaceData.infoShown = !interfaceData.infoShown;
				interfaceData.infoCanChange = true;
			}, 500 );
			
		}

		// Function to create image objects and return them

		function createImg(imgName, alt) {

			const $img = $( '<img/>' );
			// Setting attributes
			$img.attr( {
				'src': `./images/${ imgName }`,
				'alt': alt
			} );

			// Adding necessary classes

			$img.addClass( 'b-image-block__image' );

			return $img;

		}

	});

})(window, document, jQuery);