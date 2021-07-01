import React,{Fragment, useState} from 'react'

function EditTodo({todo}) {

    const[description,setDescription] = useState(todo.description);

    const changeDesc = (e)=> {
        setDescription(e.target.value);
    };

    const updateDesc = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = fetch(`http://localhost:5000/todos/${todo.todo_id}`,
            {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            window.location('/');
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
            Edit
            </button>   
            <div className="modal" id={`id${todo.todo_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">  
                            <h4 className="modal-title"> Edit Todo  </h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                            <div className="modal-body">
                               <input type="text" className="form-control" value={description} onChange={changeDesc}/>
                            </div>

                            <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e)=>updateDesc(e)}>Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default EditTodo
