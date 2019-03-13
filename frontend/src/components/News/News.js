import React from 'react';
import './newsStyle.css';


const News = (props) => (
       
    <div className="news">
        <img className="picture" src={props.picture} alt="Slika"/>
        <h3 className="title"><a href={props.link}>{props.title}</a></h3>
        <div className="description">
            <p>{props.description}</p>
        </div>
    </div>
 );

export default News;
