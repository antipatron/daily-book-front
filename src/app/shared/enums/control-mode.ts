export enum CONTROLMODE {
  OFF = '01',
  DIRECT = '02',
  SITE = '03',
}

export namespace CONTROLMODE {
  export function getName(controlmode: CONTROLMODE) {
    switch(controlmode){
      case CONTROLMODE.OFF:
        return 'OFF';
      case CONTROLMODE.DIRECT:
        return 'DIRECT';
      case CONTROLMODE.SITE:
        return 'SITE';
    }
  }
}
