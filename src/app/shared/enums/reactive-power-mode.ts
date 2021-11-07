export enum REACTIVEPOWERMODE {
  DISABLE = 'DISABLE',
  DIRECT = 'DIRECT',
  POWER_FACTOR = 'POWER_FACTOR'
}

export namespace REACTIVEPOWERMODE {
  export function getName(mode: REACTIVEPOWERMODE) {
    switch(mode){
      case REACTIVEPOWERMODE.DISABLE:
        return 'Disable';
      case REACTIVEPOWERMODE.DIRECT:
        return 'Direct';
      case REACTIVEPOWERMODE.POWER_FACTOR:
        return 'Power factor';
    }
  }
}
