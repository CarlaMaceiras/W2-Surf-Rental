


const Equipment= ({beachEquipment, stock})=> {


    return (
    
    <div>
        <p>{beachEquipment.model}</p>
        <p>{beachEquipment.size}</p>
        <p>{beachEquipment.level}</p>
        <img src= {beachEquipment.file.url} alt="logo"/>
        {stock && <p>Stock : {stock}</p>}

    </div>
    )

}

export default Equipment