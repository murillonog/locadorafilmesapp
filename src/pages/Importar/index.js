import React, {useState} from 'react';
import './importar.css';
import Title from '../../components/Title';
import {  FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Importar() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
	};

    function handleSave(e){
        e.preventDefault();

        if( selectedFile.type === "text/csv"){
            const formData = new FormData();
            formData.append('File', selectedFile);

            fetch(
                `${api.defaults.baseURL}filme/import`,
                {
                    method: 'POST',
                    body: formData,
                }
            ).then((response) => response.json())
            .then((result) => {
                    toast.success('Arquivo importado com sucesso!');
                    navigate("/filmes");
                })
            .catch((error) => {
                    toast.error('Não foi possivel importar o arquivo!');
                });            
        }else{
            toast.warning('Arquivo tem que ser do tipo .csv');
        }
    };

return (
    <div>
      <div className="content">
          <Title name="Importar">
              <FiUpload color='#000' size={24}/>
          </Title>
          <div className='container'>
              <form className='form-import' onSubmit={handleSave}>
                <input type="file" onChange={changeHandler}/>
                <br/><br/>
                <button className='btn-submit' type="submit">Importar</button>
              </form>
          </div>
      </div>
    </div>
  );
}