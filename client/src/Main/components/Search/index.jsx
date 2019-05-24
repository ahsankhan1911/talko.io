import React, { Component } from 'react';


class Search extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {

    //     }
    // }




    render() {
        
        let {data} = this.props
        return (
            <div>
              <ul class= "search">  {
                    data.length ? 
                 data.map((d) => {
                     return <li>
                        <span><img src={`${process.env.REACT_APP_STATIC_URL}${d.profilePicture}`} alt="" style={{height:'20px', borderRadius: '10px'}}/></span> <b>{d.name}</b><br/>
                         <p>{d.email}</p>
                     </li>
                 }) : <img src={`${process.env.REACT_APP_STATIC_URL}/images/loading.gif`} alt="" style={{height:'110px', marginTop: '30px'}}/>
                }</ul>
            </div>
        )
    }
}

export default Search