import React, { Component } from 'react';
import firebase from '../Firebase'
import FormRecette from '../Common/FormRecette'
import { Spin, message } from 'antd'
const storage = firebase.storage();

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      isLoading: true,
    }
    this.handlePersist = this.handlePersist.bind(this)
  }
  async componentDidMount() {
    const { id_recette } = this.props.match.params;
    const recette = await this.getRecette(id_recette);
    this.setState({
      initialValues: recette,
      isLoading: false
    })

  }

  handlePersist = (values) => {
    this.updateRecette(values)
  }

  async updateRecette(values){
    const { id_recette } = this.props.match.params;
    var imageFile, rest;
    ({
      imageFile,
      ...rest
    } = values);
    const db = firebase.firestore()
    // Add a new document in collection "recettes"
    var recetteWithImage
    
    await this.addImage(imageFile, id_recette);
    const imageUrl = await this.getUrl(id_recette)
    recetteWithImage = {imageUrl: imageUrl, ...rest}

    let self = this;
    db.collection("recettes").doc(id_recette).set(recetteWithImage)
      .then(function () {
        message.success(`La recette a correctement été modifié !`)
        self.props.history.push('/');
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }

  async getRecette(id) {
    const snapshot = await firebase.firestore().collection('recettes').doc(id).get()
    const recette = snapshot.data();
    return recette
  }

  addImage = (image, id) => {
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
    db.collection("recettes").doc(values.id).set(values)
      .then(function () {
        message.success(`La recette ${values.name} a correctement été enregistré !`)
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }
  
  async getImageFile (id) {
    
  }

  getRender = () => {
    const { isLoading, initialValues } = this.state;
    return isLoading ? <Spin style={{ textAlign: "center" }} size="large" /> : <FormRecette initialValues={initialValues} handlePersist={this.handlePersist} />;
  }

  render() {
    return (
      <div className="EditPage">
        {
          this.getRender()
        }
      </div>

    );
  }
}

export default EditPage;
