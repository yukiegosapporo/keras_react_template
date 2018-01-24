import React from "react";
import UploadImage from "./upload_image"

//require('../css/styles.css');
var $ = require('jquery');

import HeaderBackgroundImage from '../images/header.jpg';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    addHeaderImg() {
        let headerBg = new Image();
        headerBg.src = HeaderBackgroundImage;
    }

    render () {
        return (
                <div className='header-contents'>
                    {this.addHeaderImg()}
                <UploadImage />
                </div>
        );
    }
}
