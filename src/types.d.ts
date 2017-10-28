/* tslint:disable */

export interface Query {
  car?: Car[]; 
  train?: Train[]; 
}

export interface Car {
  _id?: string; 
  name?: string; 
}

export interface Train {
  _id?: string; 
  name?: string; 
}
export interface CarQueryArgs {
  name?: string; 
}
export interface TrainQueryArgs {
  name?: string; 
}
