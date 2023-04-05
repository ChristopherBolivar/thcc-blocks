const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, InnerBlocks, InspectorControls, } = wp.editor;
const {  PanelBody, FontSizePicker, FormToggle} = wp.components;


import { useBlockProps, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';

registerBlockType("thcc/paragraph", {
  title: __("Paragraph Block", "thcc"),
  icon:  'heading',
  category: "thcc",
 
  attributes: {
    headlineText: {
      type: 'string',
      default: 'Headline..'
    },
    fontSize: {
      type: 'string',
      default: 'small'
    },
    activateLink: {
      type: 'boolean',
      default: false,
    },
    postURL: {
      type: "object",
      default: {
        opensInNewTab: false,
    }
      
    },
  
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
      attributes: { headlineText, fontSize, activateLink,postURL },
      className,
      setAttributes
    } = props; 

  
    
 
  const onChangeParagraphText = (text) =>{
   
      setAttributes( { headlineText: text} );
      
  }

  const setNewFontSize = (size) =>{
    setAttributes( { fontSize: size} );
  }

  const toggleBtnLink = (e) =>{
    console.log(e)
    if(!activateLink){
      setAttributes( { activateLink: true} );
    }else {
      setAttributes( { activateLink: false} );
    }
  }
  const toggleNewTab = (e) =>{
    console.log(postURL)
  }

  const showLinkInput = () => {
    if(activateLink){
    return (
    <div className='components-base-control'>
    <div className='components-base-control__field'>
      <label className='components-base-control__label'>
      <h3>{__('Insert URL', 'thcc_block')}</h3>
      <LinkControl
					searchInputPlaceholder="Search here..."
					value={ postURL }
					settings={[
						{
							id: 'opensInNewTab',
							title: 'New tab?',
              onChange: toggleNewTab(),

						},
					]}
					onChange={ ( newpostURL ) => setAttributes( { postURL: newpostURL } ) }
					withCreateSuggestion={true}
					createSuggestion={ (inputValue) => setAttributes( { postURL: {
						...postURL,
						title: inputValue,
						type: "custom-url",
						id: Date.now(),
						url: inputValue
					} } ) }
					createSuggestionButtonText={ (newValue) => `${__("New:")} ${newValue}` }
				>
				</LinkControl>
      </label>
    </div>
  </div>
  )
    }
  }


  const fontSizes = [
    {
        name: __( 'Small' ),
        slug: 'small',
        size: 12,
    },
    {
        name: __( 'Big' ),
        slug: 'big',
        size: 26,
    },
];

    return [
      <InspectorControls>
      <PanelBody title={__("Paragraph Block Setting", "thcc_blocks")}>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
                  <FontSizePicker
                  fontSizes={ fontSizes }
                  value={ fontSize }
                  fallbackFontSize={ 12 }
                  onChange={ setNewFontSize }
                />
   
            </label>
          </div>
        </div>
        <div className='components-base-control'>
          <div className='components-base-control__field'>
            <label className='components-base-control__label'>
            <h3>{__("Activate Button Link", "thcc_blocks")}</h3>
                <FormToggle
                  onChange={ toggleBtnLink }
                  checked={activateLink}
                />
            </label>
          </div>
        </div>
        {showLinkInput()}
      </PanelBody>
    </InspectorControls>,
      <div className={`${className} thcc-block thcc-paragraph-block thcc-editable`}>
         {!activateLink ? <div> <div className="thcc-block-paragraph-wrapper">
                    <span className="thcc-combined">
                    <thccBtn>
                        <RichText
                        tagName="p" // The tag here is the element output and editable in the admin
                        className="thcc-dummy-headline thcc-block-paragraph-text"
                        onChange={onChangeParagraphText}
                        value={headlineText}
                        style={{fontSize: fontSize}}
                        />
                      </thccBtn>
                    </span>
                    <span>
                    <thccBtn>
                      <RichText
                          tagName="p" // The tag here is the element output and editable in the admin
                          className="thcc-block-headline thcc-block-paragraph-text"
                          onChange={onChangeParagraphText}
                          value={headlineText}
                          style={{fontSize: fontSize}}
                          />
                    </thccBtn>
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
              </svg></div>: ''}

        {postURL.opensInNewTab && activateLink ? <a  href="#"> <div className="thcc-block-paragraph-wrapper">
                    <span className="thcc-combined">
                    <thccBtn>
                        <RichText
                        tagName="p" // The tag here is the element output and editable in the admin
                        className="thcc-dummy-headline thcc-block-paragraph-text"
                        onChange={onChangeParagraphText}
                        value={headlineText}
                        style={{fontSize: fontSize}}
                        />
                      </thccBtn>
                    </span>
                    <span>
                    <thccBtn>
                      <RichText
                          tagName="p" // The tag here is the element output and editable in the admin
                          className="thcc-block-headline thcc-block-paragraph-text"
                          onChange={onChangeParagraphText}
                          value={headlineText}
                          style={{fontSize: fontSize}}
                          />
                    </thccBtn>
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
              </svg></a>: ''}

              {!postURL.opensInNewTab && activateLink ? <a href="#"> <div className="thcc-block-paragraph-wrapper">
                    <span className="thcc-combined">
                    <thccBtn>
                        <RichText
                        tagName="p" // The tag here is the element output and editable in the admin
                        className="thcc-dummy-headline thcc-block-paragraph-text"
                        onChange={onChangeParagraphText}
                        value={headlineText}
                        style={{fontSize: fontSize}}
                        />
                      </thccBtn>
                    </span>
                    <span>
                    <thccBtn>
                      <RichText
                          tagName="p" // The tag here is the element output and editable in the admin
                          className="thcc-block-headline thcc-block-paragraph-text"
                          onChange={onChangeParagraphText}
                          value={headlineText}
                          style={{fontSize: fontSize}}
                          />
                    </thccBtn>
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
              </svg></a>: ''}

             

              
            
      </div>
    ];
  },
  save: props => {
      // Lift info from props and populate various constants.
      const {
        attributes: { headlineText, fontSize, activateLink, postURL },
        className
      } = props; 


    return (
      <div className={`${className} thcc-block thcc-paragraph-block thcc-editable`}>
        
        {!activateLink ? <div> <div className="thcc-block-paragraph-wrapper">
            <span className="thcc-combined">
            <thccBtn>
                <RichText.Content
                tagName="p" // The tag here is the element output and editable in the admin
                className="thcc-dummy-headline thcc-block-paragraph-text"
                
                value={headlineText}
                style={{fontSize: fontSize}}
                />
              </thccBtn>
            </span>
            <span>
            <thccBtn>
              <RichText.Content
                  tagName="p" // The tag here is the element output and editable in the admin
                  className="thcc-block-headline thcc-block-paragraph-text"
                  
                  value={headlineText}
                  style={{fontSize: fontSize}}
                  />
            </thccBtn>
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
      </svg></div>: ''}
        {activateLink && postURL.opensInNewTab  ? <a target="_blank" href={postURL.url} rel="noopener"> <div className="thcc-block-paragraph-wrapper">
            <span className="thcc-combined">
            <thccBtn>
                <RichText.Content
                tagName="p" // The tag here is the element output and editable in the admin
                className="thcc-dummy-headline thcc-block-paragraph-text"
                
                value={headlineText}
                style={{fontSize: fontSize}}
                />
              </thccBtn>
            </span>
            <span>
            <thccBtn>
              <RichText.Content
                  tagName="p" // The tag here is the element output and editable in the admin
                  className="thcc-block-headline thcc-block-paragraph-text"
                  
                  value={headlineText}
                  style={{fontSize: fontSize}}
                  />
            </thccBtn>
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
      </svg></a>: ''}

      {activateLink  &&  !postURL.opensInNewTab ? <a href={postURL.url} rel="noopener"> <div className="thcc-block-paragraph-wrapper">
            <span className="thcc-combined">
            <thccBtn>
                <RichText.Content
                tagName="p" // The tag here is the element output and editable in the admin
                className="thcc-dummy-headline thcc-block-paragraph-text"
                
                value={headlineText}
                style={{fontSize: fontSize}}
                />
              </thccBtn>
            </span>
            <span>
            <thccBtn>
              <RichText.Content
                  tagName="p" // The tag here is the element output and editable in the admin
                  className="thcc-block-headline thcc-block-paragraph-text"
                  
                  value={headlineText}
                  style={{fontSize: fontSize}}
                  />
            </thccBtn>
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
      </svg></a>: ''}

      

      
    
</div>
    );
  }
});