class Egresos extends Date{
    static CountEgre = 0
    constructor(description, value) {
        super(description, value)
        this._id = ++Egresos.CountEgre
    }
    get id() {
        return this._id
    }
}