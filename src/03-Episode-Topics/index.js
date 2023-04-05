const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import apiFetch from '@wordpress/api-fetch';

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("thcc/topics", {
  title: __("THCC Episode Topics", "thcc"),
  icon: 'editor-ul',
  category: "thcc",
  attributes: {
    episodeTopics: {
      type: "array",
    }
},

  edit: (props) => {

    // Pulling Set Attributes and Block Attributes from props
    const {
      attributes: {
        episodeTopics
      },
      setAttributes,
    } = props;


 

    apiFetch( { path: '/wp/v2/topics' } ).then( posts => {
        return posts
    } ).then( ( res ) => {
        setAttributes( { episodeTopics: res } )
    } );
    
    let showTopics = () =>{
       if(episodeTopics){
        return episodeTopics.map((topic,i)=>{
            return (<li class="thcc-topic-list"><a href="#">{topic.name} ({topic.count})</a></li>)
        })
    }
}

    return (
      <div className={` thcc-block thcc-topics`} >
        <ul>
            {showTopics()}
        </ul> 
      </div>
    );
  },
  
  save(props) {
    return null;
  }
});
