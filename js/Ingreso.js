class Ingresos extends Date{
    static ID = 0

    constructor(description, value) {
        super(description, value)
        this._id = ++Ingresos.ID
    }
    get id() {
        return this.this._id 
    }
}