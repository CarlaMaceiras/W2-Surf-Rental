import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import { API_BASE_URL} from '../../constants/apiConstants'



const NewEquipment= () => {

    const [model, setModel] = useState("");
    const [size, setSize] = useState("");
    const [level, setLevel] = useState("");
    const [file, setFile] = useState({});

    const nextEquipment = async () => {

        let bodyFormData = new FormData();
        bodyFormData.append('model', model );
        bodyFormData.append('size', size );
        bodyFormData.append('level', level );
        bodyFormData.append('file', file );


        try {
            const token = localStorage.getItem("w2_token");
            const response = await axios.post(`${API_BASE_URL}/sports`, bodyFormData, {
            
        
                headers: {
                    "Authorization": token,
                    "Content-Type": "multipart/form-data"
                }
                
            })
            console.log(response)
            
        }
        catch (err) {
            console.error(err.response.data);
            
        }
    }
        

    return (
        <div>
            <div className="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Nuevo material" value= {model} onChange= {(e) => setModel(e.target.value)}/>
                <label for="floatingInput">Modelo</label>
            </div>
            <div className="form-floating">
                <input type="number" class="form-control" id="floatingSize" placeholder="Tamaño" value= {size} onChange= {(e) => setSize(e.target.value)}/>
                <label for="floatingPassword">Tamaño</label>
            </div>
            <div className="form-floating">
                <input type="number" class="form-control" id="floatingSize" placeholder="Nivel de surf" value= {level} onChange= {(e) => setLevel(e.target.value)}/>
                <label for="floatingPassword">Nivel de surf</label>
            </div>

            <input type="file" className="form-control" id="floatingSize" placeholder="Foto" value= {file.fileName} onChange= {(e) => {setFile(e.target.files[0])}}/>
            
            {/* <button className="btn btn-primary" type="button" disabled  onClick= {nextEquipment}>Crear nuevo material
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button> */}

            <button type="button" className="btn btn-primary"  onClick= {nextEquipment}>Crear nuevo material</button>
            
        </div>
    )
};

export default NewEquipment;
    