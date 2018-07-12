<template>
  <div class="cont">
    <div class="upper">
        <div
            v-for="rect in rects"
            class="rectuangle"
            :id="rect.id"
            :style="{ top: rect.top + 'px', left: rect.left + 'px'}"
            v-if="rect.show"
        > {{ rect.count }} </div>
    </div>
<!--    //!!! important $event to be used. Otherwise doesn't work-->
    <div @mousemove="getStartPosition($event)" @mousedown="setStartPosition($event)" @mouseup="readyStartPosition($event)" class="down">
        
    </div>
    <div    v-for="round in rounds"
            v-if="round.show"
            class="round"
            :id="round.id"
            :style="{ top: round.top + 'px', left: round.left + 'px'}"
            ></div>
    <div v-if=" traceLine.display "
     :style="{ width: traceLine.width + 'px', transform:  'rotate(' + traceLine.angle + 'deg)', top: this.traceLine.top + 'px', left: this.traceLine.left + 'px'}"
      class="trace"><div :style="{float: traceLine.floatLR}" class="traceRight"></div></div>
  </div>
</template>

<script>
export default {
  name: 'Tennis',
  data () {
    return {
      numbRects: 20,
      numbRounds: 30,
      rects: [],
      onDrag: true,
      onStartMove: false,
      showTrace: false,
      rounds: [
          {
              id: "1234567",
              top: "977",
              left: "10",
              moveVer: "1",
              moveHor: "1",
              show: true
          }
      ],
      traceLine: {
          width: "100",
          angle: "0",
          left: "0",
          top: "997",
          display: false,
          floatLR: "left"
      },
      moveDir: {
          ver: "1",
          hor: "1"
      }
    }
  },
  timers: {
      mSecondsVer: { time: "", autostart: true, repeat: true },
      mSecondsHor: { time: "", autostart: true, repeat: true }
  },
    methods: {

        mSecondsVer(){
            this.rounds.forEach((round, index) => {
                let DOMround = document.getElementById(round.id); // get ball DOM by id
                let walls = document.getElementsByClassName("cont")[0]; // get bounds of area
                
                let rTop,rRight, rBottom, rLeft; // coords of a ball
                let wTop,wRight, wBottom, wLeft; // coords of a ball
                let GBCRball = DOMround.getBoundingClientRect(); // get coords of ball
                let GBCRwall = walls.getBoundingClientRect(); // get coords of ball
                
                rTop = parseInt(GBCRball.top) - walls.offsetTop - walls.clientTop;
                rRight = parseInt(GBCRball.right) - walls.offsetLeft - walls.clientLeft;
                rBottom = parseInt(GBCRball.bottom) - walls.offsetTop - walls.clientTop;
                rLeft = parseInt(GBCRball.left) - walls.offsetLeft - walls.clientLeft;
                
                wTop = parseInt(GBCRwall.top);;
                wRight = parseInt(GBCRwall.right);;
                wBottom = parseInt(GBCRwall.bottom);;
                wLeft = parseInt(GBCRwall.left);
                
                if (rTop <= wTop){
                    round.moveVer*=(-1);
                }
                if(rBottom >= wBottom && round.moveVer==-1){
                    if(this.rounds.length == 1){
                        this.$timer.stop("mSecondsVer");
                        this.$timer.stop("mSecondsHor");
                        this.onDrag = true;
                    }
                    else
                        {
                            round.show = false;
                            this.rounds.splice( index ,1)
                        }
                }
                
                this.rects.forEach((rect, index) => {
//                    console.log( rTop + " - " + parseInt(rect.top) + " - " + rBottom + " - " + parseInt(rect.top) + " - " + " - " + Math.abs(rLeft - parseInt(rect.left)));
                   
                    if ( parseInt(rect.top) + 30 == rTop && round.moveVer > 0 || rBottom == parseInt(rect.top) && round.moveVer < 0){
                        if(Math.abs(rLeft - parseInt(rect.left)) < 30){
//                            alert("v " + rTop + " - " + parseInt(rect.top) + " - " + rBottom + " - " + parseInt(rect.top) + " - " + rLeft + " - " + parseInt(rect.left) + " - " + rect.count);
                            round.moveVer*=(-1);
                            rect.count--;
                            if(rect.count == 0){
                                rect.show=false;
                                this.rects.splice(index, 1);
                            }
                        }
                    }
                })
                
                round.top = parseInt(round.top) - +round.moveVer; //57.29 - translate from radian
            })
            

            
        },
         mSecondsHor(){
            this.rounds.forEach((round) => {
                let DOMround = document.getElementById(round.id); // get ball DOM by id
                let walls = document.getElementsByClassName("cont")[0]; // get bounds of area
                
                let rTop,rRight, rBottom, rLeft; // coords of a ball
                let wTop,wRight, wBottom, wLeft; // coords of a ball
                let GBCRball = DOMround.getBoundingClientRect(); // get coords of ball
                let GBCRwall = walls.getBoundingClientRect(); // get coords of ball
                
                rTop = parseInt(GBCRball.top) - walls.offsetTop - walls.clientTop;
                rRight = parseInt(GBCRball.right) - walls.offsetLeft - walls.clientLeft;
                rBottom = parseInt(GBCRball.bottom) - walls.offsetTop - walls.clientTop;
                rLeft = parseInt(GBCRball.left) - walls.offsetLeft - walls.clientLeft;
                //alert( " - " + walls.offsetTop + " - " + walls.clientTop);
                
                wTop = parseInt(GBCRwall.top);;
                wRight = parseInt(GBCRwall.right);;
                wBottom = parseInt(GBCRwall.bottom);;
                wLeft = parseInt(GBCRwall.left);
                
                if (rLeft <= wLeft || rRight >= wRight ){
                    round.moveHor*=(-1)
                }
                
                this.rects.forEach((rect, index) => {
//                    console.log( rTop + " - " + parseInt(rect.top) + " - " + rBottom + " - " + parseInt(rect.top) + " - " + " - " + Math.abs(rLeft - parseInt(rect.left)));
                    if ( parseInt(rect.left) + 30 == rLeft && round.moveHor < 0 || rRight == parseInt(rect.left) && round.moveHor > 0 ){
                        if(Math.abs(rTop - parseInt(rect.top)) < 30){
//                            alert("h " + rTop + " - " + parseInt(rect.top) + " - " + rBottom + " - " + parseInt(rect.top) + " - " + rLeft + " - " + parseInt(rect.left) + " - " + rect.count);
                            round.moveHor*=(-1);
                            rect.count--;
                             if(rect.count == 0){
                                rect.show=false;
                                this.rects.splice(index, 1);
                            }
                        }
                    }
                })
                
                 round.left = parseInt(round.left) + +round.moveHor;
                
            })
        },
        getStartPosition(event){
            if(this.onDrag)
            {this.rounds.forEach((round) => {
                round.left = event.pageX - 7
            })}
            if (this.onStartMove) {
//                show it
                let x1,x2,y1,y2;
                x1 = event.clientX;
                x2 = this.rounds[0].left;
                y1 = event.clientY;
                y2 = this.rounds[0].top;
                this.traceLine.width = 2*Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
                
                this.traceLine.left = x2 - this.traceLine.width/2 + 6;
                this.traceLine.angle = Math.atan((y2 - y1)/( x1 - x2 ))*(-57.29);
                this.traceLine.floatLR = this.traceLine.angle>0?"left":"right";
            }
        },
        setStartPosition($event){
            this.onDrag = false;
            this.showTrace = true;
            this.onStartMove = true;
            this.traceLine.display = true;
        },
         readyStartPosition($event){
             let base = 10;
             if (Math.abs(Math.tan(+this.traceLine.angle/57.29))<1){
                 alert();
                 base = 3
             }
            this.$timer.stop("mSecondsVer");
            this.$timer.stop("mSecondsHor");
             console.log(Math.tan(+this.traceLine.angle/57.29));
            this.timers.mSecondsVer.time = base/Math.abs(Math.tan(+this.traceLine.angle/57.29));
            this.timers.mSecondsHor.time = base;
            this.$timer.start("mSecondsVer");
            this.$timer.start("mSecondsHor");
             
            this.onDrag = false;
            this.showTrace = false;
            this.onStartMove = false;
            this.traceLine.display = false;
            this.$timer.start("mSecondsVer")
            this.$timer.start("mSecondsHor")
            
               if ( this.traceLine.angle > 0 ){
                        this.rounds.forEach(round => round.moveHor = -1)
                    }
                      else{
                        this.rounds.forEach(round => round.moveHor = 1)
                    }
             
              for (var i = 1 ; i < this.numbRounds ; i++){
                this.addRound(i)
            }
        },
        add(){
            this.$timer.stop("mSecondsVer");
            this.$timer.stop("mSecondsHor");
            let winWidth = document.getElementsByClassName('upper')[0].offsetWidth;
            let winHeight = document.getElementsByClassName('upper')[0].clientHeight;
            let newTop, newLeft = 0;
            let flag1 = true;
            let flag2 = true;
            let count = 0;
            
            while (flag1){
                flag1 = false;
                newTop = GetNumber(1, winHeight - 30);
                newLeft = GetNumber(1, winWidth - 30);
//                for (var tops in this.rects){
//                    console.log(tops)
//                }
                this.rects.forEach( (tops) => {
                    if ( Math.abs(newTop - tops.top) < 40 && Math.abs(newLeft - tops.left) < 40){
                        flag1 = true;
                    }
                 
                } );
                
                count++;
                if (count > 1000){
                    flag1 = false;
                    flag2 = false;
                }
            }

            if (flag2){
                this.rects.push( {
              id: GetNumber(10000000,99999999),
              count: GetNumber(1,30),
              top: newTop,
              left: newLeft,
              show: true
            } )
            }
        },
        addRound(i){
            var Hor;
                 if ( this.traceLine.angle > 0 ){
                        Hor = -1;
                        console.log("-1")
                    }
                      else{
                        Hor = 1;
                          console.log("1")
                    }
//            console.log("with " + (+this.rounds[0].left + (40*i)/Math.tan(+this.traceLine.angle/57.29)*Hor));
//            console.log("without " + (+this.rounds[0].left + (40*i)/Math.tan(+this.traceLine.angle/57.29)));
            
             this.rounds.push( {
              id: GetNumber(1000000,9999999),
              top: +this.rounds[0].top + 40*i,
              left: +this.rounds[0].left + (40*i)/Math.tan(+this.traceLine.angle/57.29),
              moveVer: '1',
              moveHor: Hor,
              show: true
            } )
        }
    },
    mounted() {
        this.$timer.stop('mSecondsVer');
        this.$timer.stop('mSecondsHor');
        for (var i = 0 ; i < this.numbRects ; i++){
            this.add()
        }
    }
}

function GetNumber(min, max){
    return Math.floor((Math.random()*(max - min) + min))
}
</script>


<style scoped>
    .cont{
        width: 90%;
        height: 1000px;
        background-color: azure;
    }
    .upper{
        width: 100%;
        height: 50%;
        background-color: bisque;
    }
    .down {
        width: 100%;
        height: 50%;
        background-color:burlywood;

    }
    .rectuangle{
        width: 30px;
        height: 30px;
        background-color:chartreuse;
        margin: 10px;
        position: absolute;
        text-align: center;
    }
    .round{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        top: 985px;
    }
    .trace{
        height: 2px;
        position: absolute;
    }  
    .traceRight{
        height: 0px;
        border-style: dotted;
        border-bottom: 1px black;
        width: 50%;
    }
</style>
