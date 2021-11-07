export enum ADDONMODE {
  FCAS_MODE = 'FCAS_MODE'
}

export namespace ADDONMODE {
  export function getName(mode: ADDONMODE) {
    switch(mode){
      case ADDONMODE.FCAS_MODE:
        return 'FCAS mode';
    }
  }
}
