import React, {
  Component
} from 'react';
import firebase from '../Firebase'
import FormRecette from '../Common/FormRecette';
import {
  message
} from 'antd';
import { withRouter } from 'react-router-dom'
import uniqid from 'uniqid'
const storage = firebase.storage();

const initialValues = {
  imageFile: "",
  type: "",
  nom: "",
  preparation: "",
  astuces: "",
  difficulte: 0,
  nb_personnes: "",
  temps_cuisson: "",
  temps_preparation: "",
  materiel: "",
  tags: "",
}

class AddPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handlePersist = this.handlePersist.bind(this)
  }

  async handlePersist(values) {
    var imageFile, rest;
    ({
      imageFile,
      ...rest
    } = values);
    const id = uniqid(); 
    var recetteWithImage
    
    await this.addImage(imageFile, id);
    const imageUrl = await this.getUrl(id)
    recetteWithImage = {imageUrl: imageUrl, ...rest}
    const created_at = new Date().getTime();
    this.addRecette({image_id: id, created_at: created_at, ...recetteWithImage})
    this.props.history.push('/');
  }

  addImage(image, id) {
    return new Promise((resolve, reject) => {
      storage.ref(`images/${id}`)
        .put(image)
        .then(function(snapshot) {
          resolve()
      });
    })
    
  }

  getUrl(id) {
    return new Promise((resolve, reject) => {
      const ref = firebase.storage().ref('images').child(id);
      ref.getDownloadURL()
      .then((image) => {
          resolve(image);
          })
      .catch((e) => reject(e));
    })
  }

  addRecette = (values) => {
    const db = firebase.firestore();
    // Add a new document in collection "recettes"
    db.collection("recettes").doc().set(values)
      .then(function () {
        message.success(`La recette a correctement été enregistré !`)
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }

  render() {
    return ( 
      <div>
        <h1> Ajouter une recette </h1> 
        <FormRecette initialValues={initialValues} handlePersist={this.handlePersist}/> 
      </div >

    );
  }

}



export default withRouter(AddPage);