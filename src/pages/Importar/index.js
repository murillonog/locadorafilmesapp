import './importar.css';
import React, {useState} from 'react';
import Title from '../../components/Title';
import {  FiUpload } from 'react-icons/fi';

export default function Importar() {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsSelected(true);
	};

    function handleSave(e){
        e.preventDefault();
        console.log("aqui 1");
        console.log(selectedFile);
        if( selectedFile.type === "text/csv"){
            console.log("aqui 2");
            //envia para a api
            const formData = new FormData();
            formData.append('File', selectedFile);

            fetch(
                'https://localhost:7080/api/filme/import',
                {
                    method: 'POST',
                    body: formData,
                }
            ).then((response) => response.json())
            .then((result) => {
                    console.log('Success:', result);
                })
            .catch((error) => {
                    console.error('Error:', error);
                });            
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