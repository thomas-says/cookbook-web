import React from "react";
import { withFormik } from "formik";
import * as Yup from 'yup'
import FormStruct from './FormRecetteStruct';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const FormRecette = withFormik({
  mapPropsToValues({ initialValues: {imageFile, type, nom, difficulte, tags, temps_cuisson, temps_preparation, nb_personnes, preparation, ingredients, materiels, astuces } }) {
    return {
      imageFile: imageFile || "", 
      type: type || "",
      nom: nom || "",
      difficulte: difficulte || "",
      tags: tags || [""],
      temps_cuisson: temps_cuisson || "",
      temps_preparation: temps_preparation || "",
      nb_personnes: nb_personnes || "",
      preparation: preparation || "",
      ingredients: ingredients || [{}],
      materiels: materiels || [""],
      astuces: astuces || "",
    };
  },
  validationSchema: Yup.object().shape({
    
    imageFile: Yup.mixed().required("Le champ image doit être complété").test("fileSize", "File too large",value => value && value.size <= FILE_SIZE).test("fileFormat","Le format donné n'est pas valide",value => value && SUPPORTED_FORMATS.includes(value.type)), 
    type: Yup.string().required("Le champ type est obligatoire"),
    nom: Yup.string().required("Le champ nom est obligatoire"),
    difficulte: Yup.number().required("Le champ difficulté est obligatoire").min(1, "La difficulté est au minimum de 1").max(5, "La difficulté est au maximum de 5"),
    preparation: Yup.string().required("Le champ préparation ne peut pas être vide"), 
    temps_preparation: Yup.number().required("Le temps de préparation est obligatoire").positive("Le temps de préparation doit être positif"),
    temps_cuisson: Yup.number().min(0,"Le temps de cuisson doit être positif").required("Le temps de cuisson est obligatoire"),
    nb_personnes: Yup.number().required("La recette doit comporter un nombre de personne").positive("Le nombre de personne doit être positif"),
    tags: Yup.array().of(Yup.string().required('Le champ tag est obligatoire')
    ).min(1, "Au moins 1 tag est nécessaire"),
    materiels: Yup.array().of(Yup.string().required('Le champ materiel est obligatoire')
    ).min(1, "Au moins 1 materiel est nécessaire"),
    ingredients: Yup.array().of(Yup.object().shape({
      quantite: Yup.number().min(1, "La quantite doit être positive"),
      unite: Yup.string().required("L'unité doit être complété"), 
      name: Yup.string()
        .required('Le nom doit être complété'), 
    })).required("L'ingrédient doit être complété"),
  }),
  handleSubmit(values, { props: { handlePersist } }) {
    console.log(values); 
    handlePersist(values);
  }
})(FormStruct);
export default FormRecette;
