import React , {useState , useEffect , Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios" ;
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD  = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [name , setName] = useState('')
  const [age , setAge] = useState('')
  const [address , setAddress] = useState('')
  
  const [editID , setEditID] = useState('')
  const [editName , setEditName] = useState('')
  const [editAge , setEditAge] = useState('')
  const [editAddress , setEditAddress] = useState('')
    
        const empdata =[
            {
                id :1,
                name : 'ahmed' ,
                age : 26,
                address : 'cairo'
            },
            {
                id :2,
                name : 'sara' ,
                age : 26,
            address: 'banha'
            },
            {
                id :3,
                name : 'sara' ,
                age : 26,
                address : 'Banha '           },
        ]

        
        const [ data , setData]= useState([]);
        useEffect(()=> {
            getData();
        },[])

const getData =()=>{
  axios.get('https://localhost:7182/api/Employee')
  .then((result)=>{
    setData(result.data)
  })
  .catch((error)=>{
    console.log(error)
  })
}

        const handleEdit =(id) => {
           
           handleShow();
        axios.get(`https://localhost:7182/api/Employee/${id}`)
        .then((result)=>{
    setEditName(result.data.name);
    setEditAge(result.data.age);
    setEditAddress(result.data.address);
    setEditID(id)
  })
  .catch((error)=>{
    console.log(error)
  })
          }
        const handleDelete =(id) => {
            if (window.confirm("Are you sure to delete this employee")== true){
              axios.delete(`https://localhost:7182/api/Employee/${id}`)
              
              .then((result)=>{
                if(result.status==200){
                  toast.success('Employee has been deleted')
                  getData();
                }
              })
              .catch((error)=>{
                toast.error(error);
              })
            }
            
        }
        const handleUpdate =() => {
          const url=`https://localhost:7182/api/Employee/${editID}`;
          const data={
            "id":editID,
            "name":editName,
            "age":editAge,
           "address":editAddress 
          }
          axios.put(url, data)
          .then((result)=>{
            handleClose();
            getData();
            clear();
            toast.success('Employee has been updated');
          })
          .catch((error)=>{
            toast.error(error);
          })
        }
        const handleSave=()=>{
          const url ='https://localhost:7182/api/Employee';
          const data={
            
         "name": name,
         "age": age,
          "address": address
          }

          axios.post(url, data)
          .then((result)=>{
            getData();
            clear();
            toast.success('Employee has been added');
          })
          .catch((error)=>{
            toast.error(error);
          })
        }
        const clear =()=>{
          setName('');
          setAge('');
          setAddress('')
          setEditName('');
          setEditAge('');
          setEditAddress('')
          setEditID('');
        }
        const handleActiveChange=(e)=>{

        }
        const handleEditActiveChange=(e)=>{

        }
        return(
        <Fragment>
          <ToastContainer/>
             <Container>
      
      <Row>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Name" 
        value={name} onChange={(e) => setName(e.target.value)}/></Col>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Age"
        value={age} onChange={(e) => setAge(e.target.value)} />
        </Col>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Address" 
        value={address} onChange={(e) => setAddress(e.target.value)}/>
        </Col>
        <Col>
        <button className="btn btn-primary" onClick={()=> handleSave()}>Submit</button>
        </Col>
      </Row>
    </Container>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Employee Num</th>
        
          <th>Name</th>
          <th>Age</th>
          <th>address</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length>0 ?
            data.map((item ,index )=> {
                return(
                    <tr key ={index}>
                        <td>{index + 1}</td>
                    
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td colSpan={2}>
                        <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
                        <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
            })
        :
        'Loading...'
}
        
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Embloyee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Name" 
        value={editName} onChange={(e) => setEditName(e.target.value)}/></Col>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Age"
        value={editAge} onChange={(e) => setEditAge(e.target.value)} />
        </Col>
        <Col>
        < input type="text" className="form-control" placeholder="Enter Address" 
        value={editAddress} onChange={(e) => setEditAddress(e.target.value)}/>
        </Col>
        
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}
export default CRUD ;