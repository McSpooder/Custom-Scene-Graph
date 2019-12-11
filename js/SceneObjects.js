class DrawMoon {


    constructor(pContext) {
        this.mContext = pContext
    }



    draw() {

        this.mContext.beginPath();
        this.mContext.fillStyle = "#D8D8D8"; //almost white
        this.mContext.strokeStyle = "#000000"
        this.mContext.arc(0, 0,70, 0, 2*Math.PI);
        this.mContext.fill();
        this.mContext.stroke();
        //draws the craters on the moon
        this.mContext.beginPath();
        this.mContext.fillStyle = "#BABABA"; //darker than almost white
        this.mContext.strokeStyle = "#9B9B9B" //lighter than grey
        this.mContext.arc(20, 10, 15, 0, 2*Math.PI);
        this.mContext.fill();
        this.mContext.beginPath();
        this.mContext.arc(-30, 5, 25, 0, 2*Math.PI);
        this.mContext.fill();
        this.mContext.beginPath();
        this.mContext.arc(2, -39, 12, 0, 2*Math.PI);
        this.mContext.fill();

    }


}

class DrawGround {
    constructor(pContext) {
        this.mContext = pContext
    }

    draw() {
        this.mContext.fillStyle = "#D8D8D8"; //almost white
        this.mContext.fillRect(-mainCanvas.width/2, 200,mainCanvas.width, mainCanvas.height);
    }
}

class DrawRectangle{
    constructor(pContext){
        this.mContext = pContext;
    }

    draw(){
        this.mContext.beginPath();
        this.mContext.fillStyle = "#BABABA";
        this.mContext.moveTo(-100, 10);
        this.mContext.lineTo(100, 10);
        this.mContext.lineTo(100, -10);
        this.mContext.lineTo(-100,-10);
        this.mContext.lineTo(-100, 10);
        this.mContext.fill()
        this.mContext.stroke();

    }
}

class SceneObject {

    constructor(pContext, pObjectType, pPosition, pScale, pRotation){

        //contstraints of the object
        this.mActive = true;

        //members to do with drawing the object
        this.mObjectType = pObjectType;
        this.mContext = pContext;
        this.mPosition = pPosition;
        this.mScale = pScale;
        this.mRotation = pRotation;

        //members to do with the physics of the object
        this.mAcceleration = new Vector(0,0,1);
        this.mVelocity = new Vector(0,0,1);
        this.mCollisionDetected = false;

        this.setRootNode();
        this.initialiseSceneGraph();
    }

    getRootNode(){
        return this.rootNode;
    }

    setRootNode(){
        //RootNode will be the main translation node of the moon.
        if (this.mPosition == null){
            this.mPosition = new Vector(0,0,1);
        }
        this.rootNode = new SceneGraphNode(Matrix.createTranslation(this.mPosition));
    }

    collisionDetected(pDetected){
        this.mCollisionDetected = pDetected;
    }

    initialiseSceneGraph() {

        this.rootNode.mMatrix = Matrix.createTranslation(this.mPosition);
        this.rootNode.mChildren = [];
        
        if (this.mScale != null && this.mRotation != null){
            var scaleNode = new SceneGraphNode(Matrix.createScale(this.mScale));
            var rotationNode = new SceneGraphNode(Matrix.createRotation(this.mRotation));
            if (this.mObjectType == "moon"){
                rotationNode.addChild(new DrawMoon(this.mContext));
            }
            else if (this.mObjectType == "ground"){
                rotationNode.addChild(new DrawGround(this.mContext));
            }
            else if (this.mObjectType == "rectangle"){
                rotationNode.addChild(new DrawRectangle(this.mContext));
            }

            scaleNode.addChild(rotationNode);
            this.rootNode.addChild(scaleNode);
        }
        else if(this.mScale != null){
            var scaleNode = new SceneGraphNode(Matrix.createScale(this.mScale));

            if (this.mObjectType == "moon"){
                scaleNode.addChild(new DrawMoon(this.mContext));
            }
            else if (this.mObjectType == "ground"){
                scaleNode.addChild(new DrawGround(this.mContext));
            }
            else if (this.mObjectType == "rectangle"){
                scaleNode.addChild(new DrawRectangle(this.mContext));
            }

            this.rootNode.addChild(scaleNode);

        }
        else{
            if (this.mObjectType == "moon"){
                this.rootNode.addChild(new DrawMoon(this.mContext));
            }
            else if (this.mObjectType == "ground"){
                this.rootNode.addChild(new DrawGround(this.mContext));
            }
            else if (this.mObjectType == "rectangle"){
                this.rootNode.addChild(new DrawRectangle(this.mContext));
            }

        }
        
    }

    accelerate(pAcceleration){ 
        this.mAcceleration = this.mAcceleration.add(pAcceleration);
    }

    addVelocity(pVelocity){

        this.mVelocity = this.mVelocity.add(pVelocity);

    }

    addPosition(pPosition){
        this.mPosition = this.mPosition.add(pPosition);
    }

    //this function updates the properties of the object relating to physics. 
    //If an acceleration is not inputed the positional change is determined by the inputed velocity only. The velocity does not stack with previous one.
    update(pDeltaTime){

        if (this.mActive == true){

            this.addVelocity(this.mAcceleration.multiply(pDeltaTime));
            this.addPosition(this.mVelocity.multiply(pDeltaTime));

        }
        
        //the collision is now considered to have siezed. This may get changed in the update function in main.
        //this.mCollisionDetected = false;
    }

    getPosition() {
        return this.mPosition;
    }

}

