const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, InnerBlocks, InspectorControls, } = wp.editor;
const { Button, IconButton, SelectControl, PanelBody, ToggleControl} = wp.components;

import {button as thccBtn} from '../button/button'
import { __experimentalInputControl as InputControl } from '@wordpress/components';


import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";



registerBlockType("thcc/headline", {
  title: __("Headline Block", "thcc"),
  icon:  'heading',
  category: "thcc",
 
  attributes: {
    headlineText: {
      type: 'string',
      default: 'Headline..'
    }
  },
  supports: {
		align: ['center']
	},
   styles: [
    {
        name: 'yellow',
        label: __( 'Yellow', "thcc" ),
        isDefault: true
    },
    {
        name: 'black',
        label: __( 'Black', "thcc" )
    },
  
  ],


  edit: props => {
    // Props parameter holds all the info.
    // console.info(props);
    // Lift info from props and populate various constants.
    const {
      attributes: { headlineText },
      className,
      setAttributes
    } = props; 

  
    
 
  const onChangeHeadlineText = (text) =>{
   
      setAttributes( { headlineText: text} );
      
  }

    return [
      <InspectorControls>
      <PanelBody title={__("Ripped Paper Cover Block", "thcc_blocks")}>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
                  
            </label>
          </div>
        </div>
      
      </PanelBody>
    </InspectorControls>,
      <div className={`${className} thcc-block thcc-headline-block thcc-editable`}>
                <div className="thcc-block-headline-wrapper">
                  
                    <span className="thcc-combined">
                    <RichText
                        tagName="h1" // The tag here is the element output and editable in the admin
                        allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                        className="thcc-dummy-headline thcc-block-headline-text"
                        placeholder={ __( 'Heading...' ) } 
                        value={headlineText}
                    />
                    </span>
                    <span>
                    <RichText
                        tagName="h1" // The tag here is the element output and editable in the admin
                        className="thcc-block-headline thcc-block-headline-text"
                        allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                        placeholder={ __( 'Heading...' ) } 
                        value={headlineText}
                        onChange={onChangeHeadlineText}
                    />
                    </span>
                </div>
                <svg xmlns="https://www.w3.org/2000/svg" version="1.1" height="0" width="0">
                  <defs>
                      <filter id="turbulence">
                          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" />
                      </filter>
                      <filter id="displacement">
                          <feDisplacementMap in="SourceGraphic" scale="4" />
                      </filter>
                      <filter id="combined">
                          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" />
                          <feDisplacementMap in="SourceGraphic" scale="4" />
                      </filter>
                  </defs>
              </svg>

      </div>
    ];
  },
  save: props => {
      // Lift info from props and populate various constants.
      const {
        attributes: { headlineText },
      } = props; 


    return (
      <div className={`thcc-block thcc-headline-block thcc-editable`}>
      <div className="thcc-block-headline-wrapper">
                    <span className="thcc-combined">
                    <RichText.Content
                      tagName="h1" // The tag here is the element output and editable in the admin
                      className="thcc-dummy-headline thcc-block-headline-text"
                      value={headlineText}
                      />
                    </span>
                    <span>
                    <RichText.Content
                      tagName="h1" // The tag here is the element output and editable in the admin
                      className="thcc-block-headline thcc-block-headline-text"
                      value={headlineText}
                      />
                    </span>
                </div>
      <svg xmlns="https://www.w3.org/2000/svg" version="1.1" height="0" width="0">
        <defs>
            <filter id="turbulence">
                <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" />
            </filter>
            <filter id="displacement">
                <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
            <filter id="combined">
                <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" />
                <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
        </defs>
    </svg>

</div>
    );
  }
});