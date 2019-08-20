import React, { Component, Fragment } from 'react';


class Settings extends Component {

    render() {
      let  {requestList, handleAcceptReqBtn} = this.props
        return (
            <div>
                <h2> Contacts</h2>

                <h3>Request List</h3>
                 <div>
                   {
                       requestList.map((d) => {
                           return <Fragment>
                               <span><img src={d.profilePicture}/></span> <span>{d.name}</span> 
                               <button onClick={handleAcceptReqBtn}></button>
                           </Fragment>
                       })
                   }
                 </div>
                <h3>Your Contacts</h3>
             
            </div>
        )
    }
}

export default Settings;