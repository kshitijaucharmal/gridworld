
let cell_size = 30;
let offset;
let rows, cols;
let player;
let n_states;
let heuristic = false;
let finish_point;
let start_point = 0;

let learning_rate;
let discount;

const State = {
    TRAIN : 0,
    TEST: 1,
    PAUSED: 2
};
Object.freeze(State);

let state = State.TRAIN;

function PauseGame(){
    state = State.PAUSED;
}

function setup(){
    let mycanvas = createCanvas(600, 600);
    mycanvas.parent("GameCanvas");
    rows = height/cell_size;
    cols = width/cell_size;
    offset = cell_size/2;
    n_states = rows * cols;
    finish_point = n_states-1; // temp

    learning_rate = parseFloat(f.lr.value);
    discount = parseFloat(f.d.value);

    player = new Player();
}

function draw(){
    background(12);

    if(f.pauseButton.checked){
        state = State.PAUSED;
    }
    else{
        state = State.TRAIN;
    }

    heuristic = f.heuristic.checked;

    switch(state){
        case State.TRAIN:
            // player
            if(!heuristic)
                player.step(int(random(4)));
            else{
                player.update();
                player.show();
            }

            // grid
            if(f.gridlines.checked) draw_grid();
            draw_markers();
            if(f.statenumbers.checked) draw_grid_numbers();
            break;
        case State.TEST:
            console.log("Testing");
            break;
        case State.PAUSED:
            push();
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(30);
            text("PAUSED", width/2, height/2);
            textSize(22);
            text("You Can Tweak the Parameters now", width/2, height/2+30);
            pop();

            // grid
            if(f.gridlines.checked) draw_grid();
            draw_markers();

            break;
        default:
            console.log("State Error");
    }
}

function keyPressed(){
    if(!heuristic) return;
    if(keyCode == UP_ARROW) player.step(0);
    if(keyCode == DOWN_ARROW) player.step(1);
    if(keyCode == LEFT_ARROW) player.step(2);
    if(keyCode == RIGHT_ARROW) player.step(3);
}

function draw_grid(){
    push();
    stroke(255);
    for(let i = 0; i < rows; i++){
        line(0, i * cell_size, width, i * cell_size);
    }
    for(let i = 0; i < cols; i++){
        line(i * cell_size, 0, i * cell_size, height);
    }
    pop();
}

function draw_markers(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(i * cols + j == finish_point){
                push();
                fill(0, 255, 0, 100);
                rect(i * cell_size, j * cell_size, cell_size, cell_size);
                pop();
            }
        }
    }
}

function draw_grid_numbers(){
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(15);
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            text(i * cols + j, i * cell_size + offset, j * cell_size + offset);
        }
    }
    pop();
}
