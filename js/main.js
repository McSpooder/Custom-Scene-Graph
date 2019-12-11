//This function runs as soon as the script is loaded.
function onLoad() {

    var mainCanvas, mainContext, rootNode, lastTime, horizontalDistance, verticalDistance, sceneObjectsList, originTranslationMtx, gravityAcceleration;

    function activatePresent(){
        //activates the present to be effected by gravity.
        presentSprite1.mActive = true;
    }

    //this function will initialise our variables
    function initialiseCanvasContext() {
        //find the canvas element using its id atribute.
        mainCanvas = document.getElementById('mainCanvas');
        document.getElementById('DropPresent').onclick = activatePresent;
        //if it couldnt be found
        if (!mainCanvas) {
            //make a message box pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        //Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context!');
            return;
        }

        //choose line width
        mainContext.lineWidth = 5;
        //set the line join
        mainContext.lineJoin = 'round';

        lastTime = Date.now();
        horizontalDistance = -300;
        verticalDistance = -200;
        gravityAcceleration = 0.001;

        //Root node of the scene graph is made with a translation matrix. The matrix will move the origin to the center of the canvas during execution.
        originTranslationMtx = Matrix.createTranslation(new Vector(mainCanvas.width/2, mainCanvas.height/2, 1));
        rootNode = new SceneGraphNode(originTranslationMtx);

        buildSceneObjects();
        buildSceneGraph();
        
    }

    //this function builds the scene objects that will be responsible for creating its scenegraph branch. These objects will be used to populate the scene graph.
    //These objects will not be contained in the scene graph itself.
    function buildSceneObjects(){

        //The image objects are instantiated and linked to their files.
        var cloudImage = new Image();
        cloudImage.src = 'images/cloud.png';
        var baubleImage = new Image();
        baubleImage.src = 'images/Bauble.png';


        //The main objects of the scene are instantiated here.
        var ground = new SceneObject(mainContext, "ground",new Vector(0,0,1));
        var cloudSprite1 = new Sprite(cloudImage,mainContext, new Vector(-300,-200,1), new Vector(0.15, 0.15, 0.15));
        var cloudSprite2 = new Sprite(cloudImage,mainContext, new Vector(-200,-220,1), new Vector(0.25, 0.25, 0.25));
        var baubleSprite1 = new Sprite(baubleImage, mainContext, new Vector(200, -350, 1), new Vector(0.35, 0.35, 1),0, 0.9);
        var baubleSprite2 = new Sprite(baubleImage, mainContext, new Vector(-200, 200, 1), new Vector(0.35, 0.35, 1),0, 0.9);
        var moon = new SceneObject(mainContext,"moon",new Vector(-300,-200,1));
        //var rectangle = new SceneObject(mainContext,"rectangle",new Vector(200,0,1), new Vector(1,1,1),2.6);

        //default values are set
        cloudSprite1.mActive = true;
        cloudSprite2.mActive = true;
        baubleSprite1.mActive = true;
        baubleSprite2.mActive = true;
        //rectangle.mActive = false;

        cloudSprite1.addVelocity(new Vector(0.04,0,1));
        cloudSprite2.addVelocity(new Vector(0.065,0,1));
        baubleSprite1.accelerate(new Vector(0,0.001,1)); //acceleration due to gravity
        baubleSprite2.addVelocity(new Vector(0.04,0,1));

        sceneObjectsList = [];

        sceneObjectsList.push(ground);
        sceneObjectsList.push(moon);
        sceneObjectsList.push(cloudSprite1);
        sceneObjectsList.push(cloudSprite2);
        sceneObjectsList.push(baubleSprite1);
        sceneObjectsList.push(baubleSprite2);
        //sceneObjectsList.push(rectangle);

        //set default begining values


    }


    //This function builds the scene graph that will be used to transform the canvas context and draw the objects on it.
    function buildSceneGraph(){
        
        //iterates through the objects to add scenegraph branches to the root world scene graph node.
        var i;
        for (i = 0; i < sceneObjectsList.length; i++){
            rootNode.addChild(sceneObjectsList[i].getRootNode());
        }

    }

    //this function checks if an object is on the line using the principle of y = mx + c
    function checkIfOnLine(pObjX, pObjY, pGradient, pConstant){
        var a = (pObjX*pGradient + pConstant).toString();
        var b = (-pObjY).toString();
        if (a[0] == b[0] && a[1] == b[1] ){
            return true;
        }
        else{
            return false;
        }
    }

    function reflectVectorToNormal(pVector, pGradient, pConstant){
        return new Vector(-pVector.mX, pVector.mY, 1);
    }
    //if a collision is detected here it then goes on to the second collision detection. This function does not account the size of the object. 
    function detectCollisions(){
        //detects collision between the ball and the floor. Velocity is reversed.
        var bauble = sceneObjectsList[4];
        var bauble2 = sceneObjectsList[5];
        var radius = 50;
        if (bauble.mPosition.mY > (mainCanvas.height/2)-100){

            bauble.mPosition.mY =  bauble.mPosition.mY - 10;
            bauble.addVelocity(bauble.mVelocity.multiply(-2*bauble.mDensity));
        }

        //this code is responsible for ball collisions.
        distanceBetweenX = bauble.mPosition.mX - bauble2.mPosition.mX;
        distanceBetweenY = bauble.mPosition.mY - bauble2.mPosition.mY;

        //checks if the distance between two balls is positive and makes it if its not.
        if (Math.sqrt(distanceBetweenX*distanceBetweenX) != distanceBetweenX){
            distanceBetweenX = -distanceBetweenX;
        }
        if (Math.sqrt(distanceBetweenY*distanceBetweenY) != distanceBetweenY){
            distanceBetweenY = -distanceBetweenY;
        }
        //if the balls are touching, we only need to check one dimension for this.
        if (distanceBetweenX < radius*2 && distanceBetweenY < radius*2){
            console.log("11collision between balls");
            baubleResultX = bauble.mPosition.mX - bauble2.mPosition.mX;
            baubleResultY = bauble.mPosition.mY - bauble2.mPosition.mY;
            var resultVector1 = new Vector(baubleResultX, baubleResultY,1);

            baubleResultX = bauble2.mPosition.mX - bauble.mPosition.mX;
            baubleResultY = bauble2.mPosition.mY - bauble.mPosition.mY;
            var resultVector2 = new Vector(baubleResultX,baubleResultY,1);

            //reset velocity to zero
            bauble.addVelocity(bauble.mVelocity.multiply(-1*bauble.mDensity));
            //add new velocity
            bauble.addVelocity(resultVector1.multiply(bauble.mVelocity.magnitude()));

        }
        
    }

    function updateSceneObjects(pDeltaTime){
        var i;
        for(i = 0; i<sceneObjectsList.length; i++){
            sceneObjectsList[i].update(pDeltaTime);
            sceneObjectsList[i].initialiseSceneGraph();
        }
    }

    function update(pDeltaTime) {

        detectCollisions();
        updateSceneObjects(pDeltaTime);

    }

    //This function will be run periodically via the Animation loop.
    //Responsible for starting the recursive scene graph draw method.
    function draw() {

        //setting the color.
        mainContext.fillStyle = "#3C415B";
        //fill the canvas with black
        mainContext.fillRect(0,0,mainCanvas.width, mainCanvas.height);

        rootNode.draw(mainContext,new Matrix(1,0,0,0,1,0,0,0,1));

    }

    //This function will be called every 1/60th of a seccond. Assuming the animation is running at 60 fps.
    //It periodically calls the update and draw functions and calculates the change in time between frames.
    function animationLoop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        update(deltaTime);
        draw();
        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    
    initialiseCanvasContext();
    animationLoop();

}

window.addEventListener('load', onLoad, false);