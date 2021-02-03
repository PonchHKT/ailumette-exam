const readlineSync = require('readline-sync');
const fs = require("file-system");
class Ailumette{
    
     gameData  ;
     maxValueY = 0;
     maxValueX = 0 ;
     PositionXY = {};
     resultData = "";

    Game() {

        let result =  fs.readFileSync('./map/map.txt', 'utf8');
        let resultLine = result.split('\n');         
        let y = -1;

        for (let line of resultLine) {
            let x  = -1;
            y++;
            if (this.maxValueY <= y) {
                this.maxValueY = y + 1
            }
            if (!line) { break; }
            for (let value of line.split('')) {
                x++;
                if (this.maxValueX < x) {
                    this.maxValueX = x
                }
                let position = `${x}:${y}`;
                this.PositionXY[position] = {
                    value: value
                }
            }
        }  
      }

      viewData(){
        let oldY = 0;
        this.gameData = "";
      for (let obj in this.PositionXY) {
          let bot = obj.split(":");
          let X = parseInt(bot[0], 10)
          let Y = parseInt(bot[1], 10)
          if (Y > oldY) {
            this.gameData = this.gameData + '\n'
          }
          this.gameData = this.gameData + this.PositionXY[obj]['value']
          oldY = Y
      }
      console.log(this.gameData);
    }

    testValid(nbDemise, y) {
		let x = 0;
        let count = 0;

		while (x !== this.maxValueX) {
              
               if (this.PositionXY[`${x}:${y}`]['value'] == '|') {
                   if (count != nbDemise) {
                       count++
                       this.PositionXY[`${x}:${y}`]['value'] = ' '
                   } else {
                       this.PositionXY[`${x}:${y}`]['value'] = '|'
                   }
               }
            x++;    
		}
    }
    
    MatchesAll() {

		let count = 0
		Object.entries(this.PositionXY).forEach(obj => {
			if (obj[1].value == '|') {
				count++
			}
		});
    return count;
    
    }
    
    replay(){
       while(this.maxValueX == 0 && this.maxValueY == 0){
            if (this.PositionXY[`${x}:${y}`]['value'] == ''){
                console.log("ok")
            }
       }

    }
    
}

function jouer(ailumette) {

    let line ;
    let valide;
	line = readlineSync.question('Choisissez une ligne : ')	
	valide = readlineSync.question('Allumettes : ');
		
	ailumette.testValid(valide, line)
	if (ailumette.MatchesAll() ===  0) {
		console.log("GAME OVER, YOU LOST.")
        ailumette.viewData()
        ailumette.replay()

    }


    
}

function nbrPipe(ailumette, y){ 
    let x = 0;
    let count = 0;
		while (x !== ailumette.maxValueX) {   

               if (ailumette.PositionXY[`${x}:${y}`]['value'] == '|') {
                   count++
               }
            x++;    
        }
        
        return count;
}

function IAPlays(ailumette){

let valueY = 0
while(nbrPipe(ailumette,valueY) <= 0){
    valueY = Math.round(Math.random() * ((ailumette.maxValueY - 2) - 1 + 1) + 1)
}

let valueX = 0
while(valueX <= 0){
   valueX =  Math.round(Math.random() * (nbrPipe(ailumette,valueY) - 0 + 1) + 0)

}

ailumette.testValid(valueX,valueY)
console.log('IA Joue Axe X :'+ valueX)
console.log('IA Joue Axe Y :'+ valueY)

}




function main(){

let ailumette = new Ailumette;
    ailumette.Game()
    ailumette.viewData()

    while(ailumette.MatchesAll() !== 0){
        jouer(ailumette)
        ailumette.viewData()
        IAPlays(ailumette)
        ailumette.viewData()
    };
    
}


main()