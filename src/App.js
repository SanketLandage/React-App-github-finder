import React ,{Component, Fragment} from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import axios from 'axios';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/Pages/About';

const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  
class App extends Component {
  state={
    users:[],
    user:{},
    repos:[],
    loading:false,
    alert:null
  };

  //function  to search user 

  searchUsers=async text=>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    this.setState({ users:res.data.items, loading: false});
  }


  //// function for clear users from state
  clearUsers=()=>{
    this.setState({ users:[] , loading: false});
  }


  ////Get single Usser 

  getUser= async (username) => {

    this.setState({ loading:true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
  
    this.setState({ user:res.data, loading: false});
  }

  // function to Get User Reposotories
  // getUserRepo= async (username) => {

  //   this.setState({ loading:true });

  //   const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  //   this.setState({ repos:res.data, loading: false});
  // };



  ///// Set alert when nothing is entered 
    setAlert=(msg , type)=>{
      this.setState({ alert: {msg , type} });
      setTimeout(()=>this.setState({ alert : null}),2000);
    }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
            <div className='container'>
                <Alert alert={this.state.alert}/>
                <Switch>
                  <Route exact path='/' render={prop=> (
                    <Fragment>
                      <Search 
                        searchUsers={this.searchUsers} 
                        clearUsers={this.clearUsers}
                        showClear={this.state.users.length > 0 ? true : false }
                        setAlert={this.setAlert}
                      />
                      <Users loading={this.state.loading} users={this.state.users}/>
                    </Fragment>
                  )} />
                  <Route exact path='/about' component={About}/> 
                  <Route exact path='/user/:login' render={props=>(
                    
                    <User {...props} 
                    getUser={this.getUser} 
                    user={this.state.user} 
                    loading={this.state.loading}
                    />

                  )}  />
                </Switch>
                </div>
        </div>
      </Router>
    );

  }

} 
 


export default App;
