import { Component } from "react";
import NavBar from "../Components/NavBar";
const axios = require('axios').default;
const sha1 = require('js-sha1');


var pwnd_dict = {}

//TODO:
//LOOP EVERY BOX,
//for every BOX, do the following and return 
//1. the number of breached boxes
//2. All the boxname of breaches
//3. How many times it has been compromised

async function getBreach(){
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data:{
            cookie: "adhfdfkajhwe" //later implemented
        } 
      }).data;

      console.log(response)

      response.forEach(checkBreach)







const digest = sha1('qwerty').toUpperCase();
console.log(digest);

const digestFront = digest.slice(0,5);
const digestEnd = digest.slice(-35);
console.log(digestFront);
console.log(digestEnd);



async function checkBreach(){
    const res = await axios.get("https://api.pwnedpasswords.com/range/"+digestFront);
    
    let pwnd_list = res.data.split('\r\n');

    

    pwnd_list.forEach(createDictionary);

    function createDictionary(item){
        const pwnd_pair = item.split(":");
        if(pwnd_pair[0]==digestEnd){
            pwnd_dict[pwnd_pair[0]] = pwnd_pair[1];
        }
        
    }

}

const breaches = Object.keys(pwnd_dict).length;
console.log("breach are: " + breaches);

const response = getBreach();
console.log("I am response " +response);
}


export default
class CheckerPage extends Component {
    constructor(props){
        super(props);
        this.state={
            value: 0,
            pressed:false
        }

        this.Change = this.Change.bind(this);
    }

    Change(event){
        getBreach();
        this.setState({value:Object.keys(pwnd_dict).length, pressed:true});
        console.log("my value is " + this.state.value);
    }


    render() {
        let p;
        if(this.state.pressed){
            if(this.state.value!=0){
                p=<p>{"WARNING: TOTAL "+this.state.value+" BREACHES"}</p>
            }else{
                p=<p>{"YOU ARE SAFE"}</p>
            }
        }
        
        return (
            <div class="container-fluid">

                <div class="row">
                    <NavBar page="CheckerPage" />

                    <button type="button card" class="list-group-item list-group-item-action" 
                    onClick={this.Change}>INSPECT</button>
                   
                    {p}
                </div>
            </div>
        )
    }
}
