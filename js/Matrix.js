class Matrix {

    constructor(x0y0, x1y0, x2y0, x0y1, x1y1, x2y1, x0y2, x1y2, x2y2) {

        this.x0y0 = x0y0;
        this.x1y0 = x1y0;
        this.x2y0 = x2y0;

        this.x0y1 = x0y1;
        this.x1y1 = x1y1;
        this.x2y1 = x2y1;

        this.x0y2 = x0y2;
        this.x1y2 = x1y2;
        this.x2y2 = x2y2;
    }

    setValue(column, row, value) {
        if (row == 0 && column == 0) {
           this.x0y0 = value;
        }
        else if (row == 0 && column == 1) {
            this.x0y1 = value;
        }
        else if (row == 0 && column == 2) {
            this.x0y2 = value;
        }
        else if (row == 1 && column == 0) {
            this.x1y0 = value;
        }
        else if (row == 1 && column == 1) {
            this.x1y1 = value;
        }
        else if (row == 1 && column == 2) {
            this.x1y2 = value;
        }
        else if (row == 2 && column == 0) {
            this.x2y0 = value;
        }
        else if (row == 2 && column == 1) {
            this.x2y1 = value;
        }
        else if (row == 2 && column == 2) {
            this.x2y2 = value;
        }

    }

    getElement(column, row){ 
        if (row == 0 && column == 0) {
            return this.x0y0;
        }
        else if (row == 0 && column == 1) {
            return this.x0y1;
        }
        else if (row == 0 && column == 2) {
            return this.x0y2;
        }
        else if (row == 1 && column == 0) {
            return this.x1y0;
        }
        else if (row == 1 && column == 1) {
            return this.x1y1;
        }
        else if (row == 1 && column == 2) {
            return this.x1y2;
        }
        else if (row == 2 && column == 0) {
            return this.x2y0;
        }
        else if (row == 2 && column == 1) {
            return this.x2y1;
        }
        else if (row == 2 && column == 2) {
            return this.x2y2;
        }

    }

    static createIdentity() {
        return new Matrix(1,0,0,0,1,0,0,0,1) //this put 1s in the diagonal from topleft to bottom right into the matrix. This is so if you times anything by the matrix it will return the same value.

    }

    static createTranslation(pVector) {
        var x = pVector.getX();
        var y = pVector.getY();
        var matrix = this.createIdentity();
        matrix.x2y0 = x;
        matrix.x2y1 = y;
        return matrix;

    }

    static createScale(pVector) {
        var scaleX = pVector.getX();
        var scaleY = pVector.getY();
        var matrix = new Matrix(scaleX,0,0,0,scaleY,0,0,0,1);
        return matrix;
    }

    static createRotation(pScalar) {
        var X0Y0 = Math.cos(pScalar);
        var X1Y0 = -Math.sin(pScalar);
        var X0Y1 = Math.sin(pScalar);
        var X1Y1 = Math.cos(pScalar);
        var matrix = new Matrix(X0Y0,X1Y0,0,X0Y1,X1Y1,0,0,0,1);
        return matrix;
    }

    multiply(pMatrix) {
        
        var resultM = new Matrix(0,0,0,0,0,0,0,0,1);

        resultM.x0y0 = this.x0y0 * pMatrix.x0y0 + this.x1y0 * pMatrix.x0y1 + this.x2y0 * pMatrix.x0y2;
        resultM.x1y0 = this.x0y0 * pMatrix.x1y0 + this.x1y0 * pMatrix.x1y1 + this.x2y0 * pMatrix.x1y2;
        resultM.x2y0 = this.x0y0 * pMatrix.x2y0 + this.x1y0 * pMatrix.x2y1 + this.x2y0 * pMatrix.x2y2;

        resultM.x0y1 = this.x0y1 * pMatrix.x0y0 + this.x1y1 * pMatrix.x0y1 + this.x2y1 * pMatrix.x0y2;
        resultM.x1y1 = this.x0y1 * pMatrix.x1y0 + this.x1y1 * pMatrix.x1y1 + this.x2y1 * pMatrix.x1y2;
        resultM.x2y1 = this.x0y1 * pMatrix.x2y0 + this.x1y1 * pMatrix.x2y1 + this.x2y1 * pMatrix.x2y2;

        resultM.x0y2 = this.x0y2 * pMatrix.x0y0 + this.x1y2 * pMatrix.x0y1 + this.x2y2 * pMatrix.x0y2;
        resultM.x1y2 = this.x0y2 * pMatrix.x1y0 + this.x1y2 * pMatrix.x1y1 + this.x2y2 * pMatrix.x1y2;
        resultM.x2y2 = this.x0y2 * pMatrix.x2y0 + this.x1y2 * pMatrix.x2y1 + this.x2y2 * pMatrix.x2y2;


        return resultM;

    }

    multiplyVector(pVector) {
        var resultV = new Vector(0,0,1);
        var vX = pVector.getX();
        var vY = pVector.getY();
        var vZ = pVector.getZ();

        resultV.setX(this.x0y0*vX + this.x1y0*vY + this.x2y0*vZ);
        resultV.setY(this.x0y1*vX + this.x1y1*vY + this.x2y1*vZ);
        
        return resultV;

    }

    alert() {
        //outputs the matrix values.
        alert("Matrix values: ", "\n", this.x0y0, this.x1y0, this.x2y0, "\n", this.x0y1, this.x1y1, this.x2y1, "\n", this.x0y2, this.x1y2, this.x2y2);
    }

    transform(pContext) {
        //The context transform function multiplies the current matrix by the new one.
        //In this case it will be mutltiplied by the matrix contained in this class.

            /* canvas transform matrix input is formated like so 
            a	c	e
            b	d	f
            0	0	1
            */
        pContext.transform(this.x0y0,this.x0y1,this.x1y0,this.x1y1,this.x2y0,this.x2y1);

    }

    setTransform(pContext) {
        //Set transform function of context does the same thing as transform except that it resets the current matrix to the identity matrix before multiplying.
            /* canvas setTransform matrix input is formated like so 
            a	c	e
            b	d	f
            0	0	1
            */
        pContext.setTransform(this.x0y0,this.x0y1,this.x1y0,this.x1y1,this.x2y0,this.x2y1)

    }
}