import React from "react";
import { Form, Field, FieldArray, ErrorMessage } from "formik";
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, IconButton, FormControl, InputLabel, Divider, MenuItem, Input } from '@material-ui/core'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import './FormRecette.css';


const FormStruct = ({ values, handleSubmit, handleChange, errors, touched, setFieldValue, setFieldTouched }) => (
    <div className="form-recipes">
        <Form>

            <div className="divider">
                <TextField

                    id="outlined-name"
                    label="Image"
                    name="imageFile"
                    onChange={(event) => setFieldValue("imageFile", event.currentTarget.files[0])}
                    onBlur={() => setFieldTouched('imageFile', true)}
                    margin="normal"
                    type="file"
                    error={errors.imageFile && touched.imageFile && errors.imageFile ? true : false}
                    helperText={errors.imageFile && touched.imageFile && errors.imageFile}
                    fullWidth
                />
            </div>

            <div className="content-name">


                <div className="divider">
                    <TextField
                        id="outlined-name"
                        label="Nom"
                        name="nom"
                        value={values.nom}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched('nom', true)}
                        margin="normal"
                        error={errors.nom && touched.nom && errors.nom ? true : false}
                        helperText={errors.nom && touched.nom && errors.nom}
                        fullWidth
                    />
                </div>

                <div className="divider">
                    <FormControl className="default">
                        <InputLabel htmlFor="age-native-required">Type</InputLabel>
                        <Select
                            native
                            fullWidth
                            value={values.type}
                            onChange={({ target: { value } }) => setFieldValue("type", value)}
                            onBlur={() => setFieldTouched(true)}
                            name="type"
                            inputProps={{
                                id: 'age-native-required',
                            }}
                        >
                            <option value="" />
                            <option value="entrée">Entrée</option>
                            <option value="plat">Plat</option>
                            <option value="dessert">Dessert</option>
                        </Select>

                    </FormControl>
                </div>
            </div>

            <div className="content">


            <div className="divider">
                <TextField
                    id="outlined-name"
                    label="Difficulté"
                    name="difficulte"
                    value={values.difficulte}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched('difficulte', true)}
                    type="number"
                    min={1}
                    max={5}
                    margin="normal"
                    error={errors.difficulte && touched.difficulte && errors.difficulte ? true : false}
                    helperText={errors.difficulte && touched.difficulte && errors.difficulte}
                    fullWidth
                />
            </div>
            <div className="divider">
                <TextField
                    id="outlined-name"
                    label="Temps de préparation"
                    name="temps_preparation"
                    type="number"
                    value={values.temps_preparation}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched("temps_preparation", true)}
                    margin="normal"
                    error={errors.temps_preparation && touched.temps_preparation && errors.temps_preparation ? true : false}
                    helperText={errors.temps_preparation && touched.temps_preparation && errors.temps_preparation}
                    fullWidth
                />
            </div>
            <div className="divider">
                <TextField
                    id="outlined-name"
                    label="Temps de cuisson"
                    name="temps_cuisson"
                    type="number"
                    value={values.temps_cuisson}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched("temps_cuisson", true)}
                    margin="normal"
                    error={errors.temps_cuisson && touched.temps_cuisson && errors.temps_cuisson ? true : false}
                    helperText={errors.temps_cuisson && touched.temps_cuisson && errors.temps_cuisson}
                    fullWidth
                />
            </div>
            <div className="divider">
                <TextField
                    id="outlined-name"
                    label="Nombre de personnes"
                    name="nb_personnes"
                    value={values.nb_personnes}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched('nb_personnes', true)}
                    margin="normal"
                    type="number"
                    error={errors.nb_personnes && touched.nb_personnes && errors.nb_personnes ? true : false}
                    helperText={errors.nb_personnes && touched.nb_personnes && errors.nb_personnes}
                    fullWidth
                />
            </div>
            </div>
            <div className="divider">
                <TextField
                    className="txt-area"
                    id="outlined-name"
                    label="Préparation"
                    name="preparation"
                    value={values.preparation}
                    onChange={handleChange}
                    onBlur={() => setFieldTouched('preparation', true)}
                    margin="normal"
                    type="textarea"
                    multiline={true}
                    rows={5}
                    rowsMax={15}
                    error={errors.preparation && touched.preparation && errors.preparation ? true : false}
                    helperText={errors.preparation && touched.preparation && errors.preparation}
                    fullWidth
                />
            </div>

            <div className="content">



            <div className="divider">
                <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                        <div>
                            {values.tags && values.tags.length > 0 ? (
                                values.tags.map((tag, index) => (
                                    <div key={index}>
                                        <TextField
                                            id="outlined-name"
                                            label={`Tag n° ${index + 1}`}
                                            name={`tags.${index}`}
                                            onBlur={() => setFieldTouched(`tags.${index}`, true)}
                                            value={values.tags[index]}
                                            onChange={handleChange}
                                            margin="normal"

                                        />
                                        <IconButton className="secondary" onClick={() => arrayHelpers.remove(index)} aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton variant="outlined" onClick={() => arrayHelpers.insert(index, '')} className="default">
                                            <ControlPointIcon />
                                        </IconButton>
                                        <div className="error-message">
                                            <ErrorMessage name={`tags.${index}`} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                    <div>
                                        <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')} className="primary" >
                                            <ControlPointIcon />
                                            Ajouter un tag
                            </Button>
                                        <div className="error-message">
                                            <ErrorMessage name="tags" />
                                        </div>
                                    </div>

                                )}
                        </div>
                    )}
                />
            </div>

            <div className="divider">
                <FieldArray
                    name="materiels"
                    render={arrayHelpers => (
                        <div>
                            {values.materiels && values.materiels.length > 0 ? (
                                values.materiels.map((materiel, index) => (
                                    <div key={index}>
                                        <TextField
                                            id="outlined-name"
                                            label={`Materiel n° ${index + 1}`}
                                            name={`materiels.${index}`}
                                            value={values.materiels[index]}
                                            onChange={handleChange}
                                            onBlur={() => setFieldTouched(`materiels.${index}`, true)}
                                            margin="normal"

                                        />
                                        <IconButton className="secondary" onClick={() => arrayHelpers.remove(index)} aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => arrayHelpers.insert(index, '')} className="default">
                                            <ControlPointIcon />
                                        </IconButton>
                                        <div className="error-message">
                                            <ErrorMessage name={`materiels.${index}`} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                    <div>
                                        <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')} className="primary" >
                                            <ControlPointIcon />
                                            Ajouter un matériel
                                        </Button>
                                        <div className="error-message">
                                            <ErrorMessage name="materiels" />
                                        </div>
                                    </div>

                                )}
                        </div>
                    )}
                />
            </div>
            </div>





            <div className="divider">
                <FieldArray
                    name="ingredients"
                    render={arrayHelpers => (
                        <div >
                            {values.ingredients && values.ingredients.length > 0 ? (
                                values.ingredients.map((ingredient, index) => (
                                    <div key={index} className="content">
                                        <div>
                                        <TextField
                                            id="outlined-name"
                                            label={`Quantité ingrédient n° ${index + 1}`}
                                            name={`ingredients.${index}.quantite`}
                                            value={values.ingredients[index].quantite || ""}
                                            onChange={handleChange}
                                            onBlur={() => setFieldTouched(`ingredients.${index}.quantite`, true)}

                                            margin="normal"

                                        />
                                        </div>
                                        <div>
                                        <FormControl className="default">
                                            <InputLabel htmlFor="unite_qte">Unité</InputLabel>
                                            <Select
                                                className="select-quantite"
                                                native
                                                value={values.ingredients[index].unite || ""}
                                                onChange={({ target: { value } }) => setFieldValue(`ingredients.${index}.unite`, value)}
                                                onBlur={() => setFieldTouched(`ingredients.${index}.unite`, true)}
                                                name={`ingredients.${index}.unite`}
                                                inputProps={{
                                                    id: 'unite_qte',
                                                }}
                                            >
                                                <option value="" />
                                                <option value="ml">ml</option>
                                                <option value="cl">cl</option>
                                                <option value="g">g</option>
                                                <option value="cuillère à café">Cuillère à café</option>
                                                <option value="cuillère à soupe">Cuillère à soupe</option>
                                                <option value="pincée">Pincée</option>
                                                <option value="pièce">Pièce</option>

                                            </Select>
                                        </FormControl>
                                        </div>
                                        <div>
                                        <TextField
                                            id="outlined-name"
                                            label={`Ingrédient n° ${index + 1}`}
                                            name={`ingredients.${index}.name`}
                                            value={values.ingredients[index].name || ""}
                                            onChange={handleChange}
                                            onBlur={() => setFieldTouched(`ingredients.${index}.name`, true)}
                                            margin="normal"

                                        />
                                        <IconButton className="secondary" onClick={() => arrayHelpers.remove(index)} aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton variant="outlined" onClick={() => arrayHelpers.insert(index, '')} className="default">
                                            <ControlPointIcon />
                                        </IconButton>
                                        </div>
                                        <div className="error-message">
                                            <ErrorMessage name={`ingredients.${index}.quantite`} />
                                            <ErrorMessage name={`ingredients.${index}.name`} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                    <div>
                                        <Button variant="contained" color="primary" onClick={() => arrayHelpers.push('')} className="primary" >
                                            <ControlPointIcon />
                                            Ajouter un ingrédient
                                        </Button>
                                        <div className="error-message">
                                            <ErrorMessage name="ingredients" />
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}
                />
            </div>

            <Button variant="outlined" color="primary" size="small" type="submit" fullWidth>
                Enregistrer la recette
          </Button>
        </Form>
    </div>
);

export default FormStruct;