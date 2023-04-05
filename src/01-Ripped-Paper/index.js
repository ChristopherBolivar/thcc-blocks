const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, InnerBlocks, InspectorControls, } = wp.editor;
const { Button, IconButton, SelectControl, PanelBody, ToggleControl} = wp.components;

	
import { __experimentalInputControl as InputControl } from '@wordpress/components';


import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";



registerBlockType("thcc/rippedpaper", {
  title: __("Ripped Paper Background", "thcc"),
  icon:  'cover-image',
  category: "thcc",
 
  attributes: {
    episodeTitle: {
      type: 'string',
      source: 'html',
      selector: '.thcc-title'

    }, 
    episodeImage: {
      type: 'string',
    },
    toggleTopRip: {
      type: 'boolean',
      default: true,
      
    },
    toggleBottomRip: {
      type: 'boolean',
      default: true,
      
    },
    blockHeight: {
      type: 'srting',
      default: '300px'
      
    }
  },
  supports: {
		align: ['wide', 'full']
	},


  edit: props => {
    // Props parameter holds all the info.
    // console.info(props);
    // Lift info from props and populate various constants.
    const {
      attributes: { episodeImage, toggleTopRip, toggleBottomRip, blockHeight },
      className,
      setAttributes
    } = props; 

    const onChangeEpisodeTitle = newEpisodeTitle => {
      setAttributes( { episodeTitle: newEpisodeTitle } )
    };
    const onImageSelect = imageObject => {
    
      setAttributes( { episodeImage: imageObject.sizes.full.url } )
   
    };
    
  const onChangeToggleTopRip = () =>{
    if(toggleTopRip){
      setAttributes( { toggleTopRip: false} );
    }else {
      setAttributes( { toggleTopRip: true} );
    }
  }
    
  const onChangeToggleBottomRip = () =>{
    if(toggleBottomRip){
      setAttributes( { toggleBottomRip: false} );
    }else {
      setAttributes( { toggleBottomRip: true} );
    }
  }
  const onChangeHeight = (height) =>{
    console.info(height)
      setAttributes( { blockHeight: height} );
      
  }

  const toggleTopRipClass = toggleTopRip ? 'top-rip ' : '';
  const toggleBottomRipClass = toggleBottomRip ? 'bottom-rip ' : '';

    return [
      <InspectorControls>
      <PanelBody title={__("Ripped Paper Cover Block", "thcc_blocks")}>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
                  <ToggleControl
                  label="Toggle Top Rip"
                  onChange={onChangeToggleTopRip}
                  checked={toggleTopRip}
                  />
            </label>
          </div>
        </div>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
                  <ToggleControl
                  label="Toggle Bottom Rip"
                  onChange={onChangeToggleBottomRip}
                  checked={toggleBottomRip}
                  />
            </label>
          </div>
        </div>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
            <InputControl
                label="Block Height"
                labelPosition="top"
                value={blockHeight}
                onChange={onChangeHeight}

              />
            </label>
          </div>
        </div>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
            </label>
          </div>
        </div>
      </PanelBody>
    </InspectorControls>,
      <div className={`thcc-block thcc-ripped-paper-block thcc-editable`}>
        <div style={{backgroundImage: `url(${episodeImage})`, backgroundRepeat: 'no-repeat',height: blockHeight}} class={`${toggleTopRipClass}${toggleBottomRipClass}thcc-ripped-paper-block-wrapper`}>
          <InnerBlocks />
           
              <MediaUpload
              onSelect={onImageSelect}
              type="image"
              value={episodeImage}
              render={({open})=>(
                <IconButton
                className="thcc-logo__button"
                onClick={open}
                icon="format-image"
                showToolTip="true"
                label={__("Change image.", 'thcc')}
                />
        )}
              />
        </div>
      </div>
    ];
  },
  save: props => {
      // Lift info from props and populate various constants.
      const {
        attributes: { episodeTitle, episodeImage, toggleBottomRip, toggleTopRip,blockHeight },
      } = props; 

      const toggleTopRipClass = toggleTopRip ? 'top-rip ' : '';
      const toggleBottomRipClass = toggleBottomRip ? 'bottom-rip ' : '';


    return (
      <div className="thcc-block thcc-ripped-paper-block thcc-editable`">
        <div style={{backgroundImage: `url(${episodeImage})`, backgroundRepeat: 'no-repeat',height: blockHeight}}  class={`${toggleTopRipClass}${toggleBottomRipClass}thcc-ripped-paper-block-wrapper`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
});