import React, {Component} from "react";

class App extends Component{

    constructor(){
        super();
        this.state = {
            title : '',
            description : '',
            tasks:[],
            _id : ''
        };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deleteTask(id){
        if(confirm('Estas seguro que quieres eliminar?')){            
            console.log("eliminando: ", id);
            fetch('/api/tasks/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            }    
            })
            .then(res => res.json())
            .then(data =>
                        {
                            console.log(data);
                            M.toast({html:'Tarea eliminada'});
                            this.fetchTasks();
                        });            
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => this.setState(data));        
    }

    addTask(e){
        e.preventDefault();
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            }).
            then(res=> res.json())
            .then(data => {
                console.log(data);
                M.toast({html:'Tarea modificada'});
                this.setState({title : '', description: '', _id:''});
                this.fetchTasks();
            })
            .catch(err=> console.error(err))
        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data);
                M.toast({html:'Tarea guardada'});
                this.setState({title : '', description: '',_id:''});
                this.fetchTasks();
            })
            .catch(err=> console.error(err))
        }



        
        console.log(this.state);
    }

    componentDidMount(){
       this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({tasks: data});
            console.log(this.setState.tasks);
        })
    }

    handleChange(e){
        const{name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div>
                {/*<!-- Navegacion --> */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Inicio</a>                    
                    </div>                
                </nav>


                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" onChange={this.handleChange} placeholder="titulo" value={this.state.title}></input>
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="descripcion" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">
                                            submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>                                    
                                    <th>Descripcion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                {
                                    this.state.tasks.map(
                                        tasks => {
                                            return (
                                                <tr key={tasks._id}> 
                                                    <td>{tasks.title}</td>
                                                    <td>{tasks.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(tasks._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(tasks._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }                                
                            </tbody>
                        </table>
                        </div>                    
                    </div>
                </div>
            </div>
        )
    }
} 

export default App