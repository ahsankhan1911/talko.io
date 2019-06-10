import React from 'react';

const Search = (props) => {
    let { data, handleProfileClick } = props;
    return (
        <div>
            <ul class="search">  {
                data === '' ? <img src={`${process.env.REACT_APP_STATIC_URL}/images/loading.gif`} alt="" style={{ height: '110px', marginTop: '30px' }} /> :
                    data.length ?
                        data.map((d) => {
                            return <li onClick={() => handleProfileClick(d.email)}>
                                <span><img src={`${process.env.REACT_APP_STATIC_URL}${d.profilePicture}`} alt="" style={{ height: '20px', borderRadius: '10px' }} /></span> <b>{d.name}</b><br />
                                <p>{d.email}</p>
                            </li>
                        }) : <p>we cant't find anyone for you</p>
            }</ul>
        </div>
    )

}

export default Search