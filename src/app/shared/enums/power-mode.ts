export enum POWERMODE {
  ACTIVE = 'ACTIVE',
  REACTIVE = 'REACTIVE'
}

export namespace POWERMODE {
  export function getName(mode: POWERMODE) {
    switch(mode){
      case POWERMODE.ACTIVE:
        return 'Active';
      case POWERMODE.REACTIVE:
        return 'Reactive';
    }
  }
}
