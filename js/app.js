// step 1 use engreso and ingreso to create objects 

// use class from ./ingreso.js 
const ingreso = [
    new Ingresos('trabajo', 500),
    new Ingresos('acciones', 300),
]
// use class from ./Egreso.js
const egreso = [
    new Egresos('impuetos', 200),
    new Egresos('comida',100)
]
// step 2 crete in html onload='loadPage()' event and create this  
// -------------------------funcion inisde body tag(HTML) onload  ------------
let loadPage = () =>{
    // load other function 
    loadData()
    // cargar ingreso 
    cargoIngreso()
    // cargagr egreso 
    loadEgreso()
}



// step 3 -----------------------------------------------------------------
let totalIngresos = () => {
    // create a varaibale that save egreso 
    let ingresoSave = 0
    //we create 'IngresoN' and  put 'of' that reference 'ingreso' 
    for (let IngresoN of ingreso) {
        // use 'ingresoSave' to save all values inside now in 'IngresoN'
        ingresoSave += IngresoN.value
    }
    // return to save 
    return ingresoSave
}
// repeat same step with 'engresos'
let totalEgreso = () => {
    let engresoSave = 0
    for (let engresoN of egreso) {
        engresoSave += engresoN.value
    }
    return engresoSave
}
// -----------------------------------------------------------------


// ----------------------------------------------------------
// step 4 create this fnction contain totalingresos and totalengresos 
let loadData = () => {
    let total = totalIngresos() - totalEgreso()
    let porcentaje = totalIngresos() / totalEgreso()
    // view this document html    
    document.getElementById('Presupuesto').innerHTML = `+${formatCurrency(total)}` 
    document.getElementById('porcentaje').innerHTML = formaPorce(porcentaje)
    document.getElementById('ingreso').innerHTML = `+${formatCurrency(totalIngresos())}`
    document.getElementById('engreso').innerHTML = `-${formatCurrency(totalEgreso())}`
}

// -----------------format dollar or peso 

const formatCurrency = (value) => {
   return value.toLocaleString('en-US',{style:'currency',currency:'USD',minmumFractionDigits:2})
}

// ------------------format percent  

const formaPorce = (value) => {
   return value.toLocaleString('en-US',{style:'percent',minmumFractionDigits:2})
}
// -----------create new documents in html----------------------------

const cargoIngreso = () => {
    let IngresoInHTML = ''
    // we referencents at array 'ingresos' 
    for (ingresoinside of ingreso) {
        // we crete other const with reference ingresoinside thst vinvulado to ingreso 
        IngresoInHTML += crearIngresoHTML(ingresoinside)
    }
    // show in html document 
    document.getElementById('lista-ingresos').innerHTML = IngresoInHTML
}
// -----------with const crearIngresoHTML with ingresoinside ------------------------------------------------------
const crearIngresoHTML = (ingresoinside) => {
//  paste all code html
    let IngresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingresoinside.description}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+${formatCurrency(ingresoinside.value)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name='close-outline' onclick="delteIngreso(${ingresoinside.Id})" ></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return IngresoHTML
}
// explain in spanish and english 
/*
First inside onlclick where you want Event(js) with function
delteIngreso in this case onclick = "delteIngreso(${ingresoinside.id})".
STEP 2:create const declared what is 'delteingreso'  and use Id as
property class 'Ingresos' and open function to write next code, create another variable
in this case is indexDelte that is
equal ingreso(array).findIndex(Ingresos(class)=> ingresoinside.id(declarated) === Id(reference Id property Ingresos class))
and put ingreso(array).splice(indexDelte(reference a variable declared and number 1 reference that a just number going delte))
and executed the function
loadData()
cargoIngreso()
because to update data*/
// spanish ------
// primero declaramos una evento dentro de ella una funcion y un
// indentificador en este caso ${ ingresoinside.id } y creamos la constante que
// ejecuta la funcion con el parametro Id que hace referencia a una propiedad de la clase  ingreso
// y crear una varibale indexDelte que contenga ingresos(array).findIndex(Ingreso(class)=> ingresoinside.id === Id
// y despues ingreso(array).splice(variabel ya declarada (indexDelte),1)
// ----------------------------------------------------------------------------------------
const delteIngreso = (id) => {
/*  explain the first line:
create a variable that contain array 'ingresos'
and.findIndex(class(Ingresos)=> ingresoinside.id(ingresoinside.id is variable declarated)
=== Id(this id reference in the Id class ingresoside class)) */
 let indexDelte = ingreso.findIndex(ingresoinside => ingresoinside.Id === id)
//    and after use again ingresos array and use .splice(varreference,1)the number 1 that means delte a object 
    ingreso.splice(indexDelte, 1)
     loadData()
    cargoIngreso()
}
// ----------------Load Egresos-----------------------------------
const loadEgreso = () => {
    let egresoHTML = ''
    for (egresoinside of egreso) {
        egresoHTML += loadEGRESOHtml(egresoinside)
    }
    document.getElementById('list-Egreso').innerHTML = egresoHTML
}
const loadEGRESOHtml = (EgresoInisde) => {
    let EgresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${EgresoInisde.description}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">-${formatCurrency(EgresoInisde.value)}</div>
                <div class="elemento_porcentaje">${formaPorce(EgresoInisde.value/totalEgreso())}</div>
                <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name='close-outline' onclick="deletEgreso(${EgresoInisde.Id})"></ion-icon>
                            </button>
                        </div>
            </div>
        </div>
    `
    return EgresoHTML
}

let deletEgreso = (id) => {
 let indexDelteE = egreso.findIndex(EgresoInisde => EgresoInisde.Id === id)
    egreso.splice(indexDelteE, 1)
     loadData()
    loadEgreso()
}

// -------------------------------event 
let addnewElement = () => {
    // add id docmento 
    let forma = document.forms['forma']
    let tipo = forma['tipo']
    let descripcion = forma['descripcion']
    let valor = forma['valor']
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingreso.push(new Ingresos(descripcion.value, +valor.value))
            loadData()
            cargoIngreso()
        } else if (tipo.value === 'egreso') {
            egreso.push(new Egresos(descripcion.value, +valor.value))
            loadData()
            loadEgreso()
        }
    }
}