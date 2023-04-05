const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import apiFetch from '@wordpress/api-fetch';

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("thcc/episodes", {
  title: __("THCC Episodes", "thcc"),
  icon: 'format-video',
  category: "thcc",
  attributes: {
    episodes: {
      type: "array",
    }
},

  edit: (props) => {

    // Pulling Set Attributes and Block Attributes from props
    const {
      attributes: {
        episodes
      },
      setAttributes,
    } = props;


 

    apiFetch( { path: '/wp/v2/thcc-episodes' } ).then( posts => {
        return posts
    } ).then( ( res ) => {
        setAttributes( { episodes: res } )
    } );
    
    let showEpisodes = () =>{
       if(episodes){
        return episodes.map((topic,i)=>{
            if(topic.metadata){
              console.log(topic.metadata)
              return (
              <div className="thcc-episodes-wrapper">
              <div className='thcc-episode-thumbnail'>
                <img src={topic.featured_img_url}/>
              </div>
              <div className="thcc-episode-info">
                <div className="thcc-episode-info-inner">
                <h1>Episode {i+1}: {topic.title.rendered}</h1> 
                <p>{topic.metadata._episode_description_meta_key[0].slice(0,300)}...</p>
                <a href={topic.metadata._episode_link_meta_key[0]} className="thcc-episode-info-btn"><h5>More info</h5></a>
                </div>
              </div>
              </div>
              )
            }
        })
    }
}

    return (
      <div className={` thcc-block thcc-episodes`} >
      
            {showEpisodes()}
       
      </div>
    );
  },
  
  save(props) {
    return null;
  }
});
