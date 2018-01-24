import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import superagent from 'superagent';
import ReactTable from 'react-table'
//require('../css/styles.css');
import { Button, Grid, Row, Col, Media, PageHeader } from "react-bootstrap";

const dropzoneStyle = {
    width  : "70%",
    height : "30%",
    border : "2px dashed #0087F7"
};

const dropzoneMessageStyle = {
  'text-align': 'center',
  'vertical-align': 'middle',
  'line-height': '180px'
}

export default class UploadImage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {response: [], objects: [], droppedfile: null};
      }


    onDrop(acceptedFiles, rejectedFiles) {
      this.setState({droppedfile: acceptedFiles})
      let req = superagent.post(window.location.href + 'recipes');
      acceptedFiles.forEach(file => {
        req.attach(['file'], file);
      });
      req.end((err, res) => {
        this.setState({objects: res.body})
      let proxyurl = "https://cors-anywhere.herokuapp.com/";
      let ep = proxyurl.concat(
        'http://www.recipepuppy.com/api/',
        '?q=',
        this.state.objects[0])
      if(this.state.objects.length>0){
      fetch(ep, {
          mode: 'cors'
        })
      .then(results => results.json())
      .then(j => {
          this.setState({response: j['results']});
          console.log(j)
        });

    }
        if (err) console.log('err: ', err);
      })
    }

    render(){
      return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={2}>
              <PageHeader>
              {this.state.objects.length>0 &&
               this.state.objects[0].toUpperCase()
              }
              </PageHeader>

              <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle}>
                <div class="dz-message" style={dropzoneMessageStyle}>
                Ingredient image
                </div>
              </Dropzone>

              <div >{this.state.droppedfile!==null && this.state.droppedfile.map(function(file){
                return <img width={250} height={250} src={file.preview} /> 
                })}
                </div>


              {this.state.response.map(function(d) {
                return <Media>
                        <Media.Left>
                          <img width={64} height={64} src={d.thumbnail} alt="thumbnail" />
                        </Media.Left>
                        <Media.Body>
                          <Media.Heading>{d.title}</Media.Heading>
                          <p>
                            {d.ingredients}
                          </p>
                        </Media.Body>
                      </Media>
                })}


          </Col>
        </Row>
      </Grid>
      );
    }
};
