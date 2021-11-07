export enum REALPOWERMODE {
  DIRECT = 'DIRECT',
  SITE = 'SITE'
}

export namespace REALPOWERMODE {
  export function getName(mode: REALPOWERMODE) {
    switch(mode){
      case REALPOWERMODE.DIRECT:
        return 'Direct';
      case REALPOWERMODE.SITE:
        return 'Site';
    }
  }
}
