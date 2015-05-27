setWindow();
PlantTree( window.innerWidth/2 , 600, 10 , 5 );
function setWindow(){
  var canv = document.createElement('canvas');
  canv.id = 'idraw';
  canv.setAttribute('width', String(window.innerWidth) );
  canv.setAttribute('height',String(window.innerHeight) );
  document.body.appendChild(canv);
}


function drawline( Pen, x1 , y1 , x2, y2) {
	Pen.beginPath();
    Pen.moveTo(x1,y1);
    Pen.lineTo(x2,y2);
	Pen.lineWidth = 2;
    Pen.stroke();
}


function PlantTree( xpos , ypos, L , I ){
	var myPen = document.getElementById('idraw').getContext('2d');
    myPen.strokeStyle = '#4A7023';
    var gpattern = []; // This is the growth pattern or how the  Tree will look
    gpattern.push('0');
	if( L < 16 ) {
		L = 16;
	}
    var i, j, tempt=[];
    for( i = 0; i < I; i++ ){
        for(j =0; j < gpattern.length; j++){
            switch(gpattern[j]){
                case '0':
                    tempt.push('1'); 
					tempt.push('[');
                    tempt.push('0'); 
					tempt.push(']');
                    tempt.push('0');
                    break;
                case '1':
                    tempt.push('1'); 
					tempt.push('1');
                    break;
                case '[':
                    tempt.push('[');
                    break;
                case ']':
                    tempt.push(']');
                    break;
            }
        }
		gpattern.length = 0;
        gpattern = tempt.slice();
		tempt.length = 0;
    }

	function Parent(nxpos, nypos, nglength, nang) {
		this.cposx = nxpos; this.cposy = nypos;
		this.glength = nglength; this.ang = nang;
	}
	// 11[1[0]0]1[0]0
	var pdl = [], pc = 0; pdl.push( new Parent(xpos, ypos, L, 90) );
	var incre = 0;
	var complete = 0, count= 0;
	function GrowAnimation(){
		if( incre < gpattern.length ){
			switch(gpattern[incre]){
				case '0':
					var nposx = pdl[pc].cposx + (pdl[pc].glength ) * Math.cos( pdl[pc].ang * 0.0174532925);
					var nposy = pdl[pc].cposy - (pdl[pc].glength ) * Math.sin( pdl[pc].ang * 0.0174532925);
					drawline(myPen, pdl[pc].cposx, pdl[pc].cposy, nposx, nposy);
					++incre;
					break;
				case '[':
					pdl.push( new Parent(pdl[pc].cposx,pdl[pc].cposy, pdl[pc].glength, pdl[pc].ang + 45  ) );
					++pc;
					++incre;
					break;
				case ']':
					pdl.splice( pdl.length - 1, 1);
					--pc;
					pdl[pc].glength = pdl[pc].glength;
					pdl[pc].ang -= 45
					++incre;
					break;
				case '1':
					if( complete == 1 ){
						count = 0;
						++incre;
						complete = 0;
					}
					else {

						var nposx = pdl[pc].cposx + (pdl[pc].glength / 16) * Math.cos( pdl[pc].ang * 0.0174532925);
						var nposy = pdl[pc].cposy - (pdl[pc].glength / 16) * Math.sin( pdl[pc].ang * 0.0174532925);
						drawline(myPen,pdl[pc].cposx, pdl[pc].cposy, nposx, nposy);
						pdl[pc].cposx = nposx;
						pdl[pc].cposy = nposy;
					
						++count;
						if( count ==  16 ){
							complete = 1;
						}
					}
					break;
			}
			setTimeout(GrowAnimation, 50);
		}
	} 
	GrowAnimation();
}// end of function 

