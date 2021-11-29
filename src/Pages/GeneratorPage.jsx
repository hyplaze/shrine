import { Component } from "react";
import NavBar from "../Components/NavBar";
import QuickGeneration from "../Components/QuickGeneration";
import CustomizeGeneration from "../Components/CustomizeGeneration";



export default
    class GeneratorPage extends Component {

    constructor(props) {
        super(props)
        this.state = { window: "QuickGeneration" }
    }


    //TODO:
    //have a length field for the webpage, in which:
    //the value in the field could be passed in to the 
    //length attribute of state.password.
    //
    //have a number check field for the webpage, in which:
    //the Boolean value of the field could be passed in to 
    //the numbers attribute of state.password
    //
    //have an Uppercase check field for the webpage, in whcih:
    //the Boolean value of the field could be passed in to
    //the uppercase attribute of state.password
    //
    //have a special character field for the webpage, in which:
    //the value of the field could be passed in to 
    //the symbol attribute of state.password.
    //(NOTE: if the field is empty, symbol attribute will be boolean false)
    //
    //have a strict check field for the webpage, in which:
    //the Boolean value of the field could be passed in to
    //the stric attribute of the state.password
    //
    //A field to display the password as well as a botton so that we
    //could implement a copy function.

    render() {

        let generatorContent = this.state.window === "QuickGeneration" ? <QuickGeneration /> : <CustomizeGeneration />

        return (
            <div class="container-fluid">
                <div class="row">
                    <NavBar page="GeneratorPage" />
                </div>
                <div class="row" style={{ marginTop: "1%" }}>

                    <div class="col-3">
                        <div class="list-group">
                            <button type="button" class="list-group-item list-group-item-action" onClick={
                                () => this.setState({ window: "QuickGeneration" })
                            }>
                                Quick Generation
                            </button>
                            <button type="button" class="list-group-item list-group-item-action" onClick={
                                () => this.setState({ window: "CustomizeGeneration" })
                            }>
                                Customize
                            </button>
                        </div>
                    </div>

                    <div class="col-9">
                        {generatorContent}
                    </div>
                </div>


            </div>

        )
    }
}


