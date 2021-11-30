import { Component } from "react";
import NavBar from "../Components/NavBar";
const axios = require('axios').default;
const sha1 = require('js-sha1');


var pwnd_dict = {}

//TODO:
//get cookie to wherever it is stored [0]
//make the output look nicer [1]
async function getBreach(){
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/basicrequest',
        data:{
            //[0] get cookie to wherever it is stored
            cookie: localStorage.getItem("cookie")
            // cookie:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtcGgiOiIxOTY1NzciLCJpYXQiOjE2MzgyNDIwNTksImV4cCI6MTYzODI1Mjg1OX0.S-f9kRaT7U7AIzTJYl8iSZlKfO00WMkn_5M71jaYCPc" //later implemented
        } 
      });

      console.log(response.data)
      for(const item of response.data){
        await checkBreach(item);
      }


    async function checkBreach(item){
        const digest = sha1(item.password).toUpperCase();
        console.log("password is " + item.password);

        const digestFront = digest.slice(0,5);
        const digestEnd = digest.slice(-35);
        console.log(digestFront);
        console.log(digestEnd);
        const res = await axios.get("https://api.pwnedpasswords.com/range/"+digestFront);
        
        let pwnd_list = res.data.split('\r\n');

        

        pwnd_list.forEach(createDictionary);

        function createDictionary(i){
            const pwnd_pair = i.split(":");
            if(pwnd_pair[0]==digestEnd){
                pwnd_dict[item.boxname] = pwnd_pair[1];
                console.log("I am here");
            }
            
        }

    }

    const breaches = Object.keys(pwnd_dict).length;
    console.log("breach are: " + breaches);

}


export default
class CheckerPage extends Component {
    constructor(props){
        super(props);
        this.state={
            value: 0, //# of boxes we found has breached
            pressed:false, //did we start to check yet?
            breached:pwnd_dict //the list of boxnames and how many time it has been breached
        }

        this.Change = this.Change.bind(this);
    }

    Change(event){
        getBreach().then(()=>{
            this.setState(
                {value:Object.keys(pwnd_dict).length, 
                pressed:true,
                breached:pwnd_dict});
        })
        
    }


    render() {
        let p; //text for showing if have any boxes that is breached, if there is display the number of it
        let o=[]; //text for shwoing the boxname and how many times it is found.
        let q; //text explain what you should do, what does this check mean
        if(this.state.pressed){ //[1] make the output look nicer
            if(this.state.value!=0){
                p=<p>{"WARNING: TOTAL "+this.state.value+" BREACHES"}</p>
                for(var i=0; i<this.state.value; i++){
                    o.push(
                    <p key={"b"+i}>{"A password breached has been found in the box \""+Object.keys(this.state.breached)[i]+"\""}</p>,
                    <p key={"c"+i}>{"Its Password has been seen "+Object.values(this.state.breached)[i]+" times before"}</p>)
                }
                q=<i>{"Theses password has previously appeared in a data breach and should never be used. Please change password IMMEDIATELY!"}</i>
            }else{
                p=<p>{"YOU ARE SAFE"}</p>
            }
        }
        
        //[1] Make the output look nicer
        return (
            <div class="container-fluid">

                <div class="row">
                    <NavBar page="CheckerPage" />

                    <button type="button card" class="list-group-item list-group-item-action" 
                    onClick={this.Change}>INSPECT</button>
                    {p}
                    {o}
                    {q}                    
                </div>

                <div class="row"><i>API provided by:<a href="https://haveibeenpwned.com/Passwords">';--have i been pwned?</a></i></div>
            </div>
        )
    }
}