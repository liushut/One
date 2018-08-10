//主页UI
class HomeUI extends eui.Component{
    constructor(){
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "homeUISkin";
    }
    private uiCompHandler(){
        
    }
}