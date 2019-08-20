import React, { Component, Fragment } from 'react';
import Editor from './components/Editor'

const style = {
    loading: { height: '110px', marginTop: '30px' },
    profilePic: { height: '50px', borderRadius: '20px' },
    namePara: { fontSize: '20px',display: 'inline'  },
    para: { fontSize: '10px' , display: 'inline' }

}


class Profile extends Component {
 
    render() {

        let { data , isUser, handleAddAsFriendBtn, user} = this.props
        console.log("PROPS >> ", this.props)
        return (
            <div>
                {data === '' || !data.email ? 
                <img src={`${process.env.REACT_APP_STATIC_URL}/images/loading.gif`} alt="" style={ style.loading}/> :
                    <Fragment>
                        <img src={data.profilePicture} alt="" style={style.profilePic} /> <br />
                       
                        <p style={style.namePara}><b>{data.name}</b></p> <Editor isUser={isUser}/><br />  
                        <p style={style.para}><b>Email: </b>{data.email || 'N/A'}</p>  <br />
                        <p style={style.para}><b>Age: </b>{data.age || 'N/A'}</p>  <Editor isUser={isUser}/>  <br />
                        <p style={style.para}><b>Gender: </b>{data.gender || 'N/A'}</p> <Editor isUser={isUser}/><br />
                        <p style={style.para}><b>Phone: </b>{data.phone || 'N/A'}</p> <Editor isUser={isUser}/><br /><br />
                        {!isUser ? <button onClick={() => handleAddAsFriendBtn({data, user})} style={{border: '2px solid black'}}>Add as friend</button>: null}
                    </Fragment>
                }
            </div>
        )
    }
}

export default Profile;