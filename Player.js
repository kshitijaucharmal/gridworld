class Player{
    constructor(){
        this.state = start_point
        this.pos = this.get_pos_from_state(this.state);
        this.size = cell_size;
        this.offset = cell_size/2;
    }

    show(){
        push();
        fill(0, 150, 255);
        rect(this.pos.x - this.offset, this.pos.y - this.offset, this.size, this.size);
        pop();
    }

    reset(){
        this.state = int(random(n_states-1));
        return this.state;
    }

    update(){
        this.pos = this.get_pos_from_state(this.state);
    }

    step(action, render=true){
        let observation = this.move(action)
        let rew = this.get_reward()
        let reward = rew[0]
        let done = rew[1]
        if(render){
            this.update()
            this.show();
        }
        return [observation, reward, done]
    }

    get_reward(){
        let reward = -1;
        let done = false;
        if (this.state == finish_point){
            reward = 100;
            done = true;
        }
        return [reward, done];
    }

    move(dir){
        switch(dir){
            case 0:
                // UP
                if(this.state % rows == 0)break;
                this.state --;
                break;
            case 1:
                //DOWN
                if((this.state+1) % rows == 0)break;
                this.state ++;
                break;
            case 2:
                // LEFT
                if(this.state < rows) break;
                this.state -= rows;
                break;
            case 3:
                // RIGHT
                if(this.state >= (rows * cols - rows)) break;
                this.state += rows;
                break;
            default:
                console.log("Wrong Direction Entered" + dir);
        }
        return this.state
    }

    get_pos_from_state(state){
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if(i * cols + j === state){
                    return createVector(i * cell_size + offset, j * cell_size + offset);
                }
            }
        }
        return createVector(0, 0);
    }
}
