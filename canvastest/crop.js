var img_src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';

$('document').ready(function() {

    var canvas = document.getElementById('test');
    var canvas2= document.getElementById('test2');
        

    if (canvas.getContext) {
        var holding = 'none';
        var holding_x = 0;
        var holding_y = 0;
        var ctx = canvas.getContext('2d');
        var ctx2 = canvas2.getContext('2d');
        c_width = canvas.width;
        c_height = canvas.height;
        var img = new Image();
        img.onload = function() {
            factor = Math.min(c_width/img.width, c_height/img.height);

            canvas_x = canvas;
            var x = 0;
            var y = 0;
            var width = img.width/2*factor;
            var height = img.width/2*factor;
            $(canvas).mousemove(function(e) {
                mouse_x = e.pageX - this.offsetLeft;
                mouse_y = e.pageY - this.offsetTop;
                if (holding !== 'none') {
                    switch (holding) {
                        case 'top_left':
                            dx = mouse_x - x;
                            dy = mouse_y - y;
                            x = x + dx;
                            y = y + dy;
                            width = width - dx;
                            height = height - dy;
                            break;
                        case 'buttom_left':
                            dx = mouse_x - x;
                            dy = mouse_y - (y + height);
                            x = x + dx;
                            width = width - dx;
                            height = height + dy;
                            break;
                        case 'top_right':
                            dx = mouse_x - (x + width);
                            dy = mouse_y - y;
                            y = y + dy;
                            width = width + dx;
                            height = height - dy;
                            break;
                        case 'buttom_right':
                            dx = mouse_x - (x + width);
                            dy = mouse_y - (y + height);
                            width = width + dx;
                            height = height + dy;
                            break;
                        case 'middle':
                            dx = mouse_x - (x + holding_x);
                            dy = mouse_y - (y + holding_y);
                            x += dx;
                            y += dy;
                            break;

                    }
                    if (x+width > img.width*factor){
                        width = img.width*factor-x;
                    }
                    if (x < 0) {
                        x = 0;
                    }
                    if (y + height > img.height*factor) {
                        height = img.height*factor - y;
                    }
                    if (y < 0) {
                        y = 0;
                    }
                    drawImage(x, y, width, height);
                }
            });
            $(canvas).mousedown(function(e){
                if(e.which === 1) {
                    mouse_x = e.pageX - this.offsetLeft;
                    mouse_y = e.pageY - this.offsetTop;
                    r = 10;
                    if (mouse_x > x-r && mouse_x < x+r){
                        if (mouse_y > y-r && mouse_y < y+r) {
                            holding = 'top_left';
                        } else if (mouse_y > y+height-r && mouse_y < y+height+r) {
                            holding = 'buttom_left';
                        }
                    } else if (mouse_x > x+width-5 && mouse_x < x+width+r){
                        if (mouse_y > y-r && mouse_y < y+r) {
                            holding = 'top_right';
                        } else if (mouse_y > y+height-r && mouse_y < y+height+r) {
                            holding = 'buttom_right';
                        }
                    } else if (mouse_x > x && mouse_x < x+width
                        && mouse_y > y && mouse_y < y+width){
                            holding = 'middle';
                            holding_x = mouse_x-x;
                            holding_y = mouse_y-y;
                    }
                }
                console.log(holding);
            });
            $(document).mouseup(function(e){
                if(e.which === 1) holding = 'none';
            });
            drawImage = function(x, y, width, height) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx.drawImage(img, 0, 0, img.width*factor, img.height*factor);
                
                var dest_height, dest_width;
                var ratio = width/height;
                if (width < height) {
                    dest_height = canvas2.height;
                    dest_width = canvas2.height*ratio;
                } else {
                    dest_width = canvas2.width;
                    dest_height = canvas2.width/ratio;
                }
                ctx2.drawImage(img, x/factor, y/factor, width/factor, height/factor, 0, 0,
                        dest_width, dest_height);
                
                ctx.fillStyle="rgba(0, 0, 10, 0.7)";
                ctx.fillRect(0, 0, img.width, img.height);

                ctx.beginPath();
                ctx.rect(x,y, width, height);
                ctx.strokeStyle="#ccc";
                ctx.lineWidth = 5;
                ctx.lineJoin = "round";
                ctx.stroke();
                ctx.save();
                ctx.clip();
                ctx.drawImage(img, 0, 0, img.width*factor, img.height*factor);
                ctx.restore();
                ctx.fillStyle = "#222";
                ctx.lineWidth = 5;
                
                ctx.strokeRect(x-5, y-5, 10, 10);
                ctx.fillRect(x-5, y-5, 10, 10);
                
                ctx.strokeRect(x-5, y+height-5, 10, 10);
                ctx.fillRect(x-5, y+height-5, 10, 10);
                
                ctx.strokeRect(x+width-5, y-5, 10, 10);
                ctx.fillRect(x+width-5, y-5, 10, 10);
                
                ctx.strokeRect(x+width-5, y+height-5, 10, 10);
                ctx.fillRect(x+width-5, y+height-5, 10, 10);
            };
            drawImage(x, y, width, height);
        };
        img.src = 'bilde.jpg';

    } else {
        alert("You are not supporting canvas");
    }
});
