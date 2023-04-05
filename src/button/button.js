import PropTypes from 'prop-types'
import React, { Component } from 'react'
const { RichText } = wp.editor;
export class button extends Component {
  static propTypes = {}



  render() {
   console.log(this.props.children,'here')
    return (
      <div className={`thcc-block thcc-headline-block thcc-editable`}>
      <div className="thcc-block-headline-wrapper">
                    <span className="thcc-combined">
                    {this.props.children}
                    </span>
                    <span>
                    {this.props.children}
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
                <defs>
                    <filter id="turbulence">
                        <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="200" />
                    </filter>
                    <filter id="displacement">
                        <feDisplacementMap in="SourceGraphic" scale="24" />
                    </filter>
                    <filter id="combined">
                        <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="200" />
                        <feDisplacementMap in="SourceGraphic" scale="4" />
                    </filter>
                </defs>
            </svg>
</div>
    )
  }
}

export default button