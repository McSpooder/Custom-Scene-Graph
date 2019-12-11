class SceneGraphNode {

    constructor(pMatrix){

        this.mChildren = [];
        if (pMatrix == undefined) {
            this.mMatrix = Matrix.createIdentity;
        }
        else {
            this.mMatrix = pMatrix; 
        }

    }

    setMatrixCell(column, row, value) {
        this.mMatrix.setValue(column, row, value);
    }

    getNumberOfChildren() {
        return this.mChildren.length;
    }

    getChildAt(pIndex) {
        return this.mChildren[pIndex];
    }

    addChild(pChild){
        this.mChildren.push(pChild);
    }

    loopThroughChildren(pContext, pMatrix){
        var i;
        for (i = 0; i < this.mChildren.length; i++) {
            this.mChildren[i].draw(pContext, pMatrix);
        }
    }

    draw(pContext, pMatrix){
        //pMatrix is the world transform matrix. It stores the transform values of the the scene before this node. After completing this node (on exit) the transform needs to return back to this origin state.
        var transformationMtx = pMatrix.multiply(this.mMatrix);
        transformationMtx.setTransform(pContext);
        this.loopThroughChildren(pContext, transformationMtx);
        pMatrix.setTransform(pContext);
    }

}