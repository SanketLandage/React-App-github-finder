import React from 'react';
import UserItem from './UserItem';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';


const Users =({loading,users})=> {
    if(loading){
        return <Spinner/>
    }
    else{
        return (
            <div style={userStyle}>
                {users.map(user=>(
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        );

    }

}

const userStyle={
display: 'grid',
gridTemplateColumns:'repeat(3,1fr)',
gridgap:'1rem'
};

Users.PropTypes ={
    user:PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};
export default Users;
