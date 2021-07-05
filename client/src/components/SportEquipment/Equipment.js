import "../SportEquipment/equipment.css"


const Equipment= ({beachEquipment, stock, user})=> {
    
    let equipment_id= beachEquipment._id;

    const deleteEquipment= async ()=>{

    }


    return (
    
        <div className="material">
            <div className="delete_button">
                {user?.role === 1 ? <button type="button" className="boton_delete btn-close" aria-label="Close" onClick={deleteEquipment}></button> : ""}
            </div>
            <div className="info_material">
                <img src= {beachEquipment.file.url} alt="logo"/>
                <p>{beachEquipment.model}</p>
                {/* <p>{beachEquipment.size}</p> */}
                <p>{beachEquipment.level}</p>
                {stock && <p>Stock : {stock}</p>}
            </div>
            
            
        </div>
        

    )

}

export default Equipment