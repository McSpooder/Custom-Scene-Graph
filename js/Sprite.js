class DrawSprite{
    constructor(pImage, pContext){
       this.mImage = pImage;
       this.mContext = pContext;
    }

    draw(){

        
        this.mContext.drawImage(this.mImage, -this.mImage.width/2,-this.mImage.height/2, this.mImage.width, this.mImage.height);


    }
}

class Sprite{
    constructor(pImage, pContext, pPosition, pScale, pRotation, pDensity){

        //contstraints of the object
        this.mActive = true;

        //members to do with drawing the object
        this.mImage = pImage;
        this.mContext = pContext;
        this.mPosition = pPosition;
        this.mScale = pScale;
        this.mRotation = pRotation;

        //members to do with the physics of the object
        this.mAcceleration = new Vector(0,0,1);
        this.mVelocity = new Vector(0,0,1);
        this.mCollisionDetected = false;
        this.mDensity = pDensity; //goes from 0 to 1, 1 means maximum bounciness.

        this.setRootNode();
        this.initialiseSceneGraph();
    }

    getPosition() {
        return this.mPosition;
    }

    setRootNode()
    {
        if (this.mPosition == null){
            this.mPosition = new Vector(0,0,1);
        }
        this.rootNode = new SceneGraphNode(Matrix.createTranslation(this.mPosition));
    }

    getRootNode()
    {
        return this.rootNode;
    }

    collisionDetected(pDetected){
        this.mCollisionDetected = pDetected;
    }

    initialiseSceneGraph()
    {
        this.rootNode.mMatrix = Matrix.createTranslation(this.mPosition);
        this.rootNode.mChildren = [];

        if (this.mRotation != null){
            var scaleNode = new SceneGraphNode(Matrix.createScale(this.mScale));
            var rotationNode = new SceneGraphNode(Matrix.createRotation(this.mRotation));
            rotationNode.addChild(new DrawSprite(this.mImage, this.mContext));
            scaleNode.addChild(rotationNode);
            this.rootNode.addChild(scaleNode);
        }
        else if(this.mScale != null){
            var scaleNode = new SceneGraphNode(Matrix.createScale(this.mScale));
            scaleNode.addChild(new DrawSprite(this.mImage, this.mContext));
            this.rootNode.addChild(scaleNode);

        }
        else{
            this.rootNode.addChild(new DrawSprite(this.mImage, this.mContext));
        }

    }

    //can be used to accelerate and deccelerate an object
    accelerate(pAcceleration){ 
        this.mAcceleration = this.mAcceleration.add(pAcceleration);
    }

    addVelocity(pVelocity){

        this.mVelocity = this.mVelocity.add(pVelocity);

    }

    addPosition(pPosition){
        this.mPosition = this.mPosition.add(pPosition);
    }


    update(pDeltaTime){

        if (this.mActive == true){

            this.addVelocity(this.mAcceleration.multiply(pDeltaTime));
            this.addPosition(this.mVelocity.multiply(pDeltaTime));

            //so the clouds return to the other side.
            if (this.mPosition.mX > 550){
                this.mPosition.mX = -550;
            }

        }
    }
}