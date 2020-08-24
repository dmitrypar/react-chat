import React from 'react'
import firebase from './../firebase/firebase'

class Modal  extends React.Component {
    
    state = { 
        user: this.props.currentUser,
        channelName: '' ,
        channelDescription: '',
        channelRef: firebase.database().ref('channels'),
        dislayedChannels: []
     };

     componentDidMount = () =>{
         let displayChannelList = []
        this.state.channelRef
        .on('child_added', (data)=>{
            displayChannelList.push(data.val())
        })
        this.setState({dislayedChannels:displayChannelList })
        this.props.setDisplayChannelList()
     }
    
    inputHandler = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    validData = ({channelName, channelDescription})=>channelName&&channelDescription
   
    newChannelCreate = ()=> {
        const {channelName, channelDescription, channelRef, user} = this.state
        const key = channelRef.push().key;
        const newChannel = {
            id: key,
            name: channelName,
            description: channelDescription,
            created: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        channelRef
        .child(key)
        .update(newChannel)
        .then(()=>{
            this.setState({
                channelName: '',
                channelDescription: '',
                
            })
            console.log('chanel added')
           
        })
    
    }

    submitHandler = (e) => {
e.preventDefault()
if(this.validData(this.state)) {
    this.newChannelCreate()
}
    }

    
    render() { 
        
        return (
            <div>
              
           <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title" id="exampleModalLabel">Создать канал</h5>
                   <button type="button" className="close modal"  aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                   </button>
                 </div>
           
                 <div className="modal-body">
                   <form onSubmit={this.submitHandler}>
                     <div className="form-group">
                       <label  className="col-form-label">Название:</label>
                       <input type="text" 
                       className="form-control" 
                      
                       name='channelName'
                       onChange={this.inputHandler}
                       />
                       
                     </div>
                     <div className="form-group">
                       <label  className="col-form-label">Орисание:</label>
                       <textarea className="form-control" 
                      
                       name='channelDescription'
                       onChange={this.inputHandler}
                       ></textarea>
                       
                     </div>
                   </form>
                 </div>
                 <div className="modal-footer">
                   <button type="button" 
                   className="btn btn-secondary" 
                   data-dismiss="modal"
                   onClick={()=>this.props.setDisplayChannelList(this.state.dislayedChannels)}
                   >Close</button>
      
        {/* {this.state.dislayedChannels.map((c)=>{
            return <button>{c.name}</button>
            })} */}
                   <button type="button" 
                   className="btn btn-primary"
                   onClick={this.submitHandler}
                   >Send message</button>
                 </div>
           
                
               </div>
             </div>
           </div>
            </div>
               );
    }
}

export default Modal