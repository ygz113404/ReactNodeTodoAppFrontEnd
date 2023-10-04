import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

export default function TodoMain() {
    const [todos, setTodo] = useState([])
    const [todosComplete, setTodoComplete] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false
    });


    const [show, setShow] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/todos');
            setTodo(response.data)
        }
        catch (error) {
            console.error('İstek sırasında bir hata oluştu:', error);
        }

    }
    const getDataComplete = async () => {
        try {
            const response = await axios.get('http://localhost:3001/todos/done');
            setTodoComplete(response.data)
        }
        catch (error) {
            console.error('İstek sırasında bir hata oluştu:', error);
        }

    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Axios ile POST isteği yapma
          const response = await axios.post('http://localhost:3001/todos', formData);
    
          // İstek başarıyla tamamlandığında yapılacak işlemler
          console.log('Yeni görev eklendi:', response.data);
    
          // Formu sıfırla
          setFormData({
            title: '',
            description: '',
            done: false,
          });
          getData()
          handleClose()
        } catch (error) {
          console.error('İstek sırasında bir hata oluştu:', error);
        }
      };
    const deleteTodo = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:3001/todos/${id}`);
            console.log('Görev Silindi:', response.data);
        }
        catch(error){
            console.error('İstek sırasında bir hata oluştu:', error);
        }

    }
    const completeTodo = async (id) => {
        try{
            const response = await axios.put(`http://localhost:3001/todos/${id}`);
            console.log('Görev tamamlandı:', response.data);
        }
        catch(error){
            console.error('İstek sırasında bir hata oluştu:', error);
        }
    }
    useEffect(() => {
        getData()
        getDataComplete()
    }, [])
    return (
        <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button onClick={handleShow} style={{ margin: 30 }}>Add Todo</Button>
                <div >
                <h3 style={{margin:40}}>Tamamlanmamış Görevler</h3>
                <div style={{  display: 'flex', flexWrap: 'wrap' }}>
                    {todos.map((todo, index) => (
                        <div key={todo._id} style={{ width: '50%', padding: 20 }}>
                            <Card style={{ width: '100%', padding: 20, margin: 20 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                                    <h3>
                                        {todo.title}
                                    </h3>
                                    <div style={{ height: 3, backgroundColor: 'red', width: 200, marginTop: 10, marginBottom: 10 }}></div>
                                    <p>
                                        {todo.description}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                                        <Button style={{ width: '100%', marginBottom: '10px' }} onClick={()=>{completeTodo(todo._id)}}>
                                            Görevi Tamamla
                                        </Button>
                                        <Button style={{ width: '100%', marginBottom: '10px' }} variant="danger" onClick={()=>{deleteTodo(todo._id)}}>
                                            Görevi Sil
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                </div>
                <div >
                <h3 style={{margin:40}}>Tamamlanmış Görevler</h3>
                <div style={{  display: 'flex', flexWrap: 'wrap' }}>
                    {todosComplete.map((todoComplete, index) => (
                        <div key={todoComplete._id} style={{ width: '50%', padding: 20 }}>
                            <Card style={{ width: '100%', padding: 20, margin: 20 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                                    <h3>
                                        {todoComplete.title}
                                    </h3>
                                    <div style={{ height: 3, backgroundColor: 'red', width: 200, marginTop: 10, marginBottom: 10 }}></div>
                                    <p>
                                        {todoComplete.description}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                                        <Button style={{ width: '100%', marginBottom: '10px' }} variant="danger" onClick={()=>{deleteTodo(todoComplete._id)}}>
                                            Görevi Sil
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                </div>
           
            </div>
            <Modal show={show} onHide={handleClose}>
                <div className="container" style={{ padding: 20 }}>
                    <h3>Add Todo</h3>
                    <div style={{ height: 2, backgroundColor: 'red', width: 300, marginTop: 10, marginBottom: 10 }}></div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="completed" className="form-label">Completed ?</label>
                            <select
                                className="form-select"
                                id="completed"
                                name="completed"
                                value={formData.completed}
                                onChange={handleChange}
                            >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <Button style={{ width: '100%', marginBottom: '10px' }} type="submit" className="btn btn-primary">Gönder</Button>
                    </form>
                </div>
            </Modal>
        </div>

    )
}