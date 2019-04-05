import React, { Component } from 'react';
import firebase from '../Firebase';
import { withRouter } from 'react-router-dom'
import { Table, Button, Tag, Modal, message, Spin } from 'antd';
import './HomePage.css'
const confirm = Modal.confirm;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listeRecette: [],
            isLoading: true,
        }
        this.columns = [
            {
                title: 'Image', dataIndex: '', key: 'image', render: dataIndex => (
                    <img key={`img-${dataIndex.id}`} style={{height: '100px', borderRadius: '15px'}} src={dataIndex.imageUrl} alt={`Image ${dataIndex.nom}`}/>
                ),
            },
            { title: 'Nom', dataIndex: 'nom', key: 'name' },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            {
                title: 'Tags', dataIndex: 'tags', key: 'tags', render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                        })}
                    </span>
                ),
            },
            {
                title: 'Action', dataIndex: '', key: 'action', render: dataIndex => (
                    <span>
                        <Button onClick={() => this.handleEdit(dataIndex.id)} type="primary" ghost style={{ marginRight: "10px" }}>Editer</Button>
                        <Button onClick={() => this.showDeleteConfirm(dataIndex.id, dataIndex.id_image)} type="danger" ghost>Supprimer</Button>
                    </span>
                )
            },
        ];
    }

    showDeleteConfirm = ( id, id_image ) => {
        var self = this;
        confirm({
            title: 'Supprimer définitivement cette recette?',
            content: 'vous ne pourrez plus revenir en arrère!',
            okText: 'Oui',
            okType: 'danger',
            cancelText: 'Non',
            async onOk() {
                await self.deleteRecette(id);
                self.refreshData();
                message.success('Recette correctement supprimé!');
            }
        });
    }

    deleteRecette = (id) => {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection("recettes").doc(id).delete().then(() => {
                resolve();
            }).catch(function (error) {
                reject();
            });
        })

    }


    handleEdit = ( id ) => {
        this.props.history.push(`/edit/${id}`);
    };

    async getRecettes() {
        const tableRecette = [];
        const snapshot = await firebase.firestore().collection('recettes').get()
        snapshot.docs.map(doc => {
            const id = doc.id;
            const data = doc.data()
            tableRecette.push({ id, ...data })
        });
        return tableRecette;
    }

    async refreshData() {
        const listeRecette = await this.getRecettes();
        this.setState({
            listeRecette: listeRecette,
            isLoading: false,
        })
    }

    componentDidMount() {
        this.refreshData();
    }

    getRender = () => {
        const { isLoading, listeRecette } = this.state;
        const renderListeRecette = <Table pagination= { {pageSizeOptions: ['4', '2'], showSizeChanger: true}} columns={this.columns} dataSource={listeRecette} />;
        return isLoading ? <Spin size="large" /> : renderListeRecette;
    }

    render() {
        return (
            <div className="HomePage">
                {this.getRender()}

            </div>
        );
    }
}

export default withRouter(HomePage);
