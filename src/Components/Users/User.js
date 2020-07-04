import React, {Fragment, useEffect} from 'react';
import Spinner from '../Layout/Spinner';
import {Link} from 'react-router-dom';

const User = ({user ,getUser , loading ,match}) => {
    useEffect(()=>{
        getUser(match.params.login);
        //eslint-disable-next-line
   },[]);
   
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        
        if(loading) return <Spinner />;

        return (
            <Fragment>
                <Link to='/' className="btn btn-light">
                    Back To Search
                </Link>
                Hireable:{''}
                {hireable ? (<i class="fa fa-check" aria-hidden="true"></i>) :
                (<i class="fa fa-times" aria-hidden="true"></i>)}

                <div className="card grid-2">
                    <div className="all-center">
                        <img
                            src={avatar_url}
                            className="round-img"
                            style={{width:'150px'}}
                            alt=''
                        />
                        <h1>{name}</h1>
                        <p>Location: {location} </p>

                    </div>
                    <div>
                        {bio && (<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>)}
                        <a className="btn btn-dark my-1" href={html_url}>Visit Github Profile</a>

                        <ul>
                            <li>
                                {login && (<Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>)}
                            </li>
                            <li>
                                {blog && (<Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>)}
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-light">Following: {following}</div>
                    <div className="badge badge-danger">Git Repositories: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>

                
            </Fragment>
        );
}


export default User;
