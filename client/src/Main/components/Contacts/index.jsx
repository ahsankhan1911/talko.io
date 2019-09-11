import React, { Component, Fragment } from 'react';

const style = {
    loading: { height: '110px', marginTop: '30px' },
    profilePic: { height: '50px', borderRadius: '20px' },
    namePara: { fontSize: '20px',display: 'inline'  },
    para: { fontSize: '10px' , display: 'inline' }

}

class Contacts extends Component {

    render() {
        console.log(this.props)
      let  {requestList, handleAcceptReqBtn,handleIngoreReqBtn} = this.props
        return (
            <div>
                <h2> Contacts</h2>

                <h3>Request List</h3>
                 <div>

                   {
                       requestList.map((d) => {
                           let senderId = d.sender._id;
                           return <Fragment>
                               <span><img src={d.sender.profilePicture} style={style.profilePic}/></span> <span>{d.sender.name}</span> <br/>
                               <button onClick={() => handleAcceptReqBtn({senderId})}>accept</button>
                               <button onClick={handleIngoreReqBtn}>ignore</button>

                           </Fragment>
                       })
                   }
                 </div>
                <h3>Your Contacts</h3>
             
            </div>
        )
    }
}

export default Contacts;