import React, { Component } from 'react';
class personalInfo extends React.Component{
      render(){
         return(<div>my name is ...</div>);
      }
}
class post extends React.Component{
     render(){
        return(<div>my post is ...</div>);
     }
}
class Account extends React.Component{
    //basic informtaion
    //post
    render(){
       if(this.props.isLogin){
         return( <div>
            <personalInfo/>
            <post/>
         </div>);
       }else return(<div></div>);
    }
}
export default Account;
