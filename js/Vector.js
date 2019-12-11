class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }

    setX(pX) {
        this.mX = pX;
    }

    setY(pY) {
        this.mY = pY;
    }

    setZ(pZ) {
        this.mZ = pZ;
    }

    getX() {
        return this.mX;
    }

    getY() {
        return this.mY;
    }

    getZ() {
        return this.mZ;
    }

    //Parameter vector is added to this vector, result is resturned as a new vector.
    add(pVector) {
        var result = new Vector(0,0,1);
        result.setX(this.getX() + pVector.getX());
        result.setY(this.getY() + pVector.getY());
        result.setZ(this.getZ() + pVector.getZ());
        return result;
    }

    //Paramter vector is subtracted from this vector, result is returned as a new vector.
    subtract(pVector) {
        var result = new Vector(0,0,1);
        result.setX(this.getX() - pVector.getX());
        result.setY(this.getY() - pVector.getY());
        result.setZ(this.getZ() - pVector.getZ());
        return result;
    }

    multiply(pValue) {
        var result = new Vector(0,0,1);
        result.setX(this.getX() * pValue);
        result.setY(this.getY() * pValue);
        result.setZ(this.getZ() * pValue);
        return result;
        
    }

    divide(pValue) {
        var result = new Vector(0,0,1);
        result.setX(this.getX() / pValue);
        result.setY(this.getY() / pValue);
        result.setZ(this.getZ() / pValue);
        return result;

    }

    magnitude() {
        /* pythagorases theorem */
        return Math.sqrt(this.mX*this.mX + this.mY*this.mY);
    }

    normalise() {
        var magnitude = this.magnitude();
        var result = new Vector(0,0,1);
        result.setX(this.mX /magnitude);
        result.setY(this.mY /magnitude);
        return result;
    }

    limitTo(pLimit) {
        var result = new Vector(0,0,1);
        var normalized = this.normalise(); //this doesnt work for some reason.

        if (this.magnitude() > pLimit) {
            result.setX(this.normalise().getX() * pLimit);
            result.setY(this.normalise().getY() * pLimit);
            
        }
        else {
            result.setX(this.mX);
            result.setY(this.mY);
        }
        return result;

    }

    dotProduct(pVector) {
        var result = 0;
        result = result + pVector.getX() * this.getX();
        result = result + pVector.getY() * this.getY();
        result = result + pVector.getZ() * this.getZ();

        return result;

    }

    interpolate(pVector, pScalar) {
        /*Makes a vector from the origin towards the vectors that connect vector1 and vector2. the scalar value decides how far up the connecting vector we go.*/
        /*formula: (1-scalar)*vectorA + scalar*vectorB*/
        var result = new Vector(0,0,1)
        var X = pVector.multiply(1-pScalar).getX() + this.multiply(pScalar).getX();
        var Y = pVector.multiply(1-pScalar).getY() + this.multiply(pScalar).getY();
        result.setX( X );
        result.setY( Y ) ;
        return result;


    }

    rotate(pAngle) {
        var result = new Vector(0,0,1);
        result.setX(this.getX()* Math.cos(pAngle) - this.getY() * Math.sin(pAngle));
        result.setY(this.getX()* Math.sin(pAngle) + this.getY() * Math.cos(pAngle));
        return result;
    }

    angleBetween(pVector) {
        var dotProduct = this.dotProduct(pVector);
        var magA = this.magnitude();
        var magB = pVector.magnitude();
        return Math.acos(dotProduct / (magA * magB) )        
    }

}