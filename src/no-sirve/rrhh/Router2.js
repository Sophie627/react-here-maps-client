import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Header/Header';
import Navegacion from './Navegacion/Navegacion';
import Posts from './Posts/Posts'
import SinglePost from './SinglePost/SinglePost'
import CrearPost from './CrearPost'


class Router extends Component {

    state = {
        posts : []
    }

    componentWillMount(){
        this.obtenerPost();
    }

    obtenerPost = async () => {
        
        let url = `https://jsonplaceholder.typicode.com/posts`;

        await axios.get(url)
            .then(res => {
                this.setState({
                    posts : res.data
                })
            })
            .catch(err => {
                console.log(err);
            })

    }

    borrarPost = async (id) => {

        let url = `https://jsonplaceholder.typicode.com/posts`;
        
        await axios.delete(`${url}/${id}`)
            .then(res => {
                if(res.status === 200){
                    const copiaPosts = [...this.state.posts];

                    let resultado = copiaPosts.filter(post => (
                        post.id !== id
                    ))

                    this.setState({
                        posts : resultado
                    })

                    console.log(this.state.posts);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header 
                            titulo = "React Blog"
                        />
                        <Navegacion />
                    

                        <Switch>

                            <Route exact path='/' render={ () => (
                                <Posts
                                    posts = {this.state.posts}
                                    borrarPost = {this.borrarPost}
                                />
                            )} />

                            <Route exact path='/post/:postId' render={(props) => {
                                
                                
                                let idPost = props.location.pathname.replace('/post/', '');

                                // console.log(idPost);
                                const posts = this.state.posts;

                                let filtro;

                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))
                                /*Hacemos el filtro porque queremos el ID del post, y si lo hacemos
                                        
                                        <SinglePost 
                                            post={posts[idPost]}
                                        />
                                
                                Esto nos va a devolver la clave en el array, y no el valor del id asignado  
                                al post
                                Ej: Si consultamos /post/1 con el metodo de arriba nos va a devolver el valor
                                1 en el array que internamente es el id 2, el que tiene el id 1 en los post 
                                en el array es la posicion 0.
                                */

                                return(
                                    <SinglePost 
                                        post={filtro[0]}
                                    />
                                    /* Le coloco [0] porque el filtro devuelve un array con una sola posicion
                                    la [0] y esta contiene todos los datos del idPost que consulte*/
                                )
                                
                            }} />

                            <Route exact path='/crear' component={CrearPost} />
                            
                        </Switch>

                    </div>
                </div>

            </BrowserRouter>
        );
    }
}

export default Router;