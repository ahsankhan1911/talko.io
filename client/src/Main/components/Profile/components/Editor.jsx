import React, {Fragment} from 'react';

const style = {
    editBtn: {fontSize:'1px',height: '25px', width: '25px', borderRadius: '12px', cursor: 'pointer', border: 'none'},
    editBtnIcn: {fontSize:'12px',textAlign: 'center'},
}

const Editor =  (props) => props.isUser ?  (
    <Fragment>
    <button 
    style={style.editBtn}
    > 
    <i style={style.editBtnIcn} className="material-icons">mode_edit</i>
    </button><br />
    </Fragment>
) : null;

export default Editor;
